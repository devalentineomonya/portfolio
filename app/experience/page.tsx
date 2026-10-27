import type { Metadata } from "next";
import { ExperienceTimeline } from "@/components/pages/experience-timeline";

export const metadata: Metadata = {
  title: "Experience",
  description: "Where Valentine Omonya has worked, and what the work involved.",
};

export default function ExperiencePage() {
  return (
    <main>
      <ExperienceTimeline />
    </main>
  );
}
