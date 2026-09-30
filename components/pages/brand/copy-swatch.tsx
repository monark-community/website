"use client";

import React, { useEffect, useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  hex: string;
  name: string;
  role: string;
  contrast?: string;
  copy: string;
  copied: string;
  /** Classes for the colour chip (defaults to a bordered square). */
  chipClassName?: string;
  className?: string;
};

/**
 * A colour swatch that copies its hex value on click. The confirmation is
 * shown on the button and announced through a polite live region.
 */
function CopySwatch({
  hex,
  name,
  role,
  contrast,
  copy,
  copied,
  chipClassName,
  className,
}: Props) {
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(hex);
    } catch {
      return;
    }
    setDone(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setDone(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      className={cn(
        "group flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors duration-150 ease-out hover:bg-secondary",
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn("size-11 shrink-0 rounded-lg border", chipClassName)}
        style={{ backgroundColor: hex }}
      />
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-baseline gap-x-2">
          <span className="text-sm font-bold text-foreground">{name}</span>
          <span className="font-mono text-xs text-muted-foreground">{hex}</span>
        </span>
        <span className="block text-xs text-muted-foreground">
          {role}
          {contrast && <span className="font-semibold text-foreground"> · {contrast}</span>}
        </span>
      </span>
      <span className="shrink-0 text-muted-foreground" aria-hidden="true">
        {done ? (
          <CheckIcon className="size-4 text-foreground" />
        ) : (
          <CopyIcon className="size-4 opacity-60 transition-opacity duration-150 group-hover:opacity-100" />
        )}
      </span>
      <span className="sr-only">
        {copy} {hex}
      </span>
      <span className="sr-only" role="status" aria-live="polite">
        {done ? `${copied} ${hex}` : ""}
      </span>
    </button>
  );
}

export default CopySwatch;
