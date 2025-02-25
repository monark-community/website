"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/shared/navlink/navlink";
import { Locale } from "@/i18n.config";
import * as i18n from "./navbar.i18n";
import { LogInIcon, Menu, X } from "lucide-react";
import Logo from "@/components/shared/logo/logo";
import NavbarIcon from "./navbar-icon";
import LocaleToggle from "@/components/shared/locale-toggle/locale-toggle";
import { ThemeToggle } from "@/components/shared/theme-toggle/theme-toggle.component";
import SocialLinks from "../footer/socials/social-links";

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
    <nav
      className={`block lg:hidden z-50 fixed bg-background border border-t-0 border-l-0 border-r-0 border-b-primary w-full`}
    >
      <div className="max-w-[1440px] mx-auto flex justify-between items-center p-4">
        <NavLink href="/">
          <Logo
            formFactor="horizontal"
            colorScheme="branded"
            width={194}
            height={64}
          />
        </NavLink>
        <Button
          variant="ghost"
          className="lg:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>
      <div
        className={`fixed top-[72px] right-0 bg-background overflow-scroll transition-all duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } w-full h-[calc(100%-72px)] z-40 lg:hidden`}
      >
        <div className="p-4 flex flex-col justify-between h-full pb-12">
          <div>
            <NavLink
              href="/error/501"
              className="mb-4 block"
              onClick={handleLinkClick}
            >
              <Button className="w-full">
                <LogInIcon />
                &nbsp;{t.sign_in}
              </Button>
            </NavLink>
            <Accordion type="single" collapsible>
              {t.links.map((link) => {
                const nestedLink = appendParentRoutes(link);
                return nestedLink.items ? (
                  <AccordionItem
                    key={nestedLink.label}
                    value={nestedLink.label}
                    className="data-[state=open]:border-l-2 data-[state=open]:border-l-primary"
                  >
                    <AccordionTrigger>{nestedLink.label}</AccordionTrigger>
                    <AccordionContent className="pr-0">
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
                                          <NavLink
                                            href={subItem.href}
                                            onClick={handleLinkClick}
                                          >
                                            <Button
                                              variant="link"
                                              className="w-full text-left justify-start my-3"
                                            >
                                              {subItem.icon && (
                                                <NavbarIcon
                                                  icon={subItem.icon}
                                                />
                                              )}
                                              {subItem.label}
                                            </Button>
                                          </NavLink>
                                        </li>
                                      ))}
                                    </ul>
                                  </AccordionContent>
                                </AccordionItem>
                              </Accordion>
                            ) : (
                              <NavLink
                                href={item.href}
                                onClick={handleLinkClick}
                              >
                                <Button
                                  variant="link"
                                  className="w-full text-left justify-start my-3"
                                >
                                  {item.icon && <NavbarIcon icon={item.icon} />}
                                  {item.label}
                                </Button>
                              </NavLink>
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
                  >
                    <Button
                      variant="link"
                      className="w-full text-left h-16 justify-start"
                    >
                      {nestedLink.label}
                    </Button>
                  </NavLink>
                );
              })}
            </Accordion>
          </div>
          <div className="flex justify-between items-center mt-4">
            <SocialLinks />
            <div className="flex gap-4">
              <LocaleToggle locale={locale} />
              <ThemeToggle locale={locale} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarMobile;
