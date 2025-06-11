import React from "react";
import NavbarDesktop from "./navbar-desktop";
import NavbarMobile from "./navbar-mobile";
import { Locale } from "@/i18n.config";

type Props = {
  locale: Locale;
};

function NavbarWrapper({ locale }: Props) {
  return (
    <>
      <NavbarDesktop locale={locale} />
      <NavbarMobile locale={locale} />
    </>
  );
}

export default NavbarWrapper;
