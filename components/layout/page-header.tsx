const tones = {
  violet: { bg: "bg-violet", text: "text-white", lines: "" },
  lilac: { bg: "bg-lilac", text: "text-black", lines: "dark-lines" },
  iris: { bg: "bg-iris", text: "text-white", lines: "" },
} as const;

interface PageHeaderProps {
  word: string;
  tone: keyof typeof tones;
  copy: string;
}

/** Poster band that opens every inner page: one huge word, one line of copy. */
export const PageHeader = ({ word, tone, copy }: PageHeaderProps) => {
  const { bg, text, lines } = tones[tone];
  return (
    <header
      className={`poster-section poster-static divider-grid ${lines} ${bg} ${text} flex flex-col justify-end`}
    >
      <p className="absolute right-5 md:right-8 top-28 z-10 max-w-[300px] text-base font-semibold leading-snug">
        {copy}
      </p>
      <h1 className="huge-word relative z-10 px-5 md:px-8 -mb-[0.05em] text-[24vw] md:text-[28vw]">
        {word}
      </h1>
    </header>
  );
};
