import { Locale } from "@/i18n.config";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/common/navlink/navlink";
import { HomeIcon } from "lucide-react";
import * as i18n from "./errors.i18n";

type Params = Promise<{ locale: Locale; code: string }>;

export default async function ErrorPage({ params }: { params: Params }) {
  const { locale, code } = await params;
  const t = i18n[locale];

  const supportedCodes = Object.keys(t.error_definitions) as Array<
    keyof typeof t.error_definitions
  >;

  let sanitizedCode: keyof typeof t.error_definitions =
    "500" as keyof typeof t.error_definitions;
  if (supportedCodes.includes(code as keyof typeof t.error_definitions)) {
    sanitizedCode = code as keyof typeof t.error_definitions;
  }

  const randomIndex = Math.floor(Math.random() * t.fun_facts.length);
  const randomFact = t.fun_facts[randomIndex];

  return (
    <div className="flex flex-col md:flex-row gap-16 items-center max-w-[1200px] mx-auto my-12 px-4 py-8 md:px-12 md:py-16">
      <div>
        <h1 className="text-headline text-primary">{sanitizedCode}</h1>
        <h2 className="mt-4 max-w-[700px]">
          {t.error_definitions[sanitizedCode].title}
        </h2>
        <div className="max-w-[500px]">
          <div className="text-lg text-muted-foreground normal-case mt-4">
            {t.error_definitions[sanitizedCode].subtitle}
          </div>
          <div className="my-8">
            <h3>{t.error_definitions[sanitizedCode].content_1.description}</h3>
            <Button asChild className="mt-4 w-fit">
              <NavLink href="/">
                <HomeIcon />
                &nbsp;
                {t.error_definitions[sanitizedCode].content_1.actions.home}
              </NavLink>
            </Button>
          </div>
          <p className="mt-8 text-sm text-muted-foreground">{randomFact}</p>
        </div>
      </div>
    </div>
  );
}
