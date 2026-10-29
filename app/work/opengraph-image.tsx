import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt =
  "Client work, e-commerce stores, payment integrations and business systems built by Valentine Omonya";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "Work",
    title: "E-Commerce, websites & business systems.",
    subtitle:
      "High-speed online stores, seamless payment integrations (M-Pesa & Stripe), clinic POS platforms, and automated cashflow systems.",
    badgeColor: "#8fe3b8",
    footerRight: "E-Commerce & Systems · Active",
  });
}
