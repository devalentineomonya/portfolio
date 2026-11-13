import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Track record of Valentine Omonya: clients, roles and live systems";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "Track Record",
    title: "Real clients. Live systems.",
    subtitle:
      "Websites, M-Pesa payments and operations software built for businesses, a clinic and a tech society.",
    badgeColor: "#c9b6ff",
    footerRight: "Track record · Open for projects",
  });
}
