/**
 * Builds everything the /brand page offers for download, under public/brand/:
 *
 *   logos/svg/*.svg        byte-for-byte copies of public/vectors/brand/ files,
 *                          renamed by the background they are drawn for
 *   logos/png/*-{512,1024,2048}.png   transparent PNGs rendered from those SVGs
 *   credit/*.svg           "Built with Monark" / "Propulsé par Monark" badges,
 *                          built around the unaltered mono mark
 *   tokens/*               design tokens copied from the Monark Brand 2026 kit
 *                          (only when --tokens <dir> is given; otherwise the
 *                          committed copies are kept)
 *   monark-brand-kit.zip   all of the above plus README.txt (usage rules and
 *                          the colour list). No fonts: the kit never ships them.
 *
 * It also writes components/pages/brand/brand-kit.generated.ts (the zip's
 * size, shown next to the download button).
 *
 * Usage (from the repo root):
 *   bun scripts/brand/brand-kit.script.ts
 *   bun scripts/brand/brand-kit.script.ts --tokens ../brand-2026/tokens
 *
 * The file list, palette and PNG sizes live in
 * components/pages/brand/brand-assets.ts, shared with the page. PNGs use
 * sharp, which Next.js already installs. The zip is written with node:zlib
 * and fixed timestamps, so the same inputs give the same archive.
 */
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import {
  ARTWORK_BOX,
  CREDIT_FILES,
  LOGO_FILES,
  LOGO_GRADIENT,
  ORANGE,
  PALETTE,
  PNG_WIDTHS,
  TOKEN_FILES,
  type CreditId,
  type LogoId,
} from "../../components/pages/brand/brand-assets";
import { en } from "../../components/pages/brand/brand.i18n";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SOURCE_DIR = path.join(ROOT, "public/vectors/brand");
const OUT = path.join(ROOT, "public/brand");

const write = (rel: string, data: string | Buffer) => {
  const file = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, data);
};

// ---------- logos: SVG copies and PNG renders ----------

async function buildLogos() {
  fs.rmSync(path.join(OUT, "logos"), { recursive: true, force: true });
  for (const id of Object.keys(LOGO_FILES) as LogoId[]) {
    const logo = LOGO_FILES[id];
    const svg = fs.readFileSync(path.join(SOURCE_DIR, logo.source));
    write(`logos/svg/${logo.name}.svg`, svg);
    for (const width of PNG_WIDTHS) {
      // Render at the target size (density scales the SVG's own units),
      // so edges stay crisp instead of upscaling a small bitmap.
      const density = Math.ceil((72 * width) / logo.width);
      const png = await sharp(svg, { density })
        .resize({ width })
        .png({ compressionLevel: 9, palette: false })
        .toBuffer();
      write(`logos/png/${logo.name}-${width}.png`, png);
    }
  }
}

// ---------- credit badges ----------

const CREDIT_TEXT: Record<CreditId, string> = {
  "en-on-light": "Built with Monark",
  "en-on-dark": "Built with Monark",
  "fr-on-light": "Propulsé par Monark",
  "fr-on-dark": "Propulsé par Monark",
};

