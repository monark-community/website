import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import SectionHeading from "@/components/pages/about/sections/section-heading";
import { photos } from "@/components/common/photo/photos";
import { I18n, BrandLogoCardId } from "../brand.i18n";
import { LOGO_FILES, LogoId, svgPath } from "../brand-assets";
import { DownloadLinks, PREVIEW_BG } from "../brand-ui";

type T = I18n["brand_page"]["logos"];
type Props = { t: T };

type Panel = {
  logo: LogoId;
  /** A flat colour, or a photo (for the mono logo on a busy background). */
  background: string | "photo";
  /** Width of the logo inside the panel. */
  size: string;
};

type Card = {
  id: BrandLogoCardId;
  panels: Panel[];
  /** Download rows under the previews. */
  downloads: { logo: LogoId; label: keyof T["rows"] | "for_light" | "for_dark" | "for_any" }[];
  wide?: boolean;
};

const cards: Card[] = [
  {
    id: "horizontal",
    wide: true,
    panels: [
      { logo: "horizontal-color-on-light", background: PREVIEW_BG.cream, size: "w-[78%] max-w-[26rem]" },
      { logo: "horizontal-color-on-dark", background: PREVIEW_BG.espresso, size: "w-[78%] max-w-[26rem]" },
    ],
    downloads: [
      { logo: "horizontal-color-on-light", label: "for_light" },
      { logo: "horizontal-color-on-dark", label: "for_dark" },
    ],
  },
  {
    id: "vertical",
    panels: [
      { logo: "vertical-color-on-light", background: PREVIEW_BG.cream, size: "w-[92%]" },
      { logo: "vertical-color-on-dark", background: PREVIEW_BG.espresso, size: "w-[92%]" },
    ],
    downloads: [
      { logo: "vertical-color-on-light", label: "for_light" },
      { logo: "vertical-color-on-dark", label: "for_dark" },
    ],
  },
  {
    id: "mark",
    panels: [
      { logo: "mark-color", background: PREVIEW_BG.cream, size: "w-[80%]" },
      { logo: "mark-color", background: PREVIEW_BG.espresso, size: "w-[80%]" },
    ],
    downloads: [{ logo: "mark-color", label: "for_any" }],
  },
  {
    id: "mono-dark",
    panels: [
      { logo: "horizontal-mono-on-light", background: PREVIEW_BG.orange, size: "w-[92%]" },
      { logo: "mark-mono-on-light", background: PREVIEW_BG.cream, size: "w-[80%]" },
    ],
    downloads: [
      { logo: "horizontal-mono-on-light", label: "horizontal" },
      { logo: "vertical-mono-on-light", label: "vertical" },
      { logo: "mark-mono-on-light", label: "mark" },
    ],
  },
  {
    id: "mono-light",
    panels: [
      { logo: "horizontal-mono-on-dark", background: "photo", size: "w-[92%]" },
      { logo: "mark-mono-on-dark", background: PREVIEW_BG.espresso, size: "w-[80%]" },
    ],
    downloads: [
      { logo: "horizontal-mono-on-dark", label: "horizontal" },
      { logo: "vertical-mono-on-dark", label: "vertical" },
      { logo: "mark-mono-on-dark", label: "mark" },
    ],
  },
];

const PHOTO = photos["community-meetup-discussion"];

function PreviewPanel({ panel, alt, wide }: { panel: Panel; alt: string; wide?: boolean }) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden",
        wide ? "aspect-[16/9] sm:aspect-[16/7]" : "aspect-square"
      )}
      style={panel.background === "photo" ? undefined : { backgroundColor: panel.background }}
    >
      {panel.background === "photo" && (
        <Image
          src={PHOTO.src}
          alt=""
          fill
          sizes="(min-width: 768px) 280px, 50vw"
          placeholder="blur"
          className="object-cover"
        />
      )}
      {/* A dark wash so the white logo reads on the photo (the photo is the background, the logo is untouched). */}
      {panel.background === "photo" && <span aria-hidden="true" className="absolute inset-0 bg-black/45" />}
      <Image
        src={svgPath(panel.logo)}
        alt={alt}
        width={LOGO_FILES[panel.logo].width}
        height={LOGO_FILES[panel.logo].height}
        className={cn("relative h-auto", panel.size)}
      />
    </div>
  );
}

/**
 * One card per lockup: the file previewed on the background it's drawn
 * for (fixed cream, espresso, orange or a photo, whatever the site theme),
 * then SVG and PNG downloads for each file.
 */
function BrandLogos({ t }: Props) {
  return (
    <section id="logos" aria-labelledby="brand-logos">
      <SectionHeading id="brand-logos" eyebrow={t.eyebrow} title={t.title} intro={t.intro} />
      <ul className="mt-10 grid gap-4 md:grid-cols-2">
        {cards.map((card) => {
          const copy = t.cards[card.id];
          return (
            <li
              key={card.id}
              className={cn(
                "flex flex-col overflow-hidden rounded-2xl border bg-card",
                card.wide && "md:col-span-2"
              )}
            >
              <div className="grid grid-cols-2 border-b">
                {card.panels.map((panel, index) => (
                  <PreviewPanel
                    key={index}
                    panel={panel}
                    wide={card.wide}
                    alt={index === 0 ? `${t.preview_alt}, ${copy.title}` : ""}
                  />
                ))}
              </div>
              <div className="flex flex-1 flex-col gap-4 p-5">
                <div>
                  <h3 className="text-lg">{copy.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{copy.use}</p>
                </div>
                <div
                  className={cn(
                    "mt-auto grid gap-4",
                    card.wide && card.downloads.length === 2 && "sm:grid-cols-2"
                  )}
                >
                  {card.downloads.map(({ logo, label }) => {
                    const text =
                      label in t.rows
                        ? t.rows[label as keyof T["rows"]]
                        : (t[label as "for_light" | "for_dark" | "for_any"] as string);
                    return (
                      <div key={logo}>
                        <p className="mb-2 text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground">
                          {text}
                        </p>
                        <DownloadLinks
                          id={logo}
                          label={`${copy.title}, ${text}`}
                          download={t.download}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default BrandLogos;
