import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Caveat_Brush, DM_Mono } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { PageCurtain } from "@/components/layout/page-curtain";
import { SiteNav } from "@/components/layout/site-nav";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { JsonLd } from "@/components/site/json-ld";
import { SITE } from "@/config/site";
import { personSchema, websiteSchema } from "@/lib/schema";
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
  metadataBase: new URL(SITE.url),
  title: {
    default: "Valentine Omonya | Freelance Full-Stack Engineer · E-Commerce, Next.js & NestJS",
    template: "%s | Valentine Omonya",
  },
  description: SITE.description,
  keywords: [
    "Valentine Omonya",
    "Freelance Software Engineer",
    "E-Commerce Developer",
    "Payment Gateway Integration",
    "M-Pesa Integration",
    "Stripe Integration Kenya",
    "Next.js Developer",
    "NestJS Developer",
    "Full Stack Freelancer",
    "Nairobi",
    "Kenya",
    "POS Systems",
    "ERP Software",
    "CRM Systems",
    "Technical SEO",
    "High Converting Websites",
    "Online Stores",
    "React",
    "TypeScript",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: `${SITE.name} — Freelance Full-Stack Engineer`,
    title: {
      default: "Valentine Omonya | Freelance Full-Stack Engineer · E-Commerce, Next.js & NestJS",
      template: "%s | Valentine Omonya",
    },
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Valentine Omonya | Freelance Full-Stack Engineer · E-Commerce, Next.js & NestJS",
    description: SITE.description,
    creator: SITE.twitter,
    site: SITE.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png", sizes: "512x512" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#f2efe6",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${caveatBrush.variable} ${dmMono.variable}`}>
      <body>
        <JsonLd schema={[personSchema(), websiteSchema()]} />
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
