import type { Metadata } from "next";
import { StoriesIndex } from "@/components/pages/stories-index";

export const metadata: Metadata = {
  title: "Stories",
  description: "Notes on software, learning and building things people use.",
};

export default function StoriesPage() {
  return (
    <main>
      <StoriesIndex />
    </main>
  );
}
