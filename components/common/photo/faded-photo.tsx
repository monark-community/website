import React from "react";
import Image from "next/image";
import { Locale } from "@/i18n.config";
import { cn } from "@/lib/utils";
import { PhotoKey, photos } from "./photos";

type Props = {
  photo: PhotoKey;
  locale: Locale;
  /** next/image `sizes`: how wide the area renders at each breakpoint. */
  sizes: string;
  /** Position and size of the area (it is filled edge to edge). */
  className?: string;
  priority?: boolean;
};

/**
 * A photo that is part of a hero rather than a framed card: no border or
 * radius. From md an alpha mask (`.photo-fade`) fades its left edge in
 * from whatever surface is behind it; the other edges stay hard. The crop
 * follows the photo's focal point from the
 * registry. In dark mode it is dimmed a touch so it sits on espresso
 * without glare, but not so much that it turns muddy.
 */
function FadedPhoto({ photo, locale, sizes, className, priority = false }: Props) {
  const entry = photos[photo];
  return (
    <div className={cn("photo-fade relative overflow-hidden", className)}>
      <Image
        src={entry.src}
        alt={entry.alt[locale] ?? entry.alt.en}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover dark:brightness-[0.92]"
        style={{ objectPosition: entry.focus ?? "50% 50%" }}
      />
    </div>
  );
}

export default FadedPhoto;
