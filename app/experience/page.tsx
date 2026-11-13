import type { Metadata } from "next";
import { ExperienceTimeline } from "@/components/pages/experience-timeline";
import { JsonLd } from "@/components/site/json-ld";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Track Record",
  description:
    "Where Valentine Omonya has built software: freelance client systems, Transcom Media, a university tech society and a clinic platform.",
  alternates: { canonical: "/experience" },
  openGraph: {
    title: "Track Record | Valentine Omonya",
    description:
      "Where Valentine Omonya has built software: freelance client systems, Transcom Media, a university tech society and a clinic platform.",
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
