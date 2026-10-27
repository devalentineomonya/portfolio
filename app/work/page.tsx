import type { Metadata } from "next";
import { WorkIndex } from "@/components/pages/work-index";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Websites and apps built by Valentine Omonya for clinics, schools, businesses and everyday people.",
};

export default function WorkPage() {
  return (
    <main>
      <WorkIndex />
    </main>
  );
}
