/**
 * components/docs/JsonHighlight.tsx
 *
 * Renders a pretty-printed JSON string with syntax-highlighted keys,
 * strings, numbers, booleans, and null — no third-party highlighter
 * dependency (prism/highlight.js) for what's fundamentally a small,
 * well-defined grammar. Builds real React nodes (never
 * dangerouslySetInnerHTML), consistent with the rest of this codebase
 * never trusting raw HTML strings.
 *
 * Used by components/ApiPlayground.tsx (the homepage teaser) and
 * available for any future "show a real API response" surface.
 */

type TokenType = "key" | "string" | "number" | "boolean" | "null" | "punctuation";

interface Token {
  text: string;
  type: TokenType;
}

const TOKEN_PATTERN = /"(?:\\.|[^"\\])*"|\btrue\b|\bfalse\b|\bnull\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g;

/** True if the next non-whitespace character after `index` in `source` is a colon — i.e. this quoted string is an object key. */
function isObjectKey(source: string, index: number): boolean {
  let i = index;
  while (i < source.length && /\s/.test(source[i])) i++;
  return source[i] === ":";
}

function tokenize(json: string): Token[] {
  const tokens: Token[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  TOKEN_PATTERN.lastIndex = 0;
  while ((match = TOKEN_PATTERN.exec(json)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ text: json.slice(lastIndex, match.index), type: "punctuation" });
    }

    const value = match[0];
    let type: TokenType;
    if (value.startsWith('"')) {
      type = isObjectKey(json, TOKEN_PATTERN.lastIndex) ? "key" : "string";
    } else if (value === "true" || value === "false") {
      type = "boolean";
    } else if (value === "null") {
      type = "null";
    } else {
      type = "number";
    }

    tokens.push({ text: value, type });
    lastIndex = TOKEN_PATTERN.lastIndex;
  }

  if (lastIndex < json.length) {
    tokens.push({ text: json.slice(lastIndex), type: "punctuation" });
  }

  return tokens;
}

const TOKEN_CLASS: Record<TokenType, string> = {
  key: "text-sky-400",
  string: "text-[var(--accent-secondary)]",
  number: "text-amber-300",
  boolean: "text-pink-400",
  null: "text-zinc-500 italic",
  punctuation: "text-zinc-400",
};

export function JsonHighlight({ value }: { value: unknown }) {
  const json = JSON.stringify(value, null, 2);
  const tokens = tokenize(json);

  return (
    <pre className="overflow-x-auto text-sm leading-relaxed">
      <code>
        {tokens.map((token, i) => (
          <span key={i} className={TOKEN_CLASS[token.type]}>
            {token.text}
          </span>
        ))}
      </code>
    </pre>
  );
}
