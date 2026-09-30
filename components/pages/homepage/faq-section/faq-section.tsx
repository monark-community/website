import React from "react";
import { Locale } from "@/i18n.config";
import * as i18n from "./faq-section.i18n";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
// import {
//   BrandedCard,
//   CardHeader,
//   CardContent,
//   CardFooter,
//   CardTitle,
// } from "@/components/ui/card";
import "./faq-section.scss";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import { NavLink } from "@/components/shared/navlink/navlink";
// import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type Props = {
  locale: Locale;
};

function FAQSection({ locale }: Props) {
  const t = i18n[locale].faq;

  return (
    <section className="faq-section site-container section">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-16">
        <div>
          <span className="eyebrow">{t.flavor}</span>
          <h2 className="max-w-[24rem]">{t.title}</h2>
        </div>
        <Accordion
          type="single"
          collapsible
          className="border-t lg:col-span-2"
        >
          {t.items.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="px-0 hover:bg-transparent hover:text-primary-ink">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="px-0 pt-0 leading-relaxed">
                <div dangerouslySetInnerHTML={{ __html: item.answer }} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* <div className="relative">
          <Image
            src="/vectors/decorative/flower.svg"
            alt=""
            width={256}
            height={256}
            className="absolute -top-56 right-48 z-[-1] hidden lg:block -scale-x-100 rotate-12"
          />
          <BrandedCard className="relative overflow-hidden lg:col-span-1 h-fit">
            <div className="absolute transition-all opacity-40 sm:opacity-100 z-0 right-0 sm:right-16 top-1/2 -translate-y-1/2 lg:top-0 lg:right-0 lg:-translate-y-14 lg:translate-x-4 rounded-full bg-primary/10 h-[256px] w-[256px] flex items-center justify-center">
              <Image
                src="/vectors/decorative/roadmap.svg"
                alt=""
                width={256}
                height={256}
              />
            </div>
            <div className="relative z-1">
              <CardHeader className="lg:pt-36">
                <CardTitle>{t.roadmap_card.title}</CardTitle>
              </CardHeader>
              <CardContent className="max-w-[400px] text-muted-foreground">
                {t.roadmap_card.content}
              </CardContent>
              <CardFooter>
                <Tooltip>
                  <TooltipContent>{t.soon}</TooltipContent>
                  <TooltipTrigger>
                    <Button disabled>{t.roadmap_card.action}</Button>
                  </TooltipTrigger>
                </Tooltip>
              </CardFooter>
            </div>
          </BrandedCard>
        </div> */}
      </div>
    </section>
  );
}

export default FAQSection;
