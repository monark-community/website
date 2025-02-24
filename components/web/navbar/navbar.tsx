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
import { NavLink } from "@/components/shared/navlink/navlink";
import { Locale } from "@/i18n.config";
import {
  BinaryIcon,
  BlocksIcon,
  BookMarkedIcon,
  BookOpenIcon,
  CalendarPlus,
  CodeIcon,
  CoinsIcon,
  GithubIcon,
  GraduationCapIcon,
  InfoIcon,
  LightbulbIcon,
  LucideProps,
  MedalIcon,
  NewspaperIcon,
  PlaySquareIcon,
  PodcastIcon,
  TestTubeDiagonalIcon,
  UniversityIcon,
  UsersIcon,
  VoteIcon,
  ChevronRight,
} from "lucide-react";
import Logo from "@/components/shared/logo/logo";
import { Button } from "@/components/ui/button";

type Props = {
  locale: Locale;
};

const iconMap: Record<
  string,
  React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >
> = {
  code: CodeIcon,
  lightbulb: LightbulbIcon,
  university: UniversityIcon,
  "graduation-cap": GraduationCapIcon,
  blocks: BlocksIcon,
  "book-marked": BookMarkedIcon,
  users: UsersIcon,
  "test-tube-diagonal": TestTubeDiagonalIcon,
  medal: MedalIcon,
  binary: BinaryIcon,
  "calendar-plus": CalendarPlus,
  info: InfoIcon,
  vote: VoteIcon,
  coins: CoinsIcon,
  "book-open": BookOpenIcon,
  newspaper: NewspaperIcon,
  "square-play": PlaySquareIcon,
  podcast: PodcastIcon,
};

type NavbarLink = {
  icon?: string;
  label: string;
  href: string;
  isFolderRoute?: boolean;
  items?: NavbarLink[];
};

const LinkIcon = ({ icon }: { icon: string; className?: string }) => {
  const Icon = iconMap[icon];
  return (
    <div className="bg-card h-12 w-12 flex justify-center items-center rounded-md mr-4">
      <Icon height={24} width={24} />
    </div>
  );
};

const appendParentRoutes = (
  link: NavbarLink,
  parentHref: string = ""
): NavbarLink => {
  const newHref = `${parentHref}${link.href}`;
  return {
    ...link,
    href: newHref,
    items: link.items?.map((item) => appendParentRoutes(item, newHref)),
  };
};

const Navbar = ({ locale }: Props) => {
  const t = i18n[locale].navbar;
  const [hoveredSubItem, setHoveredSubItem] = React.useState<string | null>(
    null
  );
  return (
    <nav
      className={`z-50 fixed bg-background border border-t-0 border-l-0 border-r-0 border-b-primary w-full`}
    >
      <div className="max-w-[1440px] mx-auto flex justify-between items-center p-4">
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
              {t.links.map((link) => {
                const nestedLink = appendParentRoutes(link);
                return (
                  <NavigationMenuItem key={nestedLink.label}>
                    {nestedLink.items ? (
                      <>
                        <NavigationMenuTrigger>
                          {nestedLink.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="flex">
                          <ul className="grid p-4 md:w-[250px] lg:w-[300px] grid-cols-1">
                            {nestedLink.items.map((item) => (
                              <NavigationMenuLink
                                key={item.label}
                                className={`${item.items ? "col-span-2" : ""}`}
                              >
                                <ListItem
                                  href={item.href}
                                  title={item.label}
                                  icon={item.icon}
                                  items={item.items}
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
                          {nestedLink.items.map((item) => (
                            <>
                              {item.items ? (
                                <ul
                                  className={`${
                                    hoveredSubItem === item.label
                                      ? "block"
                                      : "hidden"
                                  } bg-card p-4 md:w-[250px] lg:w-[300px]`}
                                >
                                  {item.items.map((item) => (
                                    <li
                                      key={`sub-item-${item.label}`}
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
                      <NavLink href={nestedLink.href}>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          {nestedLink.label}
                        </NavigationMenuLink>
                      </NavLink>
                    )}
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <NavLink href="/login">
          <Button>
            <GithubIcon />
            &nbsp;{t.sign_in}
          </Button>
        </NavLink>
      </div>
    </nav>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    title: string;
    icon?: string;
    items?: NavbarLink[];
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
      children,
      hovered,
      onHoverChange,
      ...props
    },
    ref
  ) => {
    return (
      <li onMouseEnter={() => onHoverChange(true)}>
        <NavLink
          href={props.href as string}
          ref={ref}
          className={cn(
            "flex items-center select-none space-y-1 rounded-md p-3 no-underline outline-none transition-colors hover:bg-primary/5 hover:text-primary focus:bg-primary focus:text-primary-foreground",
            className
          )}
        >
          {icon && <LinkIcon icon={icon} />}
          <div className="text-sm font-medium">{title}</div>
          {items && <ChevronRight className="ml-auto" />}
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {children}
          </p>
        </NavLink>
        {hovered && items && (
          <ul className="absolute left-full top-0 mt-2 ml-2 w-[200px] bg-white shadow-lg rounded-md">
            {items.map((item) => (
              <li key={item.label}>
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

export default Navbar;
