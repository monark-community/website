"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/common/navlink/navlink";
import { Locale } from "@/i18n.config";
import * as i18n from "./navbar.i18n";
import { Menu, X } from "lucide-react";
import Logo from "@/components/common/logo/logo";
import NavbarIcon from "./navbar-icon";
import LocaleToggle from "@/components/common/locale-toggle/locale-toggle";
import { ThemeToggle } from "@/components/common/theme-toggle/theme-toggle.component";
import SocialLinks from "@/components/common/socials/social-links";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";

type Props = {
  locale: Locale;
};

const appendParentRoutes = (
  link: i18n.NavbarLink,
  parentHref: string = ""
): i18n.NavbarLink => {
  const newHref = `${parentHref}${link.href}`;
  return {
    ...link,
    href: newHref,
    items: link.items?.map((item) => appendParentRoutes(item, newHref)),
  };
};

const NavbarMobile = ({ locale }: Props) => {
  const t = i18n[locale].navbar;
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header
      className={`block lg:hidden z-50 fixed top-0 inset-x-0 h-16 border-b ${
        isOpen ? "bg-background" : "bg-background/90 backdrop-blur-md"
      }`}
    >
      <div className="site-container flex h-full items-center justify-between">
        <NavLink href="/" aria-label="Monark" onClick={handleLinkClick}>
          <Logo
            formFactor="horizontal"
            colorScheme="branded"
            width={123}
            height={38}
          />
        </NavLink>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden -mr-2 h-11 w-11"
          onClick={toggleMenu}
          aria-label={isOpen ? t.menu_close : t.menu_open}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? <X className="!size-6" /> : <Menu className="!size-6" />}
        </Button>
      </div>
      <nav
        id="mobile-menu"
        aria-label={t.label}
        className={`fixed top-16 bottom-0 right-0 w-full bg-background overflow-y-auto overscroll-contain transition-[transform,visibility] duration-200 ease-out ${
          isOpen ? "translate-x-0 visible" : "translate-x-full invisible"
        } z-40 lg:hidden`}
      >
        <div className="site-container flex flex-col justify-between min-h-full py-4 pb-10">
          <div>
            {/* <NavLink
              href="/error/501"
              className="mb-4 block"
              onClick={handleLinkClick}
            > */}
            {/* <Tooltip>
              <TooltipContent>{t.soon}</TooltipContent>
              <TooltipTrigger className="w-full">
                <Button className="w-full" disabled>
                  <LogInIcon />
                  &nbsp;{t.sign_in}
                </Button>
              </TooltipTrigger>
            </Tooltip> */}

            {/* </NavLink> */}
            <Accordion type="single" collapsible>
              {t.links.map((link) => {
                const nestedLink = appendParentRoutes(link);
                return nestedLink.items ? (
                  <AccordionItem
                    key={nestedLink.label}
                    value={nestedLink.label}
                  >
                    <AccordionTrigger className="px-2 text-lg">{nestedLink.label}</AccordionTrigger>
                    <AccordionContent className="px-0 pt-0">
                      <ul>
                        {nestedLink.items.map((item) => (
                          <li key={item.label}>
                            {item.items ? (
                              <Accordion type="single" collapsible>
                                <AccordionItem
                                  value={item.label}
                                  className="border-b-0 py-0"
                                >
                                  <AccordionTrigger className="py-2">
                                    <div className="flex gap-3 items-center">
                                      {item.icon && (
                                        <NavbarIcon icon={item.icon} />
                                      )}
                                      {item.label}
                                    </div>
                                  </AccordionTrigger>
                                  <AccordionContent className="pr-0">
                                    <ul>
                                      {item.items.map((subItem) => (
                                        <li key={subItem.label}>
                                          <Button
                                            asChild
                                            variant="ghost"
                                            className="w-full h-11 justify-start text-base font-semibold [&_svg]:text-primary"
                                          >
                                            <NavLink
                                              href={subItem.href}
                                              onClick={handleLinkClick}
                                            >
                                              {subItem.icon && (
                                                <NavbarIcon icon={subItem.icon} />
                                              )}
                                              {subItem.label}
                                            </NavLink>
                                          </Button>
                                        </li>
                                      ))}
                                    </ul>
                                  </AccordionContent>
                                </AccordionItem>
                              </Accordion>
                            ) : (
                              <Button
                                asChild
                                variant="ghost"
                                className="w-full h-11 justify-start text-base font-semibold [&_svg]:text-primary"
                              >
                                <NavLink href={item.href} onClick={handleLinkClick}>
                                  {item.icon && <NavbarIcon icon={item.icon} />}
                                  {item.label}
                                </NavLink>
                              </Button>
                            )}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ) : (
                  <NavLink
                    key={nestedLink.label}
                    href={nestedLink.href}
                    onClick={handleLinkClick}
                    className="flex h-14 items-center border-b px-2 text-lg font-semibold transition-colors hover:text-primary-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                  >
                    {nestedLink.label}
                  </NavLink>
                );
              })}
            </Accordion>
          </div>
          <div className="flex flex-col gap-6 mt-8 pt-6 border-t">
            <div className="flex items-center justify-between gap-3">
              <LocaleToggle locale={locale} />
              <ThemeToggle locale={locale} />
            </div>
            <SocialLinks />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavbarMobile;
