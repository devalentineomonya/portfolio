import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Notes from the build by Valentine Omonya";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "Stories",
    title: "Notes from the build.",
    subtitle: "Plain-English notes on Next.js, React, TypeScript and building software people use.",
    badgeColor: "#ff6a2b",
    footerRight: "Articles",
  });
}
