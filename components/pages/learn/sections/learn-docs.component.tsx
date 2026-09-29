import React from "react";
import { ArrowUpRightIcon } from "lucide-react";
import SocialIcon from "@/components/common/socials/social-icon";
import { I18n } from "../learn.i18n";
import { LearnIcon } from "../learn-icon";

type Props = { t: I18n["learn_page"]["docs"] };

/**
 * The Monark docs (the Notion hub linked from the top navigation) on an
 * inverted panel, with the GitHub organisation as the second destination.
 * bg-foreground / text-background follow the theme on their own; orange is
 * decorative only here, since orange text fails on the cream variant.
 */
function LearnDocs({ t }: Props) {
  return (
    <section
      id="docs"
      aria-labelledby="learn-docs"
      className="flex h-full flex-col rounded-3xl bg-foreground p-6 text-background sm:p-8 md:p-10"
    >
      <p className="m-0 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.08em] text-background/75">
        <LearnIcon name="book-open" className="size-5 text-primary" />
        {t.eyebrow}
      </p>
      <h2 id="learn-docs" className="mt-4">
        {t.title}
      </h2>
      <p className="mt-3 max-w-[36rem] text-background/80">{t.content}</p>
      <ul className="m-0 mt-6 list-none space-y-3 p-0">
        {t.points.map((point) => (
          <li key={point} className="m-0 flex gap-3">
            <LearnIcon
              name="check"
              className="mt-1 size-4 shrink-0 text-primary"
              strokeWidth={2.5}
            />
            <span>{point}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto grid grid-cols-1 gap-3 pt-8 sm:grid-cols-2">
        <DocsLink link={t.primary} primary />
        <DocsLink link={t.secondary} icon="github" />
      </div>
    </section>
  );
}

function DocsLink({
  link,
  primary = false,
  icon,
}: {
  link: I18n["learn_page"]["docs"]["primary"];
  primary?: boolean;
  icon?: string;
}) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex items-center justify-between gap-3 rounded-2xl p-4 no-underline transition-colors duration-150 ${
        primary
          ? "bg-primary text-primary-foreground hover:bg-primary/85"
          : "border border-background/20 text-background hover:bg-background/10"
      }`}
    >
      <span className="flex min-w-0 items-center gap-3">
        {icon && <SocialIcon id={icon} className="size-5" />}
        <span className="min-w-0">
          <span className="block font-bold">{link.label}</span>
          <span
            className={`block text-sm ${primary ? "text-primary-foreground" : "text-background/75"}`}
          >
            {link.note}
          </span>
        </span>
      </span>
      <ArrowUpRightIcon
        aria-hidden="true"
        className="size-5 shrink-0 transition-transform duration-150 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
      />
    </a>
  );
}

export default LearnDocs;
