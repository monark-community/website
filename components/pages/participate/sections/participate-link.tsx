import React from "react";
import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/button";
import { NavLink } from "@/components/common/navlink/navlink";
import { ParticipateLink } from "../participate.types";

type Props = {
  link: ParticipateLink;
  /** Screen-reader suffix for external links ("opens in a new tab"). */
  newTab: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
};

/**
 * A pill button for a participate link: internal routes go through NavLink
 * (progress bar, view transitions); external ones (Discord) open in a new
 * tab with an arrow icon and a screen-reader note.
 */
function ParticipateButton({
  link,
  newTab,
  variant = "default",
  size = "lg",
  className = "",
}: Props) {
  return (
    <Button asChild variant={variant} size={size} className={className}>
      {link.external ? (
        <a href={link.href} target="_blank" rel="noopener noreferrer">
          {link.label}
          <span className="sr-only"> {newTab}</span>
          <ArrowUpRightIcon aria-hidden="true" />
        </a>
      ) : (
        <NavLink href={link.href}>
          {link.label}
          <ArrowRightIcon aria-hidden="true" />
        </NavLink>
      )}
    </Button>
  );
}

export default ParticipateButton;
