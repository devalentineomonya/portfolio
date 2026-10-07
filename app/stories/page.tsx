import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { stories } from "@/data/stories";

export const metadata: Metadata = {
  title: "Stories",
  description:
    "Notes on software, learning and building things people use.",
};

export default function StoriesPage() {
  return (
    <main>
      <PageHeader
        word="STORIES"
        tone="iris"
        copy="Things I'm learning, and writing about along the way."
      />
      <section className="bg-lavender text-black">
        <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
          {stories.map((story) => {
            const external = story.url.startsWith("http");
            return (
              <a
                key={story.title}
                href={story.url}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="group grid grid-cols-1 gap-4 border-t border-black/25 py-8 transition-opacity hover:opacity-60 md:grid-cols-[12rem_1fr_auto] md:gap-12"
              >
                <div className="text-xs uppercase tracking-[0.18em] text-black/60">
                  <p className="font-bold text-black">{story.category}</p>
                  <p className="mt-1">{story.date}</p>
                  <p>{story.readTime}</p>
                </div>
                <div>
                  <h2 className="display text-3xl leading-none md:text-5xl">
                    {story.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-black/75">
                    {story.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {story.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-black/40 px-2 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowUpRightIcon className="hidden h-6 w-6 transition-transform duration-300 group-hover:rotate-45 md:block" />
              </a>
            );
          })}
        </div>
        <SiteFooter />
      </section>
    </main>
  );
}
