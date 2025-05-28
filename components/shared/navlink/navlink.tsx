"use client";

import { LinkProps } from "next/link";
import { Link } from "next-view-transitions";
import { ComponentProps } from "react";
import NProgress from "nprogress";

export function NavLink({
  children,
  ...props
}: LinkProps & ComponentProps<"a">) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        NProgress.start();
        props.onClick?.(e);
      }}
    >
      {children}
    </Link>
  );
}