function buildCredits() {
  fs.rmSync(path.join(OUT, "credit"), { recursive: true, force: true });
  const light = PALETTE.light;
  const dark = PALETTE.dark;
  const hex = (list: typeof light, token: string) =>
    list.find((s) => s.token === token)!.hex;

  for (const id of Object.keys(CREDIT_FILES) as CreditId[]) {
    const onDark = id.endsWith("on-dark");
    const markSource = LOGO_FILES[onDark ? "mark-mono-on-dark" : "mark-mono-on-light"];
    // The mark's own markup, unchanged, inside a nested <svg> whose viewBox
    // crops the file's padding. Gradient ids get a prefix so two badges can
    // sit inline in the same page.
    const raw = fs.readFileSync(path.join(SOURCE_DIR, markSource.source), "utf8");
    const inner = raw
      .replace(/^[\s\S]*?<svg[^>]*>/, "")
      .replace(/<\/svg>\s*$/, "")
      .replace(/paint(\d)_linear_[\w]+/g, `credit-${id}-p$1`)
      .trim();
    const palette = onDark ? dark : light;
    const bg = hex(palette, "card");
    const border = hex(palette, "border");
    const ink = hex(palette, "muted-foreground");
    const text = CREDIT_TEXT[id];
    const box = ARTWORK_BOX.mark;
    const markHeight = 14;
    const markWidth = +((box.width / box.height) * markHeight).toFixed(2);
    const textWidth = id.startsWith("fr") ? 118 : 106;
    const height = 32;
    const padX = 12;
    const gap = 7;
    const width = Math.ceil(padX + markWidth + gap + textWidth + padX + 2);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${text}">
<title>${text}</title>
<rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" rx="${(height - 1) / 2}" fill="${bg}" stroke="${border}"/>
<svg x="${padX}" y="${(height - markHeight) / 2}" width="${markWidth}" height="${markHeight}" viewBox="${box.x} ${box.y} ${box.width} ${box.height}" fill="none">
${inner}
</svg>
<text x="${padX + markWidth + gap}" y="${height / 2}" dominant-baseline="central" textLength="${textWidth}" fill="${ink}" font-family="'Nunito Sans', 'Nunito', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="13" font-weight="700">${text}</text>
</svg>
`;
    write(`credit/${CREDIT_FILES[id]}.svg`, svg);
  }
}

// ---------- tokens ----------

function copyTokens() {
  const flag = process.argv.indexOf("--tokens");
  if (flag === -1) return;
  const dir = path.resolve(process.argv[flag + 1]);
  for (const file of TOKEN_FILES) {
    write(`tokens/${file}`, fs.readFileSync(path.join(dir, file)));
  }
}

// ---------- README ----------

function readme() {
  const t = en.brand_page;
  const swatchLines = (mode: "light" | "dark") =>
    PALETTE[mode]
      .map((s) => {
        const name = t.colour.swatches[s.token];
        const contrast = s.contrast ? ` (${s.contrast})` : "";
        return `  ${name.name.padEnd(14)} ${s.hex}  ${name.role}${contrast}`;
      })
      .join("\r\n");
  const hasTokens = fs.existsSync(path.join(OUT, "tokens"));
  const lines = [
    "MONARK BRAND KIT",
    "================",
    "",
    "Guidelines: https://www.monark.io/brand",
    "Tagline: Fostering Collaboration within the Web3 Community",
    "",
    "WHAT'S INSIDE",
    "  logos/svg/     Every lockup as SVG. Use these whenever you can.",
    "  logos/png/     The same files as transparent PNGs, 512, 1024 and 2048px wide.",
    "  credit/        \"Built with Monark\" badges for independent products (EN and FR).",
    ...(hasTokens
      ? ["  tokens/        Colour and type tokens (CSS, W3C design tokens, Tokens Studio)."]
      : []),
    "",
    "  File names say which background a logo is for:",
    "  -on-light = dark lettering, for cream or white backgrounds.",
    "  -on-dark  = white lettering, for espresso or dark backgrounds.",
    "",
    "LOGO RULES",
    "  - Use the files as they are. Never retype, redraw, recolour, stretch,",
    "    rotate, outline, add effects to or animate the logo.",
    "  - Clear space: at least half the height of the butterfly mark, on every side.",
    "  - Minimum size: the mark 20px tall (16px as a favicon); the horizontal",
    "    logo 120px wide. Measured on the drawing, not the file's padding.",
    "  - The colour logo goes on plain cream, white or espresso. On photos,",
    "    orange or busy backgrounds, use a mono version.",
    `  - The mark's gradient (${LOGO_GRADIENT[0]} to ${LOGO_GRADIENT[1]}) belongs to the logo.`,
    "    It is the only gradient in the brand.",
    "",
    "COLOUR",
    `  Monark orange   ${ORANGE}  The accent: fills, icons, focus, one main button per screen.`,
    "                            Text on orange is always dark (7.9:1), never white (2.4:1).",
    "                            Never set orange text on cream (2.3:1): use orange ink.",
    "",
    "  Cream (light theme)",
    swatchLines("light"),
    "",
    "  Espresso (dark theme)",
    swatchLines("dark"),
    "",
    "TYPE",
    "  Nunito Sans for all text (400, 600, 700, 800), sentence case headings.",
    "  Free from Google Fonts: https://fonts.google.com/specimen/Nunito+Sans",
    "  Fonts are not included in this kit.",
    "  The MONARK wordmark is set in Trajan Pro, a commercial font that is not",
    "  provided. Don't set any other text in Trajan or its lookalike Cinzel.",
    "",
    "PRODUCTS",
    "  Monark products: the colour mark (28px), a 10px gap, then the product",
    "  name in Nunito Sans 800 at 18px, on one line. No product logos.",
    "  Independent products: a small \"Built with Monark\" credit in the footer,",
    "  linking to https://www.monark.io.",
    "",
    "CONTACT",
    "  contact@monark.io  ·  https://discord.gg/TvhrbFCp8T",
    "",
  ];
  return lines.join("\r\n");
}

