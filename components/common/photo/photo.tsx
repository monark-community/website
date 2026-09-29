import React from "react";
import Image from "next/image";
import { Locale } from "@/i18n.config";
import { cn } from "@/lib/utils";
import { PhotoKey, photos } from "./photos";

type Props = {
  photo: PhotoKey;
  locale: Locale;
  /** next/image `sizes`: how wide the frame renders at each breakpoint. */
  sizes: string;
  /**
   * Frame classes. Always give an aspect ratio (e.g. `aspect-[16/10]`) so
   * the space is reserved before the image loads.
   */
  className?: string;
  /** Crop focus, e.g. `object-[40%_50%]`. */
  imgClassName?: string;
  /** Empty alt: the photo repeats what nearby text already says. */
  decorative?: boolean;
  priority?: boolean;
};

/**
 * A photograph in the 2026 style: the site's radius, a 1px warm border and
 * a muted fill while it loads. In dark mode the image is dimmed slightly so
 * bright walls and windows don't glare on espresso.
 */
function Photo({
  photo,
  locale,
  sizes,
  className,
  imgClassName,
  decorative = false,
  priority = false,
}: Props) {
  const entry = photos[photo];
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border bg-muted",
        className
      )}
    >
      <Image
        src={entry.src}
        alt={decorative ? "" : entry.alt[locale] ?? entry.alt.en}
        fill
        sizes={sizes}
        placeholder="blur"
        priority={priority}
        className={cn(
          "object-cover dark:brightness-[0.85] dark:saturate-[0.95]",
          imgClassName
        )}
      />
    </div>
  );
}

export default Photo;
