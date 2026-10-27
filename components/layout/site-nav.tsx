"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { heroContent } from "@/data/hero";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Experience", href: "/experience" },
  { label: "Stories", href: "/stories" },
  { label: "Contact", href: heroContent.links.email },
];

export const SiteNav = () => {
  const pathname = usePathname();

  return (
    <nav className="site-nav" aria-label="Main" data-hero="nav">
      {LINKS.map((link) => {
        const current = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
        const external = link.href.startsWith("mailto:");
        return external ? (
          <a key={link.label} href={link.href}>
            {link.label}
          </a>
        ) : (
          <Link key={link.label} href={link.href} aria-current={current ? "page" : undefined}>
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
};
