import React from "react";
import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/common/navlink/navlink";
import { I18n } from "../about.i18n";

type Props = { t: I18n["about_page"]["cta"] };

/** Closing call to action: the projects list, then the four participate paths. */
function AboutCta({ t }: Props) {
  return (
    <section
      aria-labelledby="about-cta"
      className="relative overflow-hidden rounded-3xl border bg-secondary/60 p-6 sm:p-8 md:p-10"
    >
      {/* Monark line art (flat strokes). */}
      <Image
        src="/vectors/decorative/governance.svg"
        alt=""
        aria-hidden="true"
        width={120}
        height={120}
        className="pointer-events-none absolute right-8 top-8 hidden h-28 w-auto select-none md:block"
      />
      <div className="max-w-[34rem]">
        <h2 id="about-cta">{t.title}</h2>
        <p className="mt-3 text-muted-foreground">{t.content}</p>
        <Button asChild size="lg" className="mt-6 w-full sm:w-auto">
          <NavLink href={t.primary.href}>
            {t.primary.label}
            <ArrowRightIcon aria-hidden="true" />
          </NavLink>
        </Button>
      </div>
      <p
        id="about-cta-roles"
        className="mt-8 text-sm font-semibold text-foreground"
      >
        {t.roles_label}
      </p>
      <ul aria-labelledby="about-cta-roles" className="mt-3 flex flex-wrap gap-2">
        {t.roles.map((role) => (
          <li key={role.href}>
            <Button asChild variant="outline" size="sm" className="bg-card">
              <NavLink href={role.href}>{role.label}</NavLink>
            </Button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default AboutCta;
