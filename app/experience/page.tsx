import type { Metadata } from "next";
import { ExperienceTimeline } from "@/components/pages/experience-timeline";
import { JsonLd } from "@/components/site/json-ld";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Track Record",
  description:
    "Delivered systems, client software, and production applications engineered by Valentine Omonya.",
  alternates: { canonical: "/experience" },
  openGraph: {
    title: "Track Record | Valentine Omonya",
    description:
      "Delivered systems, client software, and production applications engineered by Valentine Omonya.",
    url: "/experience",
  },
};

export default function ExperiencePage() {
  return (
    <main>
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Track Record", path: "/experience" },
          ]),
        ]}
      />
      <ExperienceTimeline />
    </main>
  );
}
