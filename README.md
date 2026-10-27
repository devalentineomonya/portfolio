# Valentine Omonya — portfolio

Personal portfolio for Valentine Omonya, a software engineer in Nairobi. Built with Next.js (App Router), React, GSAP, Lenis and Matter.js.

## Getting started

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script                 | What it does                                  |
| ---------------------- | --------------------------------------------- |
| `bun run dev`          | Start the dev server                          |
| `bun run build`        | Production build                              |
| `bun run lint`         | ESLint                                        |
| `bun run typecheck`    | TypeScript, no emit                           |
| `bun run format`       | Prettier, write (needs prettier on your PATH) |
| `bun run format:check` | Prettier, check only                          |

## Structure

```
app/                 routes: / , /work, /experience, /stories, 404, sitemap, global styles
components/
  home/              sections of the home page (hero, manifesto, services, work, process, ...)
  pages/             client components for /work, /experience, /stories and the 404 scene
  layout/            nav, footer, page curtain, smooth scroll, back to top
  ui/                shared bits: Brace the mascot, icons
data/                hero copy, work projects, experience, stories
public/              avatar and project screenshots
```

All styles live in `app/globals.css`, scoped under `.site` with a `site-` class prefix.

## Content

Edit the files in `data/` to change copy, projects, roles and stories. Project screenshots go in `public/work/`.

## Previous versions

Older designs are kept as branches: `v1.0` to `v7.0`.
