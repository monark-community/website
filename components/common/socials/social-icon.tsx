import React from "react";
import { cn } from "@/lib/utils";

/**
 * One of Monark's social SVGs (public/vectors/socials/<id>.svg), drawn in the
 * current text colour through a CSS mask: the source files are orange and
 * fail contrast as icons. Decorative: always aria-hidden.
 */
function SocialIcon({ id, className }: { id: string; className?: string }) {
  const url = `url(/vectors/socials/${id}.svg)`;
  return (
    <span
      aria-hidden="true"
      className={cn("inline-block size-5 shrink-0 bg-current", className)}
      style={{
        maskImage: url,
        WebkitMaskImage: url,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}

export default SocialIcon;
