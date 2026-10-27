import type { Metadata } from "next";
import { Bricolage_Grotesque, Caveat_Brush, DM_Mono } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { PageCurtain } from "@/components/layout/page-curtain";
import { SiteNav } from "@/components/layout/site-nav";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  display: "swap",
});

const caveatBrush = Caveat_Brush({
  variable: "--font-caveat-brush",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Valentine Omonya | Software Engineer",
    template: "%s | Valentine Omonya",
  },
  description:
    "Valentine Omonya is a software engineer in Nairobi, Kenya. He builds web and mobile products with React, Next.js and NestJS, and is open to full-time roles.",
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
      "Valentine Omonya is a software engineer in Nairobi, Kenya who builds web and mobile products. Open to full-time roles.",
    siteName: "Valentine Omonya Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Valentine Omonya | Software Engineer",
    description:
      "Valentine Omonya is a software engineer in Nairobi, Kenya who builds web and mobile products. Open to full-time roles.",
    creator: "@devalentine_",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${caveatBrush.variable} ${dmMono.variable}`}>
      <body>
        <div className="site">
          <SmoothScroll />
          {children}
          <Footer />
          <SiteNav />
          <PageCurtain />
        </div>
      </body>
    </html>
  );
}
