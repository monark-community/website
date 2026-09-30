import React from "react";
import { badgeVariants } from "@/components/ui/badge";
import { NavLink } from "@/components/common/navlink/navlink";
import { cn } from "@/lib/utils";

/**
 * Tag chip rendered as a link: the secondary badge look from the 2026 restyle,
 * plus hover and focus states. Shared by the project page and the list cards.
 */
export const projectTagLinkClass = (active = false) =>
  cn(
    badgeVariants({ variant: "secondary" }),
    "w-fit whitespace-nowrap no-underline duration-150 hover:border-primary/60 hover:bg-primary/10 hover:text-secondary-foreground focus-visible:ring-offset-background",
    active &&
      "border-foreground bg-foreground text-background hover:bg-foreground hover:text-background"
  );

type Props = {
  href: string;
  label: string;
  children: React.ReactNode;
};

/** Chip linking to another page (uses NavLink so the progress bar runs). */
export default function ProjectTagLink({ href, label, children }: Props) {
  return (
    <NavLink href={href} aria-label={label} className={projectTagLinkClass()}>
      {children}
    </NavLink>
  );
}
