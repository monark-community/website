import React from "react";
import Image from "next/image";
import PARTNERS from "@/data/partners";

type Props = { className?: string };

function Partners({ className }: Props) {
  return (
    <div className="flex gap-8 flex-wrap">
      {PARTNERS.sort((a, b) => a.name.localeCompare(b.name)).map((partner) => {
        return (<a href={partner.url} target="_blank" className="block w-fit" key={`partner_${partner.id}`}>
          <Image
            src={`/vectors/partners/${partner.id}.svg`}
            alt={partner.name}
            className={`mt-4 ${className}`}
            width={200}
            height={42}
          />
        </a>
        )
      })}
    </div>
  );
}

export default Partners;
