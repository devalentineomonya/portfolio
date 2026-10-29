import type { Metadata } from "next";
import { StoriesIndex } from "@/components/pages/stories-index";
import { JsonLd } from "@/components/site/json-ld";
import { stories } from "@/data/stories";
import { breadcrumbSchema, storiesListSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Stories",
  description: "Notes on software, learning and building things people use.",
  alternates: { canonical: "/stories" },
  openGraph: {
    title: "Stories | Valentine Omonya",
    description: "Notes on software, learning and building things people use.",
    url: "/stories",
  },
};

export default function StoriesPage() {
  return (
    <main>
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Stories", path: "/stories" },
          ]),
          storiesListSchema(stories),
        ]}
      />
      <StoriesIndex />
    </main>
  );
}
