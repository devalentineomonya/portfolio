import type { Metadata } from "next";
import { WorkIndex } from "@/components/pages/work-index";
import { JsonLd } from "@/components/site/json-ld";
import { workProjects } from "@/data/work";
import { breadcrumbSchema, projectListSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Online stores, websites and business systems built by Valentine Omonya for shops, clinics, schools and startups.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work | Valentine Omonya",
    description:
      "Online stores, websites and business systems built by Valentine Omonya for shops, clinics, schools and startups.",
    url: "/work",
  },
};

export default function WorkPage() {
  return (
    <main>
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
          ]),
          projectListSchema(workProjects),
        ]}
      />
      <WorkIndex />
    </main>
  );
}
