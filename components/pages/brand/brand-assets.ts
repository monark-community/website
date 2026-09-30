/**
 * The files and values behind the /brand page, shared with the generator
 * (scripts/brand/brand-kit.script.ts) so the page, the downloads and the
 * kit's README never disagree. Plain TypeScript with no path aliases: the
 * script imports it with bun.
 *
 * Logo files are copied byte for byte from public/vectors/brand/. Those
 * sources are named by theme ("logo-branded-light-…" has dark lettering,
 * for the light theme); the brand kit in lovable-migration/brand-refs names
 * the same drawings the other way round, by lettering colour. The published
 * names below say which background a file is for, so neither trap applies.
 */

export const BRAND_DIR = "/brand";
export const KIT_FILE = `${BRAND_DIR}/monark-brand-kit.zip`;

/** Which background a logo file is drawn for. */
export type LogoBackground = "light" | "dark" | "any";

export type LogoFile = {
  /** Published basename, without extension. */
  name: string;
  /** Source, relative to public/vectors/brand/. */
  source: string;
  /** Canvas size of the SVG (viewBox), in its own units. */
  width: number;
  height: number;
  background: LogoBackground;
};

export const PNG_WIDTHS = [512, 1024, 2048] as const;

export const LOGO_FILES = {
  "horizontal-color-on-light": {
    name: "monark-horizontal-color-on-light",
    source: "horizontal/logo-branded-light-horizontal.svg",
    width: 714,
    height: 221,
    background: "light",
  },
  "horizontal-color-on-dark": {
    name: "monark-horizontal-color-on-dark",
    source: "horizontal/logo-branded-dark-horizontal.svg",
    width: 714,
    height: 221,
    background: "dark",
  },
  "vertical-color-on-light": {
    name: "monark-vertical-color-on-light",
    source: "vertical/logo-branded-light-vertical.svg",
    width: 305,
    height: 304,
    background: "light",
  },
  "vertical-color-on-dark": {
    name: "monark-vertical-color-on-dark",
    source: "vertical/logo-branded-dark-vertical.svg",
    width: 305,
    height: 304,
    background: "dark",
  },
  "mark-color": {
    name: "monark-mark-color",
    source: "standalone/logo-branded-standalone.svg",
    width: 305,
    height: 304,
    background: "any",
  },
  "horizontal-mono-on-light": {
    name: "monark-horizontal-mono-on-light",
    source: "horizontal/logo-mono-light-horizontal.svg",
    width: 714,
    height: 221,
    background: "light",
  },
  "horizontal-mono-on-dark": {
    name: "monark-horizontal-mono-on-dark",
    source: "horizontal/logo-mono-dark-horizontal.svg",
    width: 714,
    height: 221,
    background: "dark",
  },
  "vertical-mono-on-light": {
    name: "monark-vertical-mono-on-light",
    source: "vertical/logo-mono-light-vertical.svg",
    width: 305,
    height: 304,
    background: "light",
  },
  "vertical-mono-on-dark": {
    name: "monark-vertical-mono-on-dark",
    source: "vertical/logo-mono-dark-vertical.svg",
    width: 305,
    height: 304,
    background: "dark",
  },
  "mark-mono-on-light": {
    name: "monark-mark-mono-on-light",
    source: "standalone/logo-mono-light-standalone.svg",
    width: 305,
    height: 304,
    background: "light",
  },
  "mark-mono-on-dark": {
    name: "monark-mark-mono-on-dark",
    source: "standalone/logo-mono-dark-standalone.svg",
    width: 305,
    height: 304,
    background: "dark",
  },
} as const satisfies Record<string, LogoFile>;

export type LogoId = keyof typeof LOGO_FILES;

export const svgPath = (id: LogoId) =>
  `${BRAND_DIR}/logos/svg/${LOGO_FILES[id].name}.svg`;

export const pngPath = (id: LogoId, width: number) =>
  `${BRAND_DIR}/logos/png/${LOGO_FILES[id].name}-${width}.png`;

/**
 * Where the drawing sits inside each SVG canvas (measured with getBBox).
 * The files carry their own padding; the page crops to these boxes to
 * show clear space and minimum sizes on the drawing itself.
 */
export const ARTWORK_BOX = {
  mark: { x: 53.3, y: 91.4, width: 198, height: 121.5 },
  horizontal: { x: 16.5, y: 49.3, width: 670.9, height: 121.5 },
  vertical: { x: 40.9, y: 54.4, width: 226.6, height: 178.7 },
} as const;

/** "Built with Monark" credit badges, generated from the mono mark. */
export const CREDIT_FILES = {
  "en-on-light": "built-with-monark-on-light",
  "en-on-dark": "built-with-monark-on-dark",
  "fr-on-light": "propulse-par-monark-on-light",
  "fr-on-dark": "propulse-par-monark-on-dark",
} as const;

export type CreditId = keyof typeof CREDIT_FILES;

export const creditPath = (id: CreditId) =>
  `${BRAND_DIR}/credit/${CREDIT_FILES[id]}.svg`;

/** Design tokens from the Monark Brand 2026 kit (brand-2026/tokens/). */
export const TOKEN_FILES = [
  "tokens.css",
  "monark.tokens.json",
  "monark.light.tokens.json",
  "monark.dark.tokens.json",
  "tokens-studio.json",
] as const;

export const tokenPath = (file: (typeof TOKEN_FILES)[number]) =>
  `${BRAND_DIR}/tokens/${file}`;

/**
 * Colour values, from app/theme.css (the hex fallbacks of the live
 * formulas) and monark-brand-guidelines.md §3. Contrast ratios are the
 * guide's, checked against WCAG AA.
 */
export type SwatchToken =
  | "background"
  | "card"
  | "secondary"
  | "border"
  | "foreground"
  | "muted-foreground"
  | "primary-ink"
  | "chart-2";

export type Swatch = { token: SwatchToken; hex: string; contrast?: string };

export const ORANGE = "#F88D10";
export const LOGO_GRADIENT = ["#ED2723", "#FBA60B"] as const;

export const PALETTE: Record<"light" | "dark", Swatch[]> = {
  light: [
    { token: "background", hex: "#FFF9F3" },
    { token: "card", hex: "#FFFEFC" },
    { token: "secondary", hex: "#F7ECE4" },
    { token: "border", hex: "#E9DFD7" },
    { token: "foreground", hex: "#15110E", contrast: "18:1" },
    { token: "muted-foreground", hex: "#625952", contrast: "6.5:1" },
    { token: "primary-ink", hex: "#B65000", contrast: "4.9:1" },
    { token: "chart-2", hex: "#EF3620" },
  ],
  dark: [
    { token: "background", hex: "#1A0B02" },
    { token: "card", hex: "#26170A" },
    { token: "secondary", hex: "#36281D" },
    { token: "border", hex: "#433529" },
    { token: "foreground", hex: "#FFF0E4", contrast: "17:1" },
    { token: "muted-foreground", hex: "#B8A79A", contrast: "7.5:1" },
    { token: "primary-ink", hex: "#F88D10", contrast: "8.1:1" },
    { token: "chart-2", hex: "#FC452F" },
  ],
};
