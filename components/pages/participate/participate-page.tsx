import React from "react";
import { Metadata } from "next";
import { Locale } from "@/i18n.config";
import * as developer from "./developer.i18n";
import * as ambassador from "./ambassador.i18n";
import * as industry from "./industry.i18n";
import * as university from "./university.i18n";
import * as shared from "./participate-shared.i18n";
import { ParticipateContent, ParticipateSlug } from "./participate.types";
import ParticipateHero from "./sections/participate-hero.component";
import ParticipateOffer from "./sections/participate-offer.component";
import ParticipateSteps from "./sections/participate-steps.component";
import ParticipateFit from "./sections/participate-fit.component";
import ParticipateProof from "./sections/participate-proof.component";
import ParticipateFaq from "./sections/participate-faq.component";
import ParticipateCta from "./sections/participate-cta.component";
import ParticipateOthers from "./sections/participate-others.component";

const content: Record<ParticipateSlug, Record<Locale, ParticipateContent>> = {
  developer,
  ambassador,
  industry,
  university,
};

function getContent(slug: ParticipateSlug, locale: Locale) {
  return content[slug][locale] ?? content[slug].en;
}

/** Title, description and Open Graph tags from the page's i18n file. */
export function participateMetadata(slug: ParticipateSlug, locale: Locale): Metadata {
  const { meta } = getContent(slug, locale);
  const title = `${meta.title} • Monark`;
  // The site's shared Open Graph image (there are no per-page ones).
  const images = [`/${locale}/images/og/og-homepage-monark-decentralization.jpg`];
  return {
    title,
    description: meta.description,
    openGraph: { title, description: meta.description, images },
    twitter: {
      card: "summary_large_image",
      title,
      description: meta.description,
      images,
    },
  };
}

type Props = { slug: ParticipateSlug; locale: Locale };

/**
 * One layout for the four participate pages, so they read as a family:
 * hero, what you get, how it works, who fits, proof, FAQ, call to action,
 * then links to the three other ways to participate. Each page brings its
 * own copy, icon, accent and photo.
 */
function ParticipatePage({ slug, locale }: Props) {
  const t = getContent(slug, locale);
  const s = (shared[locale] ?? shared.en).participate_shared;
  const { icon, accent } = shared.roleAppearance(slug);

  return (
    <div className="site-container pb-8 pt-10 md:pt-14">
      <ParticipateHero
        t={t.hero}
        primary={t.cta.primary}
        howLabel={s.how_link}
        newTab={s.new_tab}
        accent={accent}
        photo={shared.rolePhoto(slug)}
        locale={locale}
      />
      <div className="mt-16 space-y-16 md:mt-24 md:space-y-24">
        <ParticipateOffer t={t.offer} accent={accent} newTab={s.new_tab} />
        <ParticipateSteps t={t.steps} accent={accent} />
        <ParticipateFit t={t.fit} accent={accent} />
        <ParticipateProof t={t.proof} newTab={s.new_tab} />
        {t.faq && <ParticipateFaq t={t.faq} />}
        <ParticipateCta t={t.cta} newTab={s.new_tab} icon={icon} accent={accent} />
        <ParticipateOthers t={s.others} current={slug} />
      </div>
    </div>
  );
}

export default ParticipatePage;
