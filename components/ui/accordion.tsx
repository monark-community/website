"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { Plus } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * The site's one expansion panel, after the Splitflow demo: a row per item
 * divided by hairlines, a bold question and an orange "+" that turns 45° into
 * an "×" while the panel is open. The panel's height animates (200ms ease-out)
 * unless the visitor prefers reduced motion, then it opens instantly.
 *
 * Radix provides the semantics: each trigger is a button inside a heading
 * with aria-expanded and aria-controls, each panel a labelled region, and
 * Enter/Space toggle while Up/Down/Home/End move between triggers.
 *
 * Wrap the items in <Accordion className="border-y"> for the framed list;
 * items draw the lines between them.
 */
const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b last:border-b-0", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="m-0 flex text-base">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "group flex min-h-14 flex-1 items-center justify-between gap-4 rounded-lg py-3 text-left text-lg font-bold leading-snug text-foreground transition-colors duration-150 hover:text-primary-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [text-wrap:pretty]",
        className
      )}
      {...props}
    >
      {children}
      <Plus
        aria-hidden="true"
        className="size-5 shrink-0 text-primary transition-transform duration-200 ease-out group-data-[state=open]:rotate-45 motion-reduce:transition-none"
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-base text-muted-foreground motion-safe:data-[state=closed]:animate-accordion-up motion-safe:data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("max-w-[68ch] pb-5 leading-relaxed", className)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
