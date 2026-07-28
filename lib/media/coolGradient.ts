/**
 * Cool-toned hero / card gradient placeholders for the dark UI.
 * Score bars, status chips, and category tags are untouched.
 *
 * Uses inline CSS colors (not dynamic Tailwind class names) so every
 * remapped gradient is always available at runtime.
 */

type RGB = readonly [number, number, number];

/** Distinct cool stops — spaced apart on charcoal so they don’t look alike. */
const COOL_PALETTE: readonly RGB[] = [
  [99, 102, 241], // indigo
  [14, 165, 233], // sky
  [6, 182, 212], // cyan
  [20, 184, 166], // teal
  [16, 185, 129], // emerald
  [139, 92, 246], // violet
  [124, 58, 237], // purple
  [59, 130, 246], // blue
  [71, 85, 105], // slate
  [63, 63, 70], // zinc
];

const WARM_FAMILIES = new Set([
  "red",
  "rose",
  "orange",
  "amber",
  "yellow",
  "pink",
  "fuchsia",
  "lime",
]);

const FAMILY_TO_COOL_INDEX: Record<string, number> = {
  red: 5, // violet
  rose: 6, // purple
  orange: 2, // cyan
  amber: 1, // sky
  yellow: 3, // teal
  pink: 0, // indigo
  fuchsia: 7, // blue
  lime: 4, // emerald
  emerald: 4,
  green: 4,
  teal: 3,
  cyan: 2,
  sky: 1,
  blue: 7,
  indigo: 0,
  violet: 5,
  purple: 6,
  slate: 8,
  zinc: 9,
  neutral: 9,
  stone: 8,
  gray: 9,
  white: 8,
  black: 9,
};

const TOKEN_RE =
  /\b(from|via|to)-([a-z]+)(?:-([0-9]{2,3}))?\b/g;

function shadeFactor(shade: string | undefined): number {
  if (!shade) return 0.55;
  const n = Number(shade);
  if (!Number.isFinite(n)) return 0.55;
  // Tailwind 50–950 → brightness factor for dark theme
  return Math.max(0.28, Math.min(0.85, (1000 - n) / 1100 + 0.2));
}

function applyShade(rgb: RGB, factor: number): string {
  const r = Math.round(rgb[0] * factor + 12 * (1 - factor));
  const g = Math.round(rgb[1] * factor + 12 * (1 - factor));
  const b = Math.round(rgb[2] * factor + 14 * (1 - factor));
  return `rgb(${r}, ${g}, ${b})`;
}

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function parseStops(gradient: string): { family: string; shade?: string }[] {
  const stops: { family: string; shade?: string }[] = [];
  TOKEN_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = TOKEN_RE.exec(gradient)) !== null) {
    stops.push({ family: m[2], shade: m[3] });
  }
  return stops;
}

function hasWarmStop(stops: { family: string }[]): boolean {
  return stops.some((s) => WARM_FAMILIES.has(s.family));
}

/**
 * CSS `background-image` for a cool-only diagonal gradient.
 * Prefer this over Tailwind class remapping (JIT won’t see dynamic classes).
 */
export function coolGradientCss(gradient: string): string {
  const stops = parseStops(gradient);
  let colors: string[];

  if (stops.length >= 2) {
    colors = stops.map((stop, i) => {
      const idx =
        FAMILY_TO_COOL_INDEX[stop.family] ??
        hashString(`${gradient}:${i}`) % COOL_PALETTE.length;
      // Nudge adjacent stops apart when families collide after remapping
      const palette = COOL_PALETTE[(idx + i) % COOL_PALETTE.length];
      return applyShade(palette, shadeFactor(stop.shade));
    });
  } else {
    const h = hashString(gradient || "default");
    colors = [0, 1, 2].map((i) =>
      applyShade(
        COOL_PALETTE[(h + i * 3) % COOL_PALETTE.length],
        0.45 + i * 0.12,
      ),
    );
  }

  // Ensure at least 3 stops for a smoother wash
  while (colors.length < 3) {
    colors.push(colors[colors.length - 1] ?? "rgb(39, 39, 42)");
  }

  return `linear-gradient(to bottom right, ${colors.join(", ")})`;
}

/** @deprecated Prefer coolGradientCss — kept for call sites that still want a class string. */
export function toCoolImageGradient(gradient: string): string {
  const stops = parseStops(gradient);
  if (!hasWarmStop(stops) && stops.length >= 2) return gradient;
  return coolGradientForCategory("meme");
}

/** Cool category defaults for newly generated articles. */
export function coolGradientForCategory(category: string): string {
  switch (category) {
    case "meme":
      return "from-indigo-600 via-violet-500 to-blue-700";
    case "slang":
      return "from-cyan-500 via-sky-500 to-teal-600";
    case "event":
      return "from-slate-600 via-blue-600 to-indigo-800";
    case "creator":
      return "from-emerald-500 via-teal-500 to-cyan-700";
    case "trend":
      return "from-violet-600 via-indigo-500 to-slate-800";
    case "brainrot":
      return "from-purple-600 via-indigo-600 to-cyan-800";
    default:
      return "from-zinc-700 via-slate-800 to-zinc-950";
  }
}
