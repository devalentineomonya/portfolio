import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt =
  "Client work, e-commerce stores, payment integrations and business systems built by Valentine Omonya";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "Work",
    title: "Stores, payments & business systems.",
    subtitle:
      "Online stores, business software, clinic platforms and M-Pesa tools, live for real clients.",
    badgeColor: "#8fe3b8",
    footerRight: "Selected work",
  });
}
