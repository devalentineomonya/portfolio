export interface Story {
  title: string;
  category: string;
  date: string;
  readTime: string;
  description: string;
  url: string;
  tags: string[];
}

export const stories: Story[] = [
  {
    title: "Building a Modern Blog with Next.js and MDX",
    category: "Tech",
    date: "Feb 15, 2026",
    readTime: "3 min read",
    description:
      "A step-by-step guide to building a fast, easy-to-write blog with Next.js and MDX.",
    url: "https://v5.devalentine.com/blogs/building-a-modern-blog-with-nextjs",
    tags: ["Next.js", "MDX"],
  },
  {
    title: "TypeScript Best Practices for 2026",
    category: "Career",
    date: "Feb 10, 2026",
    readTime: "2 min read",
    description:
      "Habits that make TypeScript code easier to read, safer to change and nicer to work with.",
    url: "https://v5.devalentine.com/blogs/typescript-best-practices",
    tags: ["TypeScript", "Best Practices"],
  },
  {
    title: "Understanding React Server Components",
    category: "Personal",
    date: "Jan 28, 2026",
    readTime: "5 min read",
    description:
      "A plain-English look at React Server Components, and why they make websites lighter and faster.",
    url: "#",
    tags: ["React", "Architecture"],
  },
];
