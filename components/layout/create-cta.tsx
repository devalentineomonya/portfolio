import { heroContent } from "@/data/hero";
import { ArrowUpRightIcon } from "@/components/ui/icons";

export const CreateCta = () => (
  <a
    className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-[65] group flex items-center gap-8 bg-black text-white border border-white/25 pl-6 pr-2 py-2 hover:bg-neutral-800 transition-colors"
    href={heroContent.links.email}
    id="createcta"
  >
    <span className="text-sm font-medium"> Say hello </span>
    <span className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
      <ArrowUpRightIcon className="w-4 h-4" strokeWidth={1.5} />
    </span>
  </a>
);
