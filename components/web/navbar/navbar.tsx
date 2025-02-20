import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Locale } from "@/i18n.config";
import * as i18n from "./navbar.i18n";
import { Button } from "@/components/ui/button";
// import Logo from "@/components/shared/logo/logo";
import { GithubIcon } from "lucide-react";
import Image from "next/image";

type Props = {
  locale: Locale;
};

function Navbar({ locale }: Props) {
  const t = i18n[locale].navbar;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed border border-b-primary w-full ${scrolled ? "bg-background" : "bg-background"}`}>
      <div className="max-w-[1440px] mx-auto flex justify-between items-center p-4">
        <Image
          src="/vectors/brand/horizontal/logo-branded-dark-horizontal.svg"
          alt="Monark Logo"
          width={194}
          height={64}
        />
        {/* <Logo formFactor="horizontal" width={194} height={64} /> */}
        <Link href="/signin">
          <Button>
            <GithubIcon />
            &nbsp;{t.sign_in}
          </Button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
