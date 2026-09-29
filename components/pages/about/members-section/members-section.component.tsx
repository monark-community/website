import React from "react";
import MemberCard from "../member-card/member-card.component";
import { Locale } from "@/i18n.config";
import * as i18n from "./members.i18n";

type Props = { locale: Locale; exclude?: string[] };

// The rest of the team, after the author shown beside the About text.
// Renders nothing when nobody is left.
function MembersSection({ locale, exclude = [] }: Props) {
  const t = i18n[locale].team;
  const members = t.members.filter((member) => !exclude.includes(member.name));
  if (members.length === 0) return null;
  return (
    <section className="pt-8 pb-8">
      <h2 className="mb-8">{t.team_title}</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <MemberCard key={member.name} member={member} />
        ))}
      </div>
    </section>
  );
}

export default MembersSection;
