import React from "react";
import { ArrowRightIcon, BookOpenTextIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/common/navlink/navlink";
import SectionHeading from "@/components/pages/about/sections/section-heading";
import { DatedNewsMetadata } from "@/types/news.types";
import { I18n } from "../learn.i18n";
import { IconTone, LearnIcon, LearnIconChip } from "../learn-icon";

type Props = {
  t: I18n["learn_page"]["paths"];
  /** Titles of the starter articles, resolved from the news data by id. */
  starters: Record<string, DatedNewsMetadata | undefined>;
};

const tones: IconTone[] = ["primary", "chart-2", "chart-3"];

/**
 * Learning paths by audience (students, developers, industry): what each
 * one offers, from the participate pages, a first article to read, and the
 * participate page itself.
 */
function LearnPaths({ t, starters }: Props) {
  return (
    <section id="paths" aria-labelledby="learn-paths">
      <SectionHeading
        id="learn-paths"
        eyebrow={t.eyebrow}
        title={t.title}
        intro={t.intro}
      />
      <ul className="m-0 mt-10 grid list-none grid-cols-1 gap-5 p-0 lg:grid-cols-3">
        {t.items.map((path, index) => {
          const starter = starters[path.starter_id];
          return (
            <li
              key={path.id}
              className="m-0 flex flex-col rounded-3xl border bg-card p-6 md:p-7"
            >
              <div className="flex items-center gap-3">
                <LearnIconChip
                  name={path.icon}
                  tone={tones[index % tones.length]}
                />
                <p className="m-0 text-sm font-bold uppercase tracking-[0.08em] text-muted-foreground">
                  {path.audience}
                </p>
              </div>
              <h3 className="mt-5 text-xl">{path.title}</h3>
              <p className="mt-2 text-muted-foreground">{path.content}</p>
              <ul className="m-0 mt-5 list-none space-y-2.5 p-0">
                {path.points.map((point) => (
                  <li key={point} className="m-0 flex gap-2.5 text-sm">
                    <LearnIcon
                      name="check"
                      className="mt-0.5 size-4 shrink-0 text-primary"
                      strokeWidth={2.5}
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-6">
                {starter && (
                  <NavLink
                    href={`/learn/news/${starter.id}`}
                    className="group mb-5 flex gap-3 rounded-2xl bg-secondary/70 p-3.5 no-underline transition-colors duration-150 hover:bg-secondary"
                  >
                    <BookOpenTextIcon
                      aria-hidden="true"
                      className="mt-0.5 size-4 shrink-0 text-primary-ink"
                    />
                    <span className="min-w-0 text-sm">
                      <span className="block text-xs font-bold uppercase tracking-[0.08em] text-primary-ink">
                        {t.starter_label}
                      </span>
                      <span className="mt-0.5 block font-semibold text-foreground underline-offset-4 group-hover:underline">
                        {starter.title}
                      </span>
                    </span>
                  </NavLink>
                )}
                <Button
                  asChild
                  variant="outline"
                  className="h-auto min-h-10 w-full whitespace-normal bg-card py-2 text-center"
                >
                  <NavLink href={path.link.href}>
                    {path.link.label}
                    <ArrowRightIcon aria-hidden="true" />
                  </NavLink>
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default LearnPaths;
