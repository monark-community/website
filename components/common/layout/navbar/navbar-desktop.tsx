"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import * as i18n from "./navbar.i18n";
import { NavLink } from "@/components/common/navlink/navlink";
import { Locale } from "@/i18n.config";
import { ChevronRight } from "lucide-react";
import Logo from "@/components/common/logo/logo";
// import { Button } from "@/components/ui/button";
import NavbarIcon from "./navbar-icon";
import { usePathname } from "next/navigation";
import LocaleToggle from "@/components/common/locale-toggle/locale-toggle";
import { ThemeToggle } from "@/components/common/theme-toggle/theme-toggle.component";
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

  if (link.href.startsWith("http")) {
    // External link, do not append parent routes
    return link;
  }

  const newHref = `${parentHref}${link.href}`;
  return {
    ...link,
    href: newHref,
    items: link.items?.map((item) => appendParentRoutes(item, newHref)),
  };
};

const NavbarDesktop = ({ locale }: Props) => {
  const t = i18n[locale].navbar;
  const [hoveredSubItem, setHoveredSubItem] = React.useState<string | null>(
    null
  );
  // Strip the locale prefix so "/project" matches "/en/project/...".
  const pathname = (usePathname() ?? "").replace(/^\/(en|fr)(?=\/|$)/, "") || "/";
  const isActive = (href: string) =>
    href !== "/" && (pathname === href || pathname.startsWith(`${href}/`));
  return (
    <header
      className="hidden lg:block z-50 fixed top-0 inset-x-0 h-16 border-b bg-background/90 backdrop-blur-md"
    >
      <div className="site-container flex h-full items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <NavLink href="/" aria-label="Monark" className="rounded-md">
            <Logo
              formFactor="horizontal"
              colorScheme="branded"
              width={136}
              height={42}
            />
          </NavLink>
          <NavigationMenu aria-label={t.label}>
            <NavigationMenuList>
              {t.links.map((link, tllIndex) => {
                const nestedLink = appendParentRoutes(link);
                return (
                  <NavigationMenuItem key={`tll-${tllIndex}`}>
                    {nestedLink.items ? (
                      <>
                        <NavigationMenuTrigger
                          className={cn(isActive(nestedLink.href) && "bg-secondary text-foreground")}
                        >
                          {nestedLink.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="flex">
                          <ul className="grid gap-0.5 p-2 md:w-[250px] lg:w-[280px] grid-cols-1">
                            {nestedLink.items.map((item, fllIndex) => (
                              <NavigationMenuLink
                                key={`fll-${tllIndex}-${fllIndex}`}
                                className={`${item.items ? "col-span-2" : ""}`}
                              >
                                <ListItem
                                  href={item.href}
                                  title={item.label}
                                  icon={item.icon}
                                  items={item.items}
                                  isFolderRoute={item.isFolderRoute}
                                  hovered={hoveredSubItem === item.label}
                                  onHoverChange={(hovered) => {
                                    setHoveredSubItem(
                                      hovered ? item.label : null
                                    );
                                  }}
                                ></ListItem>
                              </NavigationMenuLink>
                            ))}
                          </ul>
                          {nestedLink.items.map((item, sllIndex) => (
                            <>
                              {item.items ? (
                                <ul
                                  key={`sll-${tllIndex}-${sllIndex}`}
                                  className={`${
                                    hoveredSubItem === item.label
                                      ? "block"
                                      : "hidden"
                                  } border-l p-2 md:w-[250px] lg:w-[280px]`}
                                >
                                  {item.items.map((item, lllIndex) => (
                                    <li
                                      key={`lll-${tllIndex}-${sllIndex}-${lllIndex}`}
                                      className="h-14"
                                    >
                                      <NavLink
                                        href={item.href}
                                        className="w-full block px-3 py-2.5 hover:bg-secondary rounded-md"
                                      >
                                        {item.label}
                                      </NavLink>
                                    </li>
                                  ))}
                                </ul>
                              ) : null}
                            </>
                          ))}
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavLink
                        href={nestedLink.href}
                        aria-current={isActive(nestedLink.href) ? "page" : undefined}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          isActive(nestedLink.href) && "bg-secondary text-foreground"
                        )}
                      >
                        {nestedLink.label}
                      </NavLink>
                    )}
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-1">
          <LocaleToggle locale={locale} />
          <ThemeToggle locale={locale} />
        </div>
        {/* <NavLink href="/error/501"> */}
        {/* <Tooltip>
          <TooltipContent>{t.soon}</TooltipContent>
          <TooltipTrigger>
            <Button disabled>
              <LogInIcon />
              &nbsp;{t.sign_in}
            </Button>
          </TooltipTrigger>
        </Tooltip> */}
        {/* </NavLink> */}
      </div>
    </header>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    title: string;
    icon?: string;
    items?: i18n.NavbarLink[];
    isFolderRoute?: boolean;
    hovered?: boolean;
    onHoverChange: (hovered: boolean) => void;
  }
>(
  (
    {
      className,
      title,
      icon,
      items,
      isFolderRoute,
      children,
      hovered,
      onHoverChange,
      ...props
    },
    ref
  ) => {
    return (
      <li onMouseEnter={() => onHoverChange(true)}>
        {isFolderRoute ? (
          <div
            className={cn(
              "flex items-center gap-3 select-none rounded-md px-3 py-2.5 text-foreground no-underline outline-none transition-colors duration-150 hover:bg-secondary focus-visible:bg-secondary focus-visible:ring-2 focus-visible:ring-ring [&_svg]:text-primary",
              className
            )}
          >
            {icon && <NavbarIcon icon={icon} />}
            <div className="text-sm font-semibold">{title}</div>
            {items && <ChevronRight className="ml-auto" />}
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {children}
            </p>
          </div>
        ) : (
          <NavLink
            href={props.href as string}
            ref={ref}
            className={cn(
              "flex items-center gap-3 select-none rounded-md px-3 py-2.5 text-foreground no-underline outline-none transition-colors duration-150 hover:bg-secondary focus-visible:bg-secondary focus-visible:ring-2 focus-visible:ring-ring [&_svg]:text-primary",
              className
            )}
          >
            {icon && <NavbarIcon icon={icon} />}
            <div className="text-sm font-semibold">{title}</div>
            {items && <ChevronRight className="ml-auto" />}
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {children}
            </p>
          </NavLink>
        )}
        {hovered && items && (
          <ul className="absolute left-full top-0 mt-2 ml-2 w-[200px] rounded-lg border bg-popover p-1 shadow-lg shadow-foreground/5">
            {items.map((item, index) => (
              <li key={`item-${index}-${item.label}`}>
                <NavLink
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-secondary"
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

export default NavbarDesktop;
