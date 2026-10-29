/**
 * Renders one @graph of structured data. Everything on a page goes in a single
 * script, so the nodes can reference each other by @id.
 */
export function JsonLd({ schema }: { schema: object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": schema }).replace(
          /</g,
          "\\u003c",
        ),
      }}
    />
  );
}
