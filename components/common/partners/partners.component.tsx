import React from "react";
import Image from "next/image";
import PARTNERS from "@/data/partners";
import { cn } from "@/lib/utils";

type Props = { className?: string };

function Partners({ className }: Props) {
  return (
    <ul className="flex flex-wrap items-center gap-8">
      {[...PARTNERS]
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((partner) => (
          <li key={`partner_${partner.id}`}>
            <a
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-fit rounded-md opacity-80 transition-opacity duration-150 hover:opacity-100"
            >
              {/* Partner files are white; invert them on the light theme. */}
              <Image
                src={`/vectors/partners/${partner.id}.svg`}
                alt={partner.name}
                className={cn("h-7 w-auto invert dark:invert-0", className)}
                width={143}
                height={28}
              />
            </a>
          </li>
        ))}
    </ul>
  );
}

export default Partners;
