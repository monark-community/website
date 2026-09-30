import { Card } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import { Member } from "../members-section/members.i18n";

type Props = { member: Member };

function MemberCard({ member }: Props) {
  return (
    <Card key={member.name} className="flex h-full flex-col p-6">
      <Image
        src={member.image}
        alt={member.name}
        width={160}
        height={160}
        className="size-32 rounded-full border object-cover"
      />
      <h3 className="mb-1 mt-5 text-xl">{member.name}</h3>
      <p className="text-sm font-semibold text-primary-ink">{member.role}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {member.description}
      </p>
      {member.linkedin && (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={member.linkedin}
          aria-label={`LinkedIn · ${member.name}`}
          title="LinkedIn"
          className="-ml-2.5 mt-4 inline-flex size-11 items-center justify-center rounded-full text-foreground transition-colors duration-150 hover:bg-secondary"
        >
          <span
            aria-hidden="true"
            className="size-6 bg-current"
            style={{
              maskImage: "url(/vectors/socials/linkedin.svg)",
              WebkitMaskImage: "url(/vectors/socials/linkedin.svg)",
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: "center",
              WebkitMaskPosition: "center",
            }}
          />
        </a>
      )}
    </Card>
  );
}

export default MemberCard;
