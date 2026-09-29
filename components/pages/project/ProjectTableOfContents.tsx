"use client";

import { useEffect, useRef, useState } from "react";

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
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    window.history.replaceState(null, "", `#${id}`);
  }

  return (
    <div className="mt-8">
      <p className="eyebrow !mb-2 !text-muted-foreground">{label}</p>
      <nav aria-label={label} className="flex flex-col gap-0.5 border-l overflow-visible">
        {items.map(({ text, id }) => {
          const isActive = activeId === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleClick(e, id)}
              aria-current={isActive ? "location" : undefined}
              className={`relative -ml-px border-l-2 py-1 pl-4 text-sm leading-snug no-underline transition-colors duration-150 ${
                isActive
                  ? "border-primary text-foreground font-semibold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {text}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
