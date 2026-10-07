export const navLinks = [
  { label: "About", href: "/#interlude" },
  { label: "Featured", href: "/#product" },
  { label: "Work", href: "/#archive" },
  { label: "Experience", href: "/#builder" },
  { label: "More", href: "/#board" },
  { label: "Contact", href: "/#join" },
];

export type SocialId =
  | "github"
  | "linkedin"
  | "x"
  | "instagram"
  | "tiktok"
  | "youtube"
  | "email";

export const socialLinks: { id: SocialId; label: string; href: string }[] = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/devalentineomonya",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/in/devalentineomonya",
  },
  { id: "x", label: "X (Twitter)", href: "https://x.com/devalentine_" },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/valentine_in_tech/",
  },
  {
    id: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@devalentine",
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/@valentine_in_tech",
  },
  { id: "email", label: "Email", href: "mailto:contact@devalentine.com" },
];
