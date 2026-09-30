import React from "react";
import { DownloadIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ARTWORK_BOX,
  LOGO_FILES,
  LogoId,
  PNG_WIDTHS,
  pngPath,
  svgPath,
} from "./brand-assets";

/** Fixed backgrounds for logo previews: they never follow the site theme. */
export const PREVIEW_BG = {
  cream: "#FFF9F3",
  espresso: "#1A0B02",
  orange: "#F88D10",
} as const;

type Box = { x: number; y: number; width: number; height: number };

/**
 * A logo file shown cropped to its drawing (the SVG files carry padding).
 * The file itself is untouched: an outer <svg> viewBox frames it. Size it
 * with `height` or `width` (in px); the other side follows the drawing.
 */
export function CroppedLogo({
  id,
  box,
  height,
  width,
  className,
  label,
}: {
  id: LogoId;
  box: Box;
  height?: number;
  width?: number;
  className?: string;
  /** Accessible name; decorative when omitted. */
  label?: string;
}) {
  const file = LOGO_FILES[id];
  const ratio = box.width / box.height;
  const h = height ?? (width ? width / ratio : box.height);
  const w = width ?? h * ratio;
  return (
    <svg
      viewBox={`${box.x} ${box.y} ${box.width} ${box.height}`}
      width={+w.toFixed(2)}
      height={+h.toFixed(2)}
      className={cn("shrink-0", className)}
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
    >
      <image href={svgPath(id)} x={0} y={0} width={file.width} height={file.height} />
    </svg>
  );
}

/**
 * The same logo in its light- and dark-theme files, swapped with the site
 * theme (the light file carries dark lettering, and the reverse).
 */
export function ThemedCroppedLogo({
  light,
  dark,
  ...props
}: { light: LogoId; dark: LogoId } & Omit<
  React.ComponentProps<typeof CroppedLogo>,
  "id"
>) {
  return (
    <>
      <CroppedLogo id={light} {...props} className={cn(props.className, "dark:hidden")} />
      <CroppedLogo
        id={dark}
        {...props}
        label={undefined}
        className={cn(props.className, "hidden dark:block")}
      />
    </>
  );
}

export const MARK_BOX = ARTWORK_BOX.mark;
export const HORIZONTAL_BOX = ARTWORK_BOX.horizontal;
/** The MONARK lettering inside the horizontal logo. */
export const WORDMARK_BOX = { x: 226, y: 66, width: 468, height: 88 };

const pill =
  "inline-flex min-h-11 md:min-h-9 items-center gap-1.5 rounded-full border border-input px-3 text-xs font-semibold text-foreground transition-colors duration-150 ease-out hover:bg-secondary";

/**
 * SVG and PNG (512, 1024, 2048px wide) downloads for one logo file, as
 * plain `<a download>` links to the files in public/brand/.
 */
export function DownloadLinks({
  id,
  label,
  download,
  className,
}: {
  id: LogoId;
  /** What the file is, for the links' accessible names. */
  label: string;
  download: string;
  className?: string;
}) {
  const name = LOGO_FILES[id].name;
  return (
    <ul className={cn("flex flex-wrap items-center gap-1.5", className)}>
      <li>
        <a href={svgPath(id)} download={`${name}.svg`} className={pill}>
          <DownloadIcon aria-hidden="true" className="size-3.5" />
          <span className="sr-only">
            {download} {label},{" "}
          </span>
          SVG
        </a>
      </li>
      {/* PNG sizes share one visible "PNG" label to keep the row on one line on phones. */}
      <li aria-hidden="true" className="ml-1.5 text-xs font-bold text-muted-foreground">
        PNG
      </li>
      {PNG_WIDTHS.map((width) => (
        <li key={width}>
          <a
            href={pngPath(id, width)}
            download={`${name}-${width}.png`}
            className={cn(pill, "px-2.5")}
          >
            <span className="sr-only">
              {download} {label}, PNG{" "}
            </span>
            {width}
            <span className="sr-only"> px</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
