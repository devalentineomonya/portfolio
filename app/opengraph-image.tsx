import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt =
  "Valentine Omonya, freelance engineer in Nairobi: online stores, M-Pesa and card payments, and business systems";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "Freelance",
    title: "Valentine Omonya. Freelance engineer.",
    subtitle:
      "Online stores, M-Pesa and card payments, and the POS, stock and CRM systems behind them.",
    badgeColor: "#ffd84a",
    footerRight: "Nairobi · Open for projects",
  });
}
