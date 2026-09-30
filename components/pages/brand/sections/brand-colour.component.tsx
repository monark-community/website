import React from "react";
import Image from "next/image";
import { CheckIcon, DownloadIcon, XIcon } from "lucide-react";
import SectionHeading from "@/components/pages/about/sections/section-heading";
import { cn } from "@/lib/utils";
import { I18n } from "../brand.i18n";
import {
  LOGO_GRADIENT,
  ORANGE,
  PALETTE,
  Swatch,
  TOKEN_FILES,
  svgPath,
  tokenPath,
} from "../brand-assets";
import CopySwatch from "../copy-swatch";

type Props = { t: I18n["brand_page"]["colour"]; download: string };

/**
 * Sets a theme's own tokens on a panel, so it shows cream or espresso
 * whatever the site theme is (descendants read these variables).
 */
function themeVars(mode: "light" | "dark"): React.CSSProperties {
  const vars: Record<string, string> = {};
  for (const swatch of PALETTE[mode]) vars[`--${swatch.token}`] = swatch.hex;
  vars["--focus-ring"] = PALETTE[mode].find((s) => s.token === "primary-ink")!.hex;
  vars["--input"] = mode === "light" ? "#857F7A" : "#756659";
  return vars as React.CSSProperties;
}

// Live samples for the contrast notes: [background, text].
const samples: [string, string][] = [
  [ORANGE, "#15110E"],
  [ORANGE, "#FFFFFF"],
  ["#FFF9F3", ORANGE],
  ["#1A0B02", ORANGE],
];

function ThemePanel({
  mode,
  title,
  swatches,
  t,
}: {
  mode: "light" | "dark";
  title: string;
  swatches: Swatch[];
  t: Props["t"];
}) {
  return (
    <div
      style={themeVars(mode)}
      className="rounded-2xl border bg-background p-3 text-foreground sm:p-4"
    >
      <h3 className="px-2 pb-2 pt-1 text-lg">{title}</h3>
      <ul className="grid gap-1 sm:grid-cols-2">
        {swatches.map((swatch) => (
          <li key={swatch.token}>
            <CopySwatch
              hex={swatch.hex}
              name={t.swatches[swatch.token].name}
              role={t.swatches[swatch.token].role}
              contrast={swatch.contrast}
              copy={t.copy}
              copied={t.copied}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The palette for both themes (click to copy), then the contrast rules. */
function BrandColour({ t, download }: Props) {
  return (
    <section id="colour" aria-labelledby="brand-colour">
      <SectionHeading id="brand-colour" eyebrow={t.eyebrow} title={t.title} intro={t.intro} />

      <div className="mt-10 grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        {/* Monark orange: the one accent. Text on it is always dark. */}
        <div className="overflow-hidden rounded-2xl border bg-card">
          <div className="flex h-28 items-end p-5 sm:h-36" style={{ backgroundColor: ORANGE }}>
            <p className="text-2xl font-extrabold tracking-[-0.02em] text-[#15110E] sm:text-3xl">
              {t.orange.name}
            </p>
          </div>
          <div className="p-2">
            <CopySwatch
              hex={ORANGE}
              name={t.orange.name}
              role={t.orange.role}
              copy={t.copy}
              copied={t.copied}
              chipClassName="hidden"
            />
          </div>
        </div>
        <div className="flex flex-col rounded-2xl border bg-card p-5">
          <Image
            src={svgPath("mark-color")}
            alt=""
            width={305}
            height={304}
            className="-my-6 h-auto w-32 self-start"
          />
          <h3 className="mt-auto text-lg">{t.gradient.name}</h3>
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            {LOGO_GRADIENT[0]} → {LOGO_GRADIENT[1]}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{t.gradient.role}</p>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <ThemePanel mode="light" title={t.light_title} swatches={PALETTE.light} t={t} />
        <ThemePanel mode="dark" title={t.dark_title} swatches={PALETTE.dark} t={t} />
      </div>

      <h3 className="mt-10 text-lg">{t.contrast_title}</h3>
      <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {t.contrast.map((item, index) => {
          const [bg, fg] = samples[index];
          return (
            <li key={item.label} className="flex items-center gap-4 rounded-2xl border bg-card p-4">
              <span
                aria-hidden="true"
                className="flex size-14 shrink-0 items-center justify-center rounded-xl border text-2xl font-extrabold"
                style={{ backgroundColor: bg, color: fg }}
              >
                {t.sample}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">{item.label}</p>
                <p className="mt-1 flex items-center gap-1.5 text-sm">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "inline-flex size-4 items-center justify-center rounded-full",
                      item.ok
                        ? "bg-success text-white dark:text-background"
                        : "bg-destructive text-destructive-foreground"
                    )}
                  >
                    {item.ok ? (
                      <CheckIcon className="size-3" strokeWidth={3} />
                    ) : (
                      <XIcon className="size-3" strokeWidth={3} />
                    )}
                  </span>
                  <span className="font-bold text-foreground">{item.ratio}</span>
                </p>
                {item.fix && (
                  <p className="mt-0.5 text-xs text-muted-foreground">{item.fix}</p>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {/* The Monark Brand 2026 token files (brand-2026/tokens), as published. */}
      <div className="mt-4 flex flex-col gap-4 rounded-2xl border bg-card p-5 md:flex-row md:items-center md:justify-between">
        <div className="max-w-[34rem]">
          <h3 className="text-lg">{t.tokens_title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{t.tokens_text}</p>
        </div>
        <ul className="flex flex-wrap gap-1.5">
          {TOKEN_FILES.map((file) => (
            <li key={file}>
              <a
                href={tokenPath(file)}
                download={file}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-input px-3 font-mono text-xs font-semibold text-foreground transition-colors duration-150 ease-out hover:bg-secondary md:min-h-9"
              >
                <DownloadIcon aria-hidden="true" className="size-3.5" />
                <span className="sr-only">{download} </span>
                {file}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default BrandColour;
