import React from "react";
import { ArrowRightIcon } from "lucide-react";
import { NavLink } from "@/components/common/navlink/navlink";
import SectionHeading from "@/components/pages/about/sections/section-heading";
import { ParticipateContent } from "../participate.types";
import ParticipateButton from "./participate-link";

type Props = {
  t: ParticipateContent["proof"];
  newTab: string;
};

/** Evidence block: linked cards (projects, a news story) and a "see all" link. */
function ParticipateProof({ t, newTab }: Props) {
  const cols = t.items.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2";
  return (
    <section aria-labelledby="participate-proof">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading id="participate-proof" eyebrow={t.eyebrow} title={t.title} intro={t.content} />
        <ParticipateButton
          link={t.link}
          newTab={newTab}
          variant="outline"
          size="default"
          className="w-full shrink-0 sm:w-auto"
        />
      </div>
      <ul className={`mt-10 grid grid-cols-1 gap-4 ${cols}`}>
        {t.items.map((item) => (
          <li key={item.title}>
            <NavLink
              href={item.href}
              className="group flex h-full flex-col rounded-3xl border bg-card p-6 transition-colors duration-150 hover:border-primary"
            >
              <span className="text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground">
                {item.label}
              </span>
              <span className="mt-3 text-xl font-bold leading-snug text-foreground">
                {item.title}
              </span>
              <span className="mt-2 text-sm text-muted-foreground">{item.content}</span>
              <span aria-hidden="true" className="mt-auto pt-5">
                <ArrowRightIcon className="size-5 text-primary-ink transition-transform duration-150 group-hover:translate-x-1" />
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ParticipateProof;
