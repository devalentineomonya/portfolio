"use client";

import { useEffect, useRef } from "react";
import { blendInto, ringProjects, scene, toBlend, SCENES } from "./scene";

type Three = typeof import("three");

const CAM_Z = 11;
const RADIUS = 4.4;
const PANEL_W = 2.7;
const PANEL_H = PANEL_W / 1.6;
const TAU = Math.PI * 2;

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  varying float vFacing;
  void main() {
    vUv = uv;
    vec4 world = modelMatrix * vec4(position, 1.0);
    vec3 n = normalize(mat3(modelMatrix) * normal);
    vFacing = dot(n, normalize(cameraPosition - world.xyz));
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

// Colours stay in sRGB end to end (raw texture in, no output transform), so
// the screenshots look exactly like the files.
const fragmentShader = /* glsl */ `
  uniform sampler2D uMap;
  uniform float uLoaded;
  uniform float uOpacity;
  uniform float uGray;
  uniform float uTint;
  uniform float uLock;
  uniform float uFront;
  uniform float uHover;
  uniform vec3 uTintColor;
  uniform vec3 uBack;
  uniform vec2 uSize;
  varying vec2 vUv;
  varying float vFacing;

  float roundedBox(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  }

  void main() {
    vec2 p = (vUv - 0.5) * uSize;
    float d = roundedBox(p, uSize * 0.5, 0.07);
    float aa = fwidth(d) * 1.25;
    float shape = 1.0 - smoothstep(-aa, aa, d);
    if (shape < 0.01) discard;
    float rim = 1.0 - smoothstep(0.0, aa * 2.0, abs(d + aa * 1.6));

    // Both sides show the screen; the back is mirrored back so it reads
    // correctly from inside the ring (the hero fly-through passes through it).
    vec2 uv = gl_FrontFacing ? vUv : vec2(1.0 - vUv.x, vUv.y);
    vec3 col = mix(uBack, texture2D(uMap, uv).rgb, uLoaded);
    float luma = dot(col, vec3(0.299, 0.587, 0.114));
    // while locked, every screen but the front one steps back
    float aside = uLock * (1.0 - smoothstep(0.9, 0.995, uFront));
    col = mix(col, vec3(luma), clamp(uGray + aside, 0.0, 1.0));
    // violet duotone: dark ink to bright violet, so white type on top still reads
    vec3 washed = mix(uTintColor * 0.28, min(uTintColor * 1.25 + 0.12, vec3(1.0)), luma);
    col = mix(col, washed, uTint);
    col *= mix(1.0, 0.3, aside);
    float facing = gl_FrontFacing ? vFacing : -vFacing;
    col *= mix(0.45, 1.0, smoothstep(-0.1, 0.85, facing));
    if (!gl_FrontFacing) col *= 0.75;
    col += uHover * 0.05;
    col = mix(col, vec3(1.0), rim * 0.3);
    gl_FragColor = vec4(col, shape * uOpacity);
  }
`;

const isInteractive = (target: EventTarget | null) =>
  target instanceof Element && !!target.closest("a, button, input, textarea");

function mount(THREE: Three, canvas: HTMLCanvasElement) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let renderer: import("three").WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
  } catch {
    canvas.style.display = "none";
    return () => {};
  }
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));

  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, CAM_Z);
  const world = new THREE.Scene();

  // parallax (pointer) → root (scene state) → spin (ring turn) → panels
  const parallax = new THREE.Group();
  const root = new THREE.Group();
  const spin = new THREE.Group();
  world.add(parallax);
  parallax.add(root);
  root.add(spin);

  /* ---------- ring of screens ---------- */
  const geometry = new THREE.PlaneGeometry(PANEL_W, PANEL_H, 32, 1);
  const position = geometry.attributes.position;
  for (let i = 0; i < position.count; i++) {
    const angle = position.getX(i) / RADIUS;
    position.setX(i, Math.sin(angle) * RADIUS);
    position.setZ(i, Math.cos(angle) * RADIUS - RADIUS);
  }
  geometry.computeVertexNormals();

  const shared = {
    uOpacity: { value: 0 },
    uGray: { value: 0 },
    uTint: { value: 0 },
    uLock: { value: 0 },
    uTintColor: { value: new THREE.Vector3(0.427, 0.153, 0.855) },
    uBack: { value: new THREE.Vector3(0.09, 0.06, 0.18) },
    uSize: { value: new THREE.Vector2(PANEL_W, PANEL_H) },
  };

  const loader = new THREE.TextureLoader();
  const anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  const step = TAU / ringProjects.length;
  const panels = ringProjects.map((project, index) => {
    const uniforms = {
      ...shared,
      uMap: { value: null as import("three").Texture | null },
      uLoaded: { value: 0 },
      uFront: { value: 0 },
      uHover: { value: 0 },
    };
    loader.load(project.image, (texture) => {
      texture.anisotropy = anisotropy;
      uniforms.uMap.value = texture;
      uniforms.uLoaded.value = 1;
    });
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geometry, material);
    const theta = index * step;
    mesh.position.set(Math.sin(theta) * RADIUS, 0, Math.cos(theta) * RADIUS);
    mesh.rotation.y = theta;
    mesh.userData.index = index;
    spin.add(mesh);
    return { mesh, uniforms, material };
  });

  /* ---------- dust: depth cue that drifts with the page ---------- */
  const DUST = 420;
  const dustPositions = new Float32Array(DUST * 3);
  for (let i = 0; i < DUST; i++) {
    dustPositions[i * 3] = (Math.random() - 0.5) * 30;
    dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 18;
    dustPositions[i * 3 + 2] = -12 + Math.random() * 18;
  }
  const dustGeometry = new THREE.BufferGeometry();
  dustGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(dustPositions, 3),
  );
  const dot = document.createElement("canvas");
  dot.width = dot.height = 32;
  const dotCtx = dot.getContext("2d");
  if (dotCtx) {
    const g = dotCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.45, "rgba(255,255,255,0.8)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    dotCtx.fillStyle = g;
    dotCtx.fillRect(0, 0, 32, 32);
  }
  const dotTexture = new THREE.CanvasTexture(dot);
  const dustMaterial = new THREE.PointsMaterial({
    size: 0.07,
    map: dotTexture,
    transparent: true,
    opacity: 0.45,
    depthWrite: false,
  });
  const dust = new THREE.Points(dustGeometry, dustMaterial);
  world.add(dust);

  /* ---------- sizing ---------- */
  let fit = 1;
  const resize = () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    // narrow screens see less of the ring's width: shrink it to fit
    fit = Math.min(1, Math.max(0.64, camera.aspect / 1.45));
  };
  resize();
  window.addEventListener("resize", resize);

  /* ---------- pointer: parallax, hover and click on the front screen ---------- */
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2(9, 9);
  const onPointerMove = (event: PointerEvent) => {
    if (event.pointerType === "mouse") {
      scene.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      scene.pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
    }
    ndc.set(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1,
    );
    if (isInteractive(event.target)) ndc.set(9, 9);
  };
  const onClick = (event: MouseEvent) => {
    if (isInteractive(event.target) || scene.hoveredProject < 0) return;
    const project = ringProjects[scene.hoveredProject];
    window.open(project.url, "_blank", "noopener,noreferrer");
  };
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("click", onClick);

  /* ---------- frame loop ---------- */
  const current = toBlend(SCENES.hero);
  let turn = 0;
  let focus = 0;
  let intro = 0;
  let last = performance.now();
  let frame = 0;
  const panelNormal = new THREE.Vector3();
  const panelPos = new THREE.Vector3();
  const toCamera = new THREE.Vector3();

  const render = (now: number) => {
    frame = requestAnimationFrame(render);
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    const ease = 1 - Math.exp(-dt * 5);

    blendInto(current, scene.target, ease);
    focus += (scene.focus - focus) * (1 - Math.exp(-dt * 7));
    intro += (scene.intro - intro) * (1 - Math.exp(-dt * 3));

    const introEase = 1 - Math.pow(1 - intro, 3);
    if (!reduced) turn += (current.spin + (1 - introEase) * 2.4) * dt;

    // Locked: settle on the focused screen by the shortest way round.
    const focusAngle = -focus * step;
    if (current.lock > 0.995) turn = focusAngle;
    let diff = focusAngle - turn;
    diff = ((((diff + Math.PI) % TAU) + TAU) % TAU) - Math.PI;
    spin.rotation.y = turn + diff * current.lock;

    root.position.set(current.x * fit, current.y, current.z);
    root.rotation.set(current.tiltX, 0, current.tiltZ);
    root.scale.setScalar(current.scale * fit * (0.72 + 0.28 * introEase));

    const px = reduced ? 0 : scene.pointer.x;
    const py = reduced ? 0 : scene.pointer.y;
    parallax.rotation.y += (px * 0.14 - parallax.rotation.y) * ease;
    parallax.rotation.x += (py * 0.07 - parallax.rotation.x) * ease;

    const opacity = current.opacity * introEase;
    spin.visible = opacity > 0.01;
    shared.uOpacity.value = opacity;
    shared.uGray.value = current.gray;
    shared.uTint.value = current.tint;
    shared.uLock.value = current.lock;

    world.updateMatrixWorld();
    for (const panel of panels) {
      panel.mesh.getWorldDirection(panelNormal);
      panel.mesh.getWorldPosition(panelPos);
      toCamera.copy(camera.position).sub(panelPos).normalize();
      panel.uniforms.uFront.value = panelNormal.dot(toCamera);
    }

    // hover only counts on the front screen while the ring is locked
    let hovered = -1;
    if (current.lock > 0.9 && opacity > 0.5 && ndc.x < 2) {
      raycaster.setFromCamera(ndc, camera);
      const hit = raycaster.intersectObjects(
        panels.map((p) => p.mesh),
        false,
      )[0];
      const index = hit ? (hit.object.userData.index as number) : -1;
      if (index >= 0 && panels[index].uniforms.uFront.value > 0.9) {
        hovered = index;
      }
    }
    if (hovered !== scene.hoveredProject) {
      scene.hoveredProject = hovered;
      document.body.style.cursor = hovered >= 0 ? "pointer" : "";
    }
    panels.forEach((panel, index) => {
      const target = index === hovered ? 1 : 0;
      panel.uniforms.uHover.value += (target - panel.uniforms.uHover.value) * ease;
    });

    // dust drifts up as you scroll, a little behind the page
    dust.position.y = (window.scrollY / window.innerHeight) * 1.1;
    dust.rotation.y = px * 0.05;
    dustMaterial.color.setRGB(
      current.ink[0] / 255,
      current.ink[1] / 255,
      current.ink[2] / 255,
      THREE.SRGBColorSpace,
    );
    dustMaterial.opacity = 0.18 + 0.27 * introEase;

    renderer.render(world, camera);
  };
  frame = requestAnimationFrame(render);

  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("resize", resize);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("click", onClick);
    document.body.style.cursor = "";
    geometry.dispose();
    panels.forEach((panel) => {
      panel.material.dispose();
      panel.uniforms.uMap.value?.dispose();
    });
    dustGeometry.dispose();
    dustMaterial.dispose();
    dotTexture.dispose();
    renderer.dispose();
  };
}

/** Fixed full-screen WebGL layer behind the home page. Decorative. */
export const Stage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};
    import("three").then((THREE) => {
      if (disposed || !canvasRef.current) return;
      cleanup = mount(THREE, canvasRef.current);
    });
    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return <canvas ref={canvasRef} className="home-stage" aria-hidden="true" />;
};
