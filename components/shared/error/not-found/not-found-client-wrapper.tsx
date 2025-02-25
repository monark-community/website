"use client";
import { Locale } from "@/i18n.config";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import * as i18n from "./not-found.i18n";
import { NavLink } from "../../navlink/navlink";
import StandardLayout from "@/components/web/web.layout";
import { useMemo } from "react";

const NotFoundClientWrapper = () => {
  const locale = usePathname().split("/")[1] as Locale;
  const t = i18n[locale];

  const randomFact = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * t.fun_facts.length);
    return t.fun_facts[randomIndex];
  }, [t.fun_facts]);

  return (
    <StandardLayout locale={locale}>
      <div className="flex flex-col md:flex-row gap-16 items-center max-w-[1440px] mx-auto my-12 px-4 py-8 md:px-12 md:py-16">
        <div>
          <h1 className="text-headline text-primary">404</h1>
          <h2 className="mt-4 max-w-[700px]">{t.title}</h2>
          <div className="max-w-[500px]">
            <div className="text-lg text-muted-foreground normal-case mt-4">
              {t.subtitle}
            </div>
            <div className="my-8">
              <h3>{t.content_1.description}</h3>
              <Button asChild className="mt-4 w-fit">
                <NavLink href="/">{t.content_1.actions.home}</NavLink>
              </Button>
            </div>
            <p className="mt-8 text-sm text-muted-foreground">{randomFact}</p>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
};

export default NotFoundClientWrapper;
