import React from "react";
import MemberCard from "../member-card/member-card.component";
import { Locale } from "@/i18n.config";
import * as i18n from "./members.i18n";

type Props = { locale: Locale };

function MembersSection({ locale }: Props) {
  const t = i18n[locale].team;
  return (
    <section className="pt-4 pb-12">
      <h2 className="text-3xl font-bold mb-8">🤝 {t.team_title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {t.members.map((member) => (
          <MemberCard key={member.name} member={member} />
        ))}
      </div>
    </section>
  );
}

export default MembersSection;