// ---------- zip (stored + deflate, fixed timestamps) ----------

function zip(entries: { name: string; data: Buffer }[]) {
  // 1980-01-01 00:00 in DOS format, so rebuilding gives the same bytes.
  const dosTime = 0;
  const dosDate = (0 << 9) | (1 << 5) | 1;
  const locals: Buffer[] = [];
  const centrals: Buffer[] = [];
  let offset = 0;
  for (const { name, data } of entries) {
    const nameBuf = Buffer.from(name, "utf8");
    const deflated = zlib.deflateRawSync(data, { level: 9 });
    // PNGs barely compress: store them when deflate doesn't help.
    const useDeflate = deflated.length < data.length;
    const body = useDeflate ? deflated : data;
    const crc = zlib.crc32(data);
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0x0800, 6); // UTF-8 names
    local.writeUInt16LE(useDeflate ? 8 : 0, 8);
    local.writeUInt16LE(dosTime, 10);
    local.writeUInt16LE(dosDate, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(body.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(nameBuf.length, 26);
    local.writeUInt16LE(0, 28);
    locals.push(local, nameBuf, body);

    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0x0800, 8);
    central.writeUInt16LE(useDeflate ? 8 : 0, 10);
    central.writeUInt16LE(dosTime, 12);
    central.writeUInt16LE(dosDate, 14);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(body.length, 20);
    central.writeUInt32LE(data.length, 24);
    central.writeUInt16LE(nameBuf.length, 28);
    central.writeUInt32LE(offset, 42);
    centrals.push(central, nameBuf);
    offset += local.length + nameBuf.length + body.length;
  }
  const centralSize = centrals.reduce((n, b) => n + b.length, 0);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(entries.length, 8);
  end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(centralSize, 12);
  end.writeUInt32LE(offset, 16);
  return Buffer.concat([...locals, ...centrals, end]);
}

function listFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) =>
      entry.isDirectory()
        ? listFiles(path.join(dir, entry.name))
        : [path.join(dir, entry.name)]
    )
    .sort();
}

function buildZip() {
  const entries = [
    { name: "monark-brand-kit/README.txt", data: Buffer.from(readme(), "utf8") },
    ...["logos", "credit", "tokens"].flatMap((folder) =>
      listFiles(path.join(OUT, folder)).map((file) => ({
        name: `monark-brand-kit/${path.relative(OUT, file).split(path.sep).join("/")}`,
        data: fs.readFileSync(file),
      }))
    ),
  ];
  const archive = zip(entries);
  write("monark-brand-kit.zip", archive);
  // The page shows the kit's size; routes render on demand, where public/
  // isn't on the server's disk, so the size is written into the code.
  fs.writeFileSync(
    path.join(ROOT, "components/pages/brand/brand-kit.generated.ts"),
    `// Generated by scripts/brand/brand-kit.script.ts. Do not edit.
export const KIT_BYTES = ${archive.length};
`
  );
  console.log(`monark-brand-kit.zip: ${entries.length} files, ${(archive.length / 1024).toFixed(0)} KB`);
}

await buildLogos();
buildCredits();
copyTokens();
buildZip();
