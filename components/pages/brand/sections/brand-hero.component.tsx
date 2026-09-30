import React from "react";
import Image from "next/image";
import { DownloadIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { I18n, BrandSectionId } from "../brand.i18n";
import { KIT_FILE, ORANGE, svgPath } from "../brand-assets";
import { PREVIEW_BG } from "../brand-ui";

type Props = {
  t: I18n["brand_page"]["hero"];
  /** "ZIP, 1.6 MB", computed from the file at build time. */
  kitSize: string | null;
};

const sections: BrandSectionId[] = ["logos", "rules", "colour", "type", "products", "voice"];

// The kit's "cover": the mark on cream above the core colours.
const coverColours = [ORANGE, PREVIEW_BG.espresso, "#B65000", "#EF3620"];

/**
 * Title, one line, the kit download, and the page's sections as anchor
 * chips. On the right, a cover for the kit: the mark and the palette.
 */
function BrandHero({ t, kitSize }: Props) {
  return (
    <section
      aria-labelledby="brand-title"
      className="grid gap-10 md:grid-cols-[minmax(0,1fr)_18rem] md:items-center lg:grid-cols-[minmax(0,1fr)_22rem]"
    >
      <div className="min-w-0">
        <h1 id="brand-title" className="max-w-[40rem]">
          {t.title}
        </h1>
        <p className="lead mt-5 max-w-[36rem]">{t.lead}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
          {/* A plain anchor styled as a button: `download` needs a real <a>. */}
          <a
            href={KIT_FILE}
            download="monark-brand-kit.zip"
            className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
          >
            <DownloadIcon aria-hidden="true" />
            {t.kit}
          </a>
          <p className="text-sm text-muted-foreground">
            {kitSize && <span className="font-semibold text-foreground">{kitSize}</span>}
            {kitSize && " · "}
            {t.kit_contents}
          </p>
        </div>
        <nav aria-label={t.nav_label} className="mt-10">
          <ul className="flex flex-wrap gap-2">
            {sections.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="inline-flex min-h-11 items-center rounded-full border bg-card px-4 text-sm font-semibold text-foreground transition-colors duration-150 ease-out hover:border-primary md:min-h-9"
                >
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div
        aria-hidden="true"
        className="relative hidden overflow-hidden rounded-3xl border sm:block"
      >
        <div
          className="flex aspect-[4/3] items-center justify-center"
          style={{ backgroundColor: PREVIEW_BG.cream }}
        >
          <Image
            src={svgPath("mark-color")}
            alt=""
            width={305}
            height={304}
            priority
            className="h-auto w-[62%]"
          />
        </div>
        <div className="flex h-14">
          {coverColours.map((colour) => (
            <span key={colour} className="flex-1" style={{ backgroundColor: colour }} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BrandHero;
