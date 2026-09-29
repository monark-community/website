import React from "react";
import { ArrowRightIcon } from "lucide-react";
import { NavLink } from "@/components/common/navlink/navlink";
import { AccentChip } from "../participate-icon";
import { SharedI18n } from "../participate-shared.i18n";
import { ParticipateSlug } from "../participate.types";

type Props = {
  t: SharedI18n["participate_shared"]["others"];
  current: ParticipateSlug;
};

/** "Other ways to participate": the three sibling pages, each in its accent. */
function ParticipateOthers({ t, current }: Props) {
  const roles = t.roles.filter((role) => role.slug !== current);
  return (
    <nav aria-labelledby="participate-others" className="border-t pt-10">
      <h2 id="participate-others" className="text-xl md:text-2xl">
        {t.title}
      </h2>
      <ul className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
        {roles.map((role) => (
          <li key={role.slug}>
            <NavLink
              href={role.href}
              className="group flex h-full items-start gap-4 rounded-2xl border bg-card p-5 transition-colors duration-150 hover:border-primary"
            >
              <AccentChip name={role.icon} accent={role.accent} />
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2 font-bold text-foreground">
                  {role.title}
                  <ArrowRightIcon
                    aria-hidden="true"
                    className="size-4 shrink-0 text-primary-ink transition-transform duration-150 group-hover:translate-x-1"
                  />
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">{role.content}</span>
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default ParticipateOthers;
