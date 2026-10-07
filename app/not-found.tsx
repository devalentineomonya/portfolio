import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";

export default function NotFound() {
  return (
    <main>
      <section className="poster-section bg-ink text-white divider-grid flex flex-col items-center justify-center px-5">
        <h1 className="huge-word relative z-10 text-white/10 text-[44vw] md:text-[32vw]">
          404
        </h1>
        <span className="hand absolute z-20 -rotate-12 select-none text-amber text-[18vw] md:text-[10vw]">
          lost?
        </span>
        <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/25">
          <div className="flex flex-col items-start gap-4 px-5 py-5 pr-48 md:px-8">
            <p className="max-w-sm text-base font-semibold leading-snug">
              Hmm, I can&apos;t find that page. It may have moved.
            </p>
            <Link
              href="/"
              className="group flex items-center gap-2 text-sm font-medium hover:opacity-60 transition-opacity"
            >
              Back home
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
