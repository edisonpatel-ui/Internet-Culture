interface JsonLdProps {
  data: object | object[];
}

/**
 * Serialize for safe embedding inside a <script> tag. Escaping "<" (plus the
 * U+2028/U+2029 line separators) keeps the output valid JSON while making it
 * impossible for article text such as "</script>" to break out of the tag.
 */
function serializeJsonLd(data: object | object[]): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

/** Renders JSON-LD for search engines. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
