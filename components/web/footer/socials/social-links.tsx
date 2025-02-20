import React from "react";
import Image from "next/image";
import Link from "next/link";
import SOCIALS from "./socials";

function SocialLinks() {
  return (
    <div className="flex gap-2">
      {SOCIALS.map((social) => (
        <Link
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
        </Link>
      ))}
    </div>
  );
}

export default SocialLinks;
