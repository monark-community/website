import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import { Member } from "../members-section/members.i18n";

type Props = { member: Member };

function MemberCard({ member }: Props) {
  return (
    <Card key={member.name}>
      <CardContent className="text-sm h-full flex flex-col justify-between">
        <div>
          <div className="mt-6 mb-2">
            <Image
              src={member.image}
              alt={member.name}
              width={300}
              height={300}
              className="rounded-full border-4 border-primary mx-auto w-full h-auto sm:w-54 sm:h-54"
            />
          </div>
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-lg font-semibold">{member.name}</CardTitle>
            <CardDescription>{member.role}</CardDescription>
          </CardHeader>
          <p className="text-left">{member.description}</p>
        </div>
        <div className="flex justify-center gap-4 mt-2">
          {member.linkedin && (
            <a target="_blank" href={member.linkedin}>
              <Image
                alt="LinkedIn"
                loading="lazy"
                width="32"
                height="32"
                src="/vectors/socials/linkedin.svg"
              />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default MemberCard;
