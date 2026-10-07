"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navLinks } from "@/data/data";
import { heroContent } from "@/data/hero";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";

export const SiteNav = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      <nav
        id="siteNav"
        className="fixed top-0 left-0 right-0 z-[60] flex items-start justify-between px-5 md:px-8 pt-5 text-white mix-blend-difference pointer-events-none"
      >
        <div className="leading-tight pointer-events-auto">
          <Link
            className="display text-base tracking-tight uppercase"
            href="/"
            onClick={() => setOpen(false)}
          >
            {heroContent.brand}
          </Link>
          <p className="text-xs opacity-75 mt-0.5">{heroContent.tagline}</p>
        </div>
        <div className="hidden lg:flex items-center gap-7 text-sm font-medium pt-1 pointer-events-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              className="hover:opacity-60 transition-opacity"
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-5 text-sm font-medium pt-1 pointer-events-auto">
          <a
            className="hover:opacity-60 transition-opacity hidden sm:block"
            href={heroContent.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="hover:opacity-60 transition-opacity hidden sm:block"
            href={heroContent.links.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className="hover:opacity-60 transition-opacity"
            href={heroContent.links.resume}
            target="_blank"
            rel="noopener noreferrer"
          >
            Résumé
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="lg:hidden"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <CloseIcon className="w-5 h-5" />
            ) : (
              <MenuIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-[55] flex flex-col justify-center bg-ink px-5 text-white transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="flex flex-col">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              className="display flex items-baseline justify-between border-t border-white/25 py-4 text-6xl uppercase leading-none tracking-[-0.045em] last:border-b"
            >
              {link.label}
              <span className="text-xs tracking-[0.18em] text-white/45">
                0{index + 1}
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
          {[
            ["LinkedIn", heroContent.links.linkedin],
            ["GitHub", heroContent.links.github],
            ["Résumé", heroContent.links.resume],
            ["Devaltech (client work)", heroContent.links.studio],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={open ? 0 : -1}
              className="hover:text-white transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};
