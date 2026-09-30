import Image from "next/image";
import React from "react";
import { Member } from "../members-section/members.i18n";

type Props = { member: Member; label: string };

// The About page's author: the person who speaks for Monark in its text.
// Laid out like a byline card: on large screens it sits in the left column
// and stays in view (sticky) while the text scrolls; on small screens it is
// a compact block above the text.
function AuthorCard({ member, label }: Props) {
  return (
    <aside
      aria-label={`${label} ${member.name}`}
      className="rounded-2xl border bg-card p-5 lg:p-6"
    >
      <p className="text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground">
        {label}
      </p>
      <div className="mt-4 flex items-center gap-4 lg:flex-col lg:items-start">
        <Image
          src={member.image}
          alt=""
          width={160}
          height={160}
          className="size-16 shrink-0 rounded-full border object-cover lg:size-24"
        />
        <div className="min-w-0">
          <p className="text-lg font-bold leading-tight text-foreground">
            {member.name}
          </p>
          <p className="mt-1 text-sm font-semibold text-primary-ink">
            {member.role} · Monark
          </p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {member.description}
      </p>
      {member.linkedin && (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={member.linkedin}
          aria-label={`LinkedIn · ${member.name}`}
          title="LinkedIn"
          className="-ml-2.5 mt-3 inline-flex size-11 items-center justify-center rounded-full text-foreground transition-colors duration-150 hover:bg-secondary"
        >
          <span
            aria-hidden="true"
            className="size-6 bg-current"
            style={{
              maskImage: "url(/vectors/socials/linkedin.svg)",
              WebkitMaskImage: "url(/vectors/socials/linkedin.svg)",
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: "center",
              WebkitMaskPosition: "center",
            }}
          />
        </a>
      )}
    </aside>
  );
}

export default AuthorCard;
