import React from "react";
import SOCIALS from "./socials";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

/**
 * Monark's social SVGs, recoloured to the text colour through a CSS mask so
 * they meet contrast on cream and espresso (the source files are orange).
 */
function SocialLinks({ className }: Props) {
  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {SOCIALS.map((social) => (
        <li key={social.id}>
          <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            title={social.name}
            className="inline-flex size-11 items-center justify-center rounded-full text-foreground transition-colors duration-150 hover:bg-secondary"
          >
            <span
              aria-hidden="true"
              className="size-6 bg-current"
              style={{
                maskImage: `url(/vectors/socials/${social.id}.svg)`,
                WebkitMaskImage: `url(/vectors/socials/${social.id}.svg)`,
                maskSize: "contain",
                WebkitMaskSize: "contain",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskPosition: "center",
              }}
            />
          </a>
        </li>
      ))}
    </ul>
  );
}

export default SocialLinks;
