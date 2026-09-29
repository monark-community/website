import React from "react";
import { ArrowUpRightIcon } from "lucide-react";
import SOCIALS from "@/components/common/socials/socials";
import SocialIcon from "@/components/common/socials/social-icon";
import { I18n } from "../learn.i18n";

type Props = { t: I18n["learn_page"]["community"] };

/** Community channels (Discord, YouTube), with URLs from socials.ts. */
function LearnCommunity({ t }: Props) {
  return (
    <section
      id="community"
      aria-labelledby="learn-community"
      className="flex h-full flex-col"
    >
      <p className="eyebrow">{t.eyebrow}</p>
      <h2 id="learn-community">{t.title}</h2>
      <p className="mt-3 text-muted-foreground">{t.intro}</p>
      <ul className="m-0 mt-6 flex flex-1 list-none flex-col gap-4 p-0">
        {t.channels.map((channel) => {
          const social = SOCIALS.find((s) => s.id === channel.id);
          if (!social) return null;
          return (
            <li key={channel.id} className="m-0 flex-1">
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full gap-4 rounded-2xl border bg-card p-5 no-underline transition-colors duration-150 hover:border-primary/60"
              >
                <span
                  aria-hidden="true"
                  className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-foreground"
                >
                  <SocialIcon id={channel.id} className="size-6" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-lg font-bold text-foreground">
                    {channel.title}
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {channel.content}
                  </span>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-primary-ink underline-offset-4 group-hover:underline">
                    {channel.label}
                    <ArrowUpRightIcon aria-hidden="true" className="size-4" />
                  </span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default LearnCommunity;
