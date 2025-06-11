"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image, { ImageProps } from "next/image";

interface Props extends Omit<ImageProps, "src" | "alt"> {
  formFactor?: "full" | "vertical" | "horizontal" | "standalone";
  colorScheme?: "mono" | "branded";
}

function Logo(props: Props) {
  const {
    formFactor = "standalone",
    colorScheme = "color",
    width,
    height,
    ...rest
  } = props;

  const theme = useTheme();
  const { resolvedTheme } = theme;

  const [logoFileName, setLogoFileName] = useState("");

  useEffect(() => {
    const getLogoFileName = () => {
      if (formFactor === "standalone" && colorScheme === "branded") {
        // Special case for standalone branded logo, which doesn't
        // have a theme variant and is always colored.
        return `logo-${colorScheme}-${formFactor}.svg`;
      }
      return `logo-${colorScheme}-${
        resolvedTheme || "light"
      }-${formFactor}.svg`;
    };

    setLogoFileName(getLogoFileName());
  }, [resolvedTheme, formFactor, colorScheme]);

  return (
    <div style={{ width, height }}>
      {logoFileName && (
        <Image
          src={`/vectors/brand/${formFactor}/${logoFileName}`}
          width={width}
          height={height}
          {...rest}
          alt="Monark Logo"
        />
      )}
    </div>
  );
}

export default Logo;
