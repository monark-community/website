import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionHeading from "@/components/pages/about/sections/section-heading";
import { ParticipateContent } from "../participate.types";

type Props = { t: NonNullable<ParticipateContent["faq"]> };

/** FAQ: heading on the left, a single-open accordion on the right (lg). */
function ParticipateFaq({ t }: Props) {
  return (
    <section
      aria-labelledby="participate-faq"
      className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-12"
    >
      <SectionHeading id="participate-faq" eyebrow={t.eyebrow} title={t.title} />
      <Accordion
        type="single"
        collapsible
        className="overflow-hidden rounded-2xl border bg-card"
      >
        {t.items.map((item, index) => (
          <AccordionItem
            key={item.question}
            value={`faq-${index}`}
            className="last:border-b-0"
          >
            <AccordionTrigger className="px-5 text-left leading-snug [text-wrap:pretty]">{item.question}</AccordionTrigger>
            <AccordionContent className="px-5 pb-5">{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

export default ParticipateFaq;
