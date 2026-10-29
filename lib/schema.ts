import { SITE } from "@/config/site";
import type { Story } from "@/data/stories";
import type { WorkProject } from "@/data/work";

const PERSON_ID = `${SITE.url}/#person`;
const SITE_ID = `${SITE.url}/#website`;

/** Absolute URL for a site-relative path. */
export const abs = (path: string) => (path === "/" ? SITE.url : `${SITE.url}${path}`);

export function personSchema() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: SITE.name,
    jobTitle: SITE.role,
    description: SITE.description,
    url: SITE.url,
    image: abs("/avatar.webp"),
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.locality,
      addressCountry: "KE",
    },
    sameAs: [SITE.github, SITE.linkedin, SITE.twitterUrl, SITE.studio],
    knowsAbout: SITE.skills,
    worksFor: {
      "@type": "Organization",
      name: "Devaltech",
      url: SITE.studio,
    },
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: SITE.url,
    name: `${SITE.name} — Freelance Full-Stack Engineer`,
    description: SITE.description,
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    inLanguage: "en",
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: abs(crumb.path),
    })),
  };
}

export function projectListSchema(projects: WorkProject[]) {
  return {
    "@type": "ItemList",
    name: "Featured Client Projects & Software Systems",
    description:
      "High-converting e-commerce stores, Next.js websites, payment integrations and business systems engineered by Valentine Omonya.",
    itemListElement: projects.map((project, i) => ({
      "@type": "SoftwareApplication",
      position: i + 1,
      name: project.title,
      description: project.description,
      url: project.url,
      applicationCategory: project.category,
      operatingSystem: "Any",
      author: { "@id": PERSON_ID },
    })),
  };
}

export function storiesListSchema(items: Story[]) {
  return {
    "@type": "ItemList",
    name: "Stories and Articles",
    description:
      "Articles on e-commerce, web performance, payment gateways, NestJS backends, and building software that converts.",
    itemListElement: items.map((story, i) => ({
      "@type": "BlogPosting",
      position: i + 1,
      headline: story.title,
      description: story.description,
      url: story.url.startsWith("http") ? story.url : abs("/stories"),
      author: { "@id": PERSON_ID },
      inLanguage: "en",
    })),
  };
}
