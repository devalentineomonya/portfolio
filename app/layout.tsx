import type { Metadata } from "next";
import { Anton, Caveat, Inter } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/layout/site-nav";
import { CreateCta } from "@/components/layout/create-cta";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Valentine Omonya | Software Engineer",
    template: "%s | Valentine Omonya",
  },
  description:
    "Valentine Omonya is a Software Engineer based in Kenya specializing in frontend and full-stack development, building robust business solutions and enterprise applications.",
  keywords: [
    "Valentine Omonya",
    "Software Engineer",
    "Full Stack Developer",
    "Kenya",
    "React",
    "Next.js",
    "NestJS",
    "Portfolio",
  ],
  authors: [{ name: "Valentine Omonya" }],
  creator: "Valentine Omonya",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://devalentine.com",
    title: "Valentine Omonya | Software Engineer",
    description:
      "Valentine Omonya is a Software Engineer based in Kenya specializing in frontend and full-stack development.",
    siteName: "Valentine Omonya Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Valentine Omonya | Software Engineer",
    description:
      "Valentine Omonya is a Software Engineer based in Kenya specializing in frontend and full-stack development.",
    creator: "@devalentine_",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${anton.variable} ${caveat.variable}`}
    >
      <body className="bg-ink antialiased overflow-x-hidden">
        <SiteNav />
        {children}
        <CreateCta />
      </body>
    </html>
  );
}
