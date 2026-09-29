import React from "react";
import ParticipateArt from "../participate-art";
import {
  ParticipateAccent,
  ParticipateContent,
  ParticipateIconName,
} from "../participate.types";
import ParticipateButton from "./participate-link";

type Props = {
  t: ParticipateContent["cta"];
  newTab: string;
  icon: ParticipateIconName;
  accent: ParticipateAccent;
};

/** Closing call to action: Discord first, a secondary link beside it. */
function ParticipateCta({ t, newTab, icon, accent }: Props) {
  return (
    <section
      aria-labelledby="participate-cta"
      className="relative overflow-hidden rounded-3xl border bg-secondary/60 p-6 sm:p-8 md:p-10"
    >
      <div className="pointer-events-none absolute right-8 top-1/2 hidden w-44 -translate-y-1/2 md:block lg:w-52">
        <ParticipateArt icon={icon} accent={accent} />
      </div>
      <div className="max-w-[36rem] md:pr-8 lg:max-w-[40rem]">
        <h2 id="participate-cta">{t.title}</h2>
        <p className="mt-3 text-muted-foreground">{t.content}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <ParticipateButton link={t.primary} newTab={newTab} className="w-full sm:w-auto" />
          {t.secondary && (
            <ParticipateButton
              link={t.secondary}
              newTab={newTab}
              variant="outline"
              className="w-full bg-card sm:w-auto"
            />
          )}
        </div>
        {t.note && <p className="mt-4 text-sm text-muted-foreground">{t.note}</p>}
      </div>
    </section>
  );
}

export default ParticipateCta;
