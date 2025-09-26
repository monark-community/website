import React from "react";
import { Locale } from "@/i18n.config";
import * as i18n from "./why-section.i18n";
// import Image from "next/image";
import {
  BrandedCard,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { NavLink } from "@/components/common/navlink/navlink";
import NavbarIcon from "@/components/common/layout/navbar/navbar-icon";
// import GithubOrgMembers from "./github-org-members/GithubOrgMembers";

type Props = {
  locale: Locale;
};

function WhySection({ locale }: Props) {
  const t = i18n[locale].why;
  return (
    <section className="why-section mx-auto lg:max-w-[1200px] px-4 py-8 md:px-12 md:py-16 text-center">
      <span className="text-tagline">{t.flavor}</span>
      <h2 className="max-w-[680px] mx-auto">{t.title}</h2>
      {/* <div className="flex flex-col items-center justify-center mt-12">
        <div className="grid grid-cols-1 gap-24 lg:grid-cols-3">
          {t.perks.map((perk, index) => (
            <Perk key={index} perk={perk} />
          ))}
        </div>
      </div> */}
      <GithubOrgMembers />
      <div className="flex flex-col items-center justify-center mt-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {t.audiences.map((audience, index) => (
            <Audience key={index} audience={audience} />
          ))}
        </div>
      </div>
    </section>
  );
}

// type PerkProps = {
//   perk: i18n.WhyPerk;
// };

// function Perk({ perk }: PerkProps) {
//   return (
//     <div className="flex flex-col items-center">
//       <div className="mx-auto relative w-[128px] h-[128px]">
//         <Image
//           src={`/vectors/decorative/${perk.icon}.svg`}
//           alt={`${perk.title} icon`}
//           width={96}
//           height={96}
//           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
//         />
//         <Image
//           src={`/vectors/decorative/${perk.tile}.svg`}
//           alt=""
//           width={128}
//           height={128}
//         />
//       </div>
//       <h3 className="mt-8 min-h-[64px] flex justify-center items-center">
//         {perk.title}
//       </h3>
//       <p className="text-lg mt-4 text-muted-foreground max-w-[400px]">
//         {perk.content}
//       </p>
//     </div>
//   );
// }

type AudienceProps = {
  audience: i18n.WhyAudience;
};

function Audience({ audience }: AudienceProps) {
  return (
    <BrandedCard className="relative text-left">
      <div className="relative z-1 h-full flex flex-col justify-between">
        <CardHeader className="pt-16">
          <div className="flex flex-start mb-4">
            <NavbarIcon icon={audience.icon} className="absolute text-primary blur-sm" size={64} strokeWidth={1} />
            <NavbarIcon icon={audience.icon} className=" text-primary" size={64} strokeWidth={1} />
          </div>
          <CardTitle><NavLink href={audience.href} className="hover:underline">{audience.title}</NavLink></CardTitle>
        </CardHeader>
        <div className="flex-1 flex flex-col justify-between">
          <CardContent>
            <CardDescription className="text-lg">
              {audience.content}
            </CardDescription>
          </CardContent>
          <CardFooter>
            <NavLink href={audience.href}>
              <Button size="icon" variant="ghost" className="text-primary">
                <ArrowRightIcon />
              </Button>
            </NavLink>
          </CardFooter>
        </div>
      </div>
    </BrandedCard>
  );
}

export default WhySection;
