"use client";

import { useEffect, useRef, useState } from "react";
import { Label } from "@/components/ui/label";

interface TocItem {
  text: string;
  id: string;
}

interface Props {
  items: TocItem[];
  label: string;
}

export default function ProjectTableOfContents({ items, label }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const ids = items.map((item) => item.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          // Pick the one closest to the top of the viewport
          const top = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          );
          setActiveId(top.target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    elements.forEach((el) => observerRef.current!.observe(el));

    return () => observerRef.current?.disconnect();
  }, [items]);

  if (!items.length) return null;

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    window.history.replaceState(null, "", `#${id}`);
  }

  return (
    <div className="mt-8">
      <Label className="mb-0 mt-4 font-bold text-muted-foreground">{label}</Label>
      <nav className="flex flex-col gap-1 mt-2">
        {items.map(({ text, id }) => {
          const isActive = activeId === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleClick(e, id)}
              className={`flex items-center gap-2 no-underline hover:underline text-sm transition-colors truncate ${
                isActive
                  ? "text-foreground font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span
                className={`shrink-0 size-2 rounded-full transition-opacity ${
                  isActive ? "bg-primary opacity-100" : "opacity-0"
                }`}
              />
              {text}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
