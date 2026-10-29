import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Track record and delivered systems by Valentine Omonya";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "Track Record",
    title: "Proven systems & business impact.",
    subtitle:
      "Production Next.js platforms, NestJS backends, M-Pesa billing, and operations software delivered for real businesses.",
    badgeColor: "#c9b6ff",
    footerRight: "Track Record · Taking on projects",
  });
}
