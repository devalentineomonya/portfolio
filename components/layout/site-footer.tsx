import Link from "next/link";
import type { ComponentType } from "react";
import { heroContent } from "@/data/hero";
import { socialLinks, type SocialId } from "@/data/data";
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  TiktokIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@/components/ui/icons";

const icons: Record<
  SocialId,
  ComponentType<{ className?: string; strokeWidth?: number }>
> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  x: TwitterIcon,
  instagram: InstagramIcon,
  tiktok: TiktokIcon,
  youtube: YoutubeIcon,
  email: MailIcon,
};

const isExternal = (href: string) => href.startsWith("http");

export const SiteFooter = () => (
  <footer className="relative border-t border-black/25 z-20 text-black">
    <div className="px-5 md:px-8 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <p className="text-sm font-semibold">
          {new Date().getFullYear()} © DEVALENTINE.
        </p>
        <a
          className="text-sm underline underline-offset-2 hover:opacity-60 transition-opacity"
          href={heroContent.links.email}
        >
          {heroContent.links.emailAddress}
        </a>
        <div className="flex flex-wrap items-center gap-3 mt-3">
          {socialLinks.map(({ id, label, href }) => {
            const Icon = icons[id];
            return (
              <a
                key={id}
                aria-label={label}
                className="hover:opacity-60 transition-opacity"
                href={href}
                target={isExternal(href) ? "_blank" : undefined}
                rel={isExternal(href) ? "noopener noreferrer" : undefined}
              >
                <Icon className="w-4 h-4" strokeWidth={1.5} />
              </a>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-1.5 text-sm">
        <Link className="hover:opacity-60 transition-opacity" href="/work">
          Work
        </Link>
        <Link
          className="hover:opacity-60 transition-opacity"
          href="/experience"
        >
          Experience
        </Link>
        <Link className="hover:opacity-60 transition-opacity" href="/stories">
          Stories
        </Link>
        <a
          className="hover:opacity-60 transition-opacity"
          href={heroContent.links.studio}
          target="_blank"
          rel="noopener noreferrer"
        >
          Devaltech (client work)
        </a>
      </div>
      <div className="grid grid-cols-2 content-start gap-x-6 gap-y-1.5 text-sm md:max-w-xs">
        {socialLinks
          .filter((link) => isExternal(link.href))
          .map((link) => (
            <a
              key={link.id}
              className="hover:opacity-60 transition-opacity"
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ))}
      </div>
    </div>
  </footer>
);
