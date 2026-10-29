import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt =
  "Valentine Omonya — Freelance software engineer building high-converting e-commerce stores, Next.js websites, payment integrations and NestJS business systems";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "Freelance",
    title: "Valentine Omonya. Freelance engineer.",
    subtitle:
      "High-converting e-commerce stores, Next.js websites, and NestJS business software (POS, ERP, CRM) with seamless payment integrations.",
    badgeColor: "#ffd84a",
    footerRight: "E-Commerce & Payments · Available",
  });
}
