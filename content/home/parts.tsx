import type { ElementType } from "react";

/** Same label, same spot, every section: "03 — Selected work". */
export const Kicker = ({ index, label }: { index: string; label: string }) => (
  <p className="kicker">
    <span>{index}</span>
    <span className="kicker-rule" aria-hidden="true"></span>
    <span>{label}</span>
  </p>
);

/**
 * Big Anton headline split into masked letters, so every section can share
 * one reveal (letters rise out of their line). `\n` starts a new line.
 */
export const Headline = ({
  text,
  as: Tag = "h2",
  className = "",
  id,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  id?: string;
}) => (
  <Tag className={`headline ${className}`} aria-label={text.replace(/\n/g, " ")} id={id}>
    {text.split("\n").map((line, l) => (
      <span className="headline-line" aria-hidden="true" key={l}>
        {line.split("").map((char, c) => (
          <span className="headline-char" key={c}>
            {char === " " ? " " : char}
          </span>
        ))}
      </span>
    ))}
  </Tag>
);
