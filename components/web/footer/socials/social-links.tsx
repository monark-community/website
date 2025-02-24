import React from "react";
import Image from "next/image";
import { NavLink } from "@/components/shared/navlink/navlink";
import SOCIALS from "./socials";

type Props = {
  className?: string;
};

function SocialLinks({className}: Props) {
  return (
    <div className={`flex gap-2 ${className}`}>
      {SOCIALS.map((social) => (
        <NavLink
          key={social.id}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={`/vectors/socials/${social.id}.svg`}
            alt={social.name}
            width={48}
            height={48}
          />
        </NavLink>
      ))}
    </div>
  );
}

export default SocialLinks;
