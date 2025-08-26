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
  return (
    <nav
      className={`hidden lg:block z-50 fixed bg-background border border-t-0 border-l-0 border-r-0 border-b-primary w-full`}
    >
      <div className="max-w-[1200px] mx-auto flex justify-between items-center p-4">
        <div className="flex items-center space-x-6">
          <NavLink href="/">
            <Logo
              formFactor="horizontal"
              colorScheme="branded"
              width={194}
              height={64}
            />
          </NavLink>
          <NavigationMenu>
            <NavigationMenuList>
              {t.links.map((link, tllIndex) => {
                const nestedLink = appendParentRoutes(link);
                return (
                  <NavigationMenuItem key={`tll-${tllIndex}`}>
                    {nestedLink.items ? (
                      <>
                        <NavigationMenuTrigger>
                          {nestedLink.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="flex">
                          <ul className="grid p-4 md:w-[250px] lg:w-[300px] grid-cols-1">
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
                                  } bg-card p-4 md:w-[250px] lg:w-[300px]`}
                                >
                                  {item.items.map((item, lllIndex) => (
                                    <li
                                      key={`lll-${tllIndex}-${sllIndex}-${lllIndex}`}
                                      className="h-14"
                                    >
                                      <NavLink
                                        href={item.href}
                                        className="w-full block p-4 hover:bg-primary/5 rounded-md"
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
                      <div
                        className={navigationMenuTriggerStyle()}
                      >
                        <NavLink href={nestedLink.href}>
                          {nestedLink.label}
                        </NavLink>
                      </div>
                    )}
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
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
    </nav>
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
              "flex items-center select-none space-y-1 rounded-md p-3 no-underline outline-none transition-colors hover:bg-primary/5 hover:text-primary focus:bg-primary focus:text-primary-foreground",
              className
            )}
          >
            {icon && <NavbarIcon icon={icon} />}
            <div className="text-sm font-medium">{title}</div>
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
              "flex items-center select-none space-y-1 rounded-md p-3 no-underline outline-none transition-colors hover:bg-primary/5 hover:text-primary focus:bg-primary focus:text-primary-foreground",
              className
            )}
          >
            {icon && <NavbarIcon icon={icon} />}
            <div className="text-sm font-medium">{title}</div>
            {items && <ChevronRight className="ml-auto" />}
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {children}
            </p>
          </NavLink>
        )}
        {hovered && items && (
          <ul className="absolute left-full top-0 mt-2 ml-2 w-[200px] bg-white shadow-lg rounded-md">
            {items.map((item, index) => (
              <li key={`item-${index}-${item.label}`}>
                <NavLink
                  href={item.href}
                  className="block p-2 text-sm text-gray-700 hover:bg-gray-100"
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
