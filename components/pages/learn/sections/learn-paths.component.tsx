import React from "react";
import Image from "next/image";
import { ArrowRightIcon, BookOpenTextIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NavLink } from "@/components/common/navlink/navlink";
import SectionHeading from "@/components/pages/about/sections/section-heading";
import { DatedNewsMetadata } from "@/types/news.types";
import { I18n } from "../learn.i18n";
import { IconTone, LearnIconChip } from "../learn-icon";

type Props = {
  t: I18n["learn_page"]["paths"];
  /** Starter articles, resolved from the news data by id. */
  starters: Record<string, DatedNewsMetadata | undefined>;
};

const tones: IconTone[] = ["primary", "chart-2", "chart-3"];

/**
 * Learning paths by audience (students, developers, industry): a photo that
 * shows the path, one line, a first article to read, and the participate
 * page.
 */
function LearnPaths({ t, starters }: Props) {
  return (
    <section id="paths" aria-labelledby="learn-paths">
      <SectionHeading id="learn-paths" eyebrow={t.eyebrow} title={t.title} />
      <ul className="m-0 mt-10 grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-3">
        {t.items.map((path, index) => {
          const starter = starters[path.starter_id];
          return (
            <li
              key={path.id}
              className="m-0 flex flex-col overflow-hidden rounded-3xl border bg-card"
            >
              <div className="relative aspect-[3/2] bg-muted">
                <Image
                  src={path.photo.src}
                  alt={path.photo.alt}
                  fill
                  sizes="(min-width: 1200px) 370px, (min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: path.photo.position }}
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3">
                  <LearnIconChip
                    name={path.icon}
                    tone={tones[index % tones.length]}
                  />
                  <p className="m-0 text-sm font-bold uppercase tracking-[0.08em] text-muted-foreground">
                    {path.audience}
                  </p>
                </div>
                <h3 className="mt-4 text-xl">{path.title}</h3>
                <p className="mt-2 text-muted-foreground">{path.content}</p>

                <div className="mt-auto pt-6">
                  {starter && (
                    <NavLink
                      href={`/learn/news/${starter.id}`}
                      className="group mb-4 flex gap-3 rounded-2xl bg-secondary/70 p-3.5 no-underline transition-colors duration-150 hover:bg-secondary"
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
                  <NavLink
                    href={path.link.href}
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "h-auto min-h-10 w-full whitespace-normal bg-card py-2 text-center"
                    )}
                  >
                    {path.link.label}
                    <ArrowRightIcon aria-hidden="true" />
                  </NavLink>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default LearnPaths;
