import React from "react";
import { Locale } from "@/i18n.config";
import * as i18n from "./why-section.i18n";
import { BrandedCard } from "@/components/ui/card";
import { ArrowRightIcon } from "lucide-react";
import { NavLink } from "@/components/common/navlink/navlink";
import GithubOrgMembers from "./github-org-members/GithubOrgMembers";
import Photo from "@/components/common/photo/photo";
import { rolePhoto } from "@/components/pages/participate/participate-shared.i18n";
import { ParticipateSlug } from "@/components/pages/participate/participate.types";

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
              <Audience audience={audience} locale={locale} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

type AudienceProps = {
  audience: i18n.WhyAudience;
  locale: Locale;
};

/**
 * Whole card is one link (the title's ::after covers the card); hover and
 * focus come from the shared `card-hover` primitive (app/globals.scss). The
 * photo is the same one the role's participate page opens with; its alt is
 * empty because the title right below names the audience.
 */
function Audience({ audience, locale }: AudienceProps) {
  const photo = rolePhoto(audience.id as ParticipateSlug);
  return (
    <BrandedCard className="card-hover flex h-full flex-col p-2">
      {photo && (
        <Photo
          photo={photo.photo}
          locale={locale}
          decorative
          sizes="(min-width: 1024px) 18rem, (min-width: 640px) 50vw, 100vw"
          className="card-hover-media aspect-[16/10] rounded-xl border-0"
          imgClassName={photo.focus}
        />
      )}
      <div className="flex flex-1 flex-col px-4 pb-4">
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
      </div>
    </BrandedCard>
  );
}

export default WhySection;
