"use client";
import React from "react";
import { useTheme } from "next-themes";
import Image, { ImageProps } from "next/image";

interface Props extends Omit<ImageProps, "src" | "alt"> {
  formFactor?: "full" | "vertical" | "horizontal" | "standalone";
  colorScheme?: "mono" | "branded";
}

function Logo(props: Props) {
  const { formFactor = "standalone", colorScheme = "color" } = props;

  const { theme } = useTheme();

  const getLogoFileName = () => {
    if (formFactor === "standalone" && colorScheme === "branded") {
      // Special case for standalone branded logo, which doesn't
      // have a theme variant and is always colored.
      return `logo-${colorScheme}-${formFactor}.svg`;
    }
    return `logo-${colorScheme}-${theme}-${formFactor}.svg`;
  };

  return (
    <Image
      src={`/vectors/brand/${formFactor}/${getLogoFileName()}`}
      {...props}
      alt="Monark Logo"
    />
  );
}

export default Logo;
