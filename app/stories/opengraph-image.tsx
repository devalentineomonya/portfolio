import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Stories, technical insights and build notes by Valentine Omonya";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "Stories",
    title: "Notes on software, speed & building.",
    subtitle:
      "Writing on Next.js performance, NestJS backend architecture, technical SEO, and taking products to paying customers.",
    badgeColor: "#ff6a2b",
    footerRight: "Articles · Engineering Notes",
  });
}
