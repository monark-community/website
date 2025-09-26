import React from "react";
// import PARTNERS from "@/data/partners";
// import Slideshow from "@/components/common/slideshow/slideshow.component";
import Image from "next/image";

type Props = { className?: string };

function Partners({ className }: Props) {
  return (
    <a href="https://pinax.network" target="_blank" className="block w-fit">
      <Image
        src="/vectors/partners/pinax-network.svg"
        alt="Pinax Network"
        className={`mt-4 ${className}`}
        width={200}
        height={39}
      />
    </a>
    // <Slideshow
    //   className={className}
    //   items={PARTNERS.map((partner) => {
    //     return {
    //       name: partner.name,
    //       img: `/vectors/partners/${partner.id}.svg`,
    //       href: `/partners/${partner.id}`,
    //     };
    //   })}
    //   itemsSize={{ width: 200, height: 64 }}
    // />
  );
}

export default Partners;
