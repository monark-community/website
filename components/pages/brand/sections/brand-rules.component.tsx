import React from "react";
import Image from "next/image";
import { XIcon } from "lucide-react";
import SectionHeading from "@/components/pages/about/sections/section-heading";
import { photos } from "@/components/common/photo/photos";
import { cn } from "@/lib/utils";
import { I18n, BrandDontId } from "../brand.i18n";
import { LOGO_FILES, svgPath } from "../brand-assets";
import { HORIZONTAL_BOX, MARK_BOX, ThemedCroppedLogo } from "../brand-ui";

type Props = { t: I18n["brand_page"]["rules"] };

// Clear-space diagram, in the horizontal logo's own units: the drawing's
// box, then a band of half the mark's height (the mark is the tallest part).
const B = HORIZONTAL_BOX;
const HALF = MARK_BOX.height / 2;
const ZONE = { x: B.x - HALF, y: B.y - HALF, w: B.width + 2 * HALF, h: B.height + 2 * HALF };
const PAD = { left: 110, right: 20, top: 20, bottom: 20 };
const VIEW = {
  x: ZONE.x - PAD.left,
  y: ZONE.y - PAD.top,
  w: ZONE.w + PAD.left + PAD.right,
  h: ZONE.h + PAD.top + PAD.bottom,
};
const LOGO = LOGO_FILES["horizontal-color-on-light"];

function ClearSpaceDiagram({ x, half }: { x: string; half: string }) {
  const dimX = ZONE.x - 50;
  return (
    <svg
      viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`}
      className="h-auto w-full"
      aria-hidden="true"
    >
      {/* The clear-space band, then the drawing's own box on top. */}
      <rect
        x={ZONE.x}
        y={ZONE.y}
        width={ZONE.w}
        height={ZONE.h}
        className="fill-primary/10 stroke-primary"
        strokeWidth={2}
        strokeDasharray="10 8"
      />
      <rect x={B.x} y={B.y} width={B.width} height={B.height} className="fill-card" />
      <image
        href={svgPath("horizontal-color-on-light")}
        width={LOGO.width}
        height={LOGO.height}
        className="dark:hidden"
      />
      <image
        href={svgPath("horizontal-color-on-dark")}
        width={LOGO.width}
        height={LOGO.height}
        className="hidden dark:block"
      />
      {/* "½x" in the top and left bands. */}
      <text
        x={B.x + B.width / 2}
        y={ZONE.y + HALF / 2}
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-primary-ink text-[30px] font-bold"
      >
        {half}
      </text>
      <text
        x={ZONE.x + HALF / 2}
        y={B.y + B.height / 2}
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-primary-ink text-[30px] font-bold"
      >
        {half}
      </text>
      {/* "x": the mark's height, dimensioned on the left. */}
      <g className="stroke-muted-foreground" strokeWidth={2}>
        <line x1={dimX} x2={dimX} y1={B.y} y2={B.y + B.height} />
        <line x1={dimX - 12} x2={dimX + 12} y1={B.y} y2={B.y} />
        <line x1={dimX - 12} x2={dimX + 12} y1={B.y + B.height} y2={B.y + B.height} />
        <line x1={dimX + 12} x2={B.x} y1={B.y} y2={B.y} strokeDasharray="4 6" />
        <line x1={dimX + 12} x2={B.x} y1={B.y + B.height} y2={B.y + B.height} strokeDasharray="4 6" />
      </g>
      <text
        x={dimX - 22}
        y={B.y + B.height / 2}
        textAnchor="end"
        dominantBaseline="central"
        className="fill-muted-foreground text-[34px] font-bold italic"
      >
        {x}
      </text>
    </svg>
  );
}

const PHOTO = photos["builders-at-work-table"];

// Each "don't" is drawn from the real file with a CSS transform or filter;
// the files themselves are never altered.
const donts: { id: BrandDontId; className?: string }[] = [
  { id: "stretch", className: "!w-[62%] scale-x-[1.3] scale-y-[0.7]" },
  { id: "recolour", className: "[filter:hue-rotate(170deg)_saturate(1.4)]" },
  {
    id: "effects",
    className:
      "[filter:drop-shadow(3px_5px_0_rgb(0_0_0/0.35))_drop-shadow(0_0_10px_rgb(248_141_16/0.9))]",
  },
  { id: "busy" },
];

function DontTile({ id, className, label }: { id: BrandDontId; className?: string; label: string }) {
  return (
    <li className="overflow-hidden rounded-2xl border bg-card">
      <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-background">
        {id === "busy" && (
          <Image
            src={PHOTO.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 270px, 50vw"
            placeholder="blur"
            className="object-cover"
          />
        )}
        <Image
          src={svgPath("horizontal-color-on-light")}
          alt=""
          width={LOGO.width}
          height={LOGO.height}
          className={cn("relative h-auto w-[80%]", className, id !== "busy" && "dark:hidden")}
        />
        {id !== "busy" && (
          <Image
            src={svgPath("horizontal-color-on-dark")}
            alt=""
            width={LOGO.width}
            height={LOGO.height}
            className={cn("relative hidden h-auto w-[80%] dark:block", className)}
          />
        )}
      </div>
      <p className="flex items-start gap-2 p-4 text-sm font-semibold text-foreground">
        <span
          aria-hidden="true"
          className="mt-px inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-destructive text-destructive-foreground"
        >
          <XIcon className="size-3.5" strokeWidth={3} />
        </span>
        {label}
      </p>
    </li>
  );
}

/** Clear space and minimum sizes drawn on the real logo, then the "don'ts". */
function BrandRules({ t }: Props) {
  return (
    <section id="rules" aria-labelledby="brand-rules">
      <SectionHeading id="brand-rules" eyebrow={t.eyebrow} title={t.title} intro={t.intro} />

      <div className="mt-10 grid gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <figure className="rounded-2xl border bg-card p-5 sm:p-6">
          <ClearSpaceDiagram x={t.clear_space.x} half={t.clear_space.half} />
          <figcaption className="mt-5">
            <h3 className="text-lg">{t.clear_space.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{t.clear_space.text}</p>
          </figcaption>
        </figure>

        <figure className="flex flex-col rounded-2xl border bg-card p-5 sm:p-6">
          <ul className="flex flex-1 flex-col justify-center gap-6">
            <li className="flex items-center gap-4">
              <ThemedCroppedLogo
                light="mark-color"
                dark="mark-color"
                box={MARK_BOX}
                height={20}
              />
              <span className="text-sm font-semibold text-foreground">{t.min_size.mark}</span>
            </li>
            <li className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <ThemedCroppedLogo
                light="horizontal-color-on-light"
                dark="horizontal-color-on-dark"
                box={HORIZONTAL_BOX}
                width={120}
              />
              <span className="text-sm font-semibold text-foreground">
                {t.min_size.horizontal}
              </span>
            </li>
          </ul>
          <figcaption className="mt-6">
            <h3 className="text-lg">{t.min_size.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{t.min_size.text}</p>
          </figcaption>
        </figure>
      </div>

      <h3 className="mt-10 text-lg">{t.donts_title}</h3>
      <ul className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {donts.map((dont) => (
          <DontTile key={dont.id} {...dont} label={t.donts[dont.id]} />
        ))}
      </ul>
    </section>
  );
}

export default BrandRules;
