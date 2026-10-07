export const CtaBuild = () => (
  <section className="poster-section h-screen bg-ink" id="cta-build">
    <div
      className="absolute inset-0 bg-amber origin-bottom"
      id="wipeRose"
      style={{ transform: "scaleY(0)" }}
    ></div>
    <div
      className="absolute inset-0 bg-violet origin-left"
      id="wipeEmerald"
      style={{ transform: "scaleX(0)" }}
    ></div>
    <div className="sweep-word text-white" id="ideaWord">
      IDEA
    </div>
    <div className="sweep-word text-black" id="builtWord">
      BUILT
    </div>
    <div className="sweep-word text-white" id="shippedWord">
      SHIPPED
    </div>
  </section>
);
