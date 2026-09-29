import React from "react";
import { Locale } from "@/i18n.config";
import * as i18n from "./why-section.i18n";
import { BrandedCard } from "@/components/ui/card";
import { ArrowRightIcon } from "lucide-react";
import { NavLink } from "@/components/common/navlink/navlink";
import NavbarIcon from "@/components/common/layout/navbar/navbar-icon";
import GithubOrgMembers from "./github-org-members/GithubOrgMembers";

type Props = {
  locale: Locale;
};

function WhySection({ locale }: Props) {
  const t = i18n[locale].why;
  return (
    <section className="why-section border-y bg-secondary/50">
      <div className="site-container section text-center">
        <span className="eyebrow">{t.flavor}</span>
        <h2 className="mx-auto max-w-[40rem]">{t.title}</h2>
        <GithubOrgMembers all />
        <ul className="grid grid-cols-1 gap-4 text-left sm:grid-cols-2 lg:grid-cols-4">
          {t.audiences.map((audience) => (
            <li key={audience.id}>
              <Audience audience={audience} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

type AudienceProps = {
  audience: i18n.WhyAudience;
};

/**
 * Whole card is one link (the title's ::after covers the card); hover and
 * focus come from the shared `card-hover` primitive (app/globals.scss).
 */
function Audience({ audience }: AudienceProps) {
  return (
    <BrandedCard className="card-hover flex h-full flex-col p-6">
      <NavbarIcon
        icon={audience.icon}
        className="self-start text-primary"
        size={32}
        strokeWidth={1.75}
      />
      <h3 className="mt-5 text-xl">
        <NavLink
          href={audience.href}
          className="card-hover-link text-foreground"
        >
          {audience.title}
        </NavLink>
      </h3>
      <p className="mt-2 flex-1 text-muted-foreground">{audience.content}</p>
      <ArrowRightIcon
        aria-hidden="true"
        className="mt-6 size-5 text-primary-ink"
      />
    </BrandedCard>
  );
}

export default WhySection;
