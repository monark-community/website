import MembersSection from "@/components/shared/members-section/members-section.component";
import { defaultLocale, Locale } from "@/i18n.config";
import { cookies } from "next/headers";
import React from "react";

type Props = { children: React.ReactNode };

async function AboutLayout({ children }: Props) {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value ||
    defaultLocale) as Locale;
  return (
    <article className="px-4 py-8">
      {children}
      <MembersSection locale={locale} />
    </article>
  );
}

export default AboutLayout;
