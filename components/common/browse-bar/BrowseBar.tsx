"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { LayoutList, Search, SlidersHorizontal, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Locale } from "@/i18n.config";
import { cn } from "@/lib/utils";
import i18n from "./browse-bar.i18n";
import { HEADER_HEIGHT, ListView, useStuck } from "./list-view";

export type BarFilter = {
  /** URL param written by `onFilter`. */
  key: string;
  /** Short name, shown in the empty trigger ("Industry"). */
  label: string;
  /** First option, clearing the filter ("All industries"). */
  allLabel: string;
  value?: string;
  options: { value: string; label: string }[];
};

export type BarSection = { id: string; label: string };

type Props = {
  locale: Locale;
  view: ListView;
  onViewChange: (view: ListView) => void;
  /** Browse: the category jump links. */
  jumpLabel: string;
  sections: BarSection[];
  activeSection: string | null;
  onJump: (event: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
  /** Filter: search, filters, result count and Clear. */
  search: string;
  onSearch: (value: string) => void;
  searchLabel: string;
  searchPlaceholder: string;
  filters: BarFilter[];
  onFilter: (key: string, value: string | undefined) => void;
  resultLabel: string;
  onClear: () => void;
  /** Spacing above the bar (on its stuck sentinel). */
  className?: string;
};

const ALL = "__all";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background";

/**
 * The sticky bar of the projects and news lists, one row (56px) high under
 * the header: a Browse / Filter switch, then either the category jump links
 * (Browse) or search, filters, the result count and Clear (Filter). Filters
 * sit in the row from `xl`; below that they open in a sheet. The bar is
 * see-through until it sticks; then a full-width layer behind it carries the
 * background, blur and bottom border (the page clips horizontal overflow).
 */
function BrowseBar({
  locale,
  view,
  onViewChange,
  jumpLabel,
  sections,
  activeSection,
  onJump,
  search,
  onSearch,
  searchLabel,
  searchPlaceholder,
  filters,
  onFilter,
  resultLabel,
  onClear,
  className,
}: Props) {
  const t = i18n[locale] ?? i18n.en;
  const stuck = useStuck();

  // A new view starts at the top of the list: when the bar is stuck, bring
  // the list back up so the bar sits where it sticks.
  const shownView = useRef(view);
  useLayoutEffect(() => {
    if (shownView.current === view) return;
    shownView.current = view;
    const sentinel = stuck.node;
    if (!sentinel) return;
    const top =
      sentinel.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
    if (window.scrollY > top) window.scrollTo({ top, behavior: "auto" });
  }, [view, stuck.node]);

  const activeCount = filters.filter((filter) => filter.value).length;
  const hasActive = activeCount > 0 || search.length > 0;

  return (
    <>
      {/* Scrolls under the header exactly when the bar sticks. */}
      <div ref={stuck.sentinel} aria-hidden="true" className={cn("h-px", className)} />
      <div
        data-stuck={stuck.value ? "true" : "false"}
        className="sticky top-16 z-30 before:absolute before:inset-y-0 before:left-1/2 before:-z-10 before:w-screen before:-translate-x-1/2 before:border-b before:border-transparent before:transition-[background-color,border-color] before:duration-200 before:ease-out data-[stuck=true]:before:border-border data-[stuck=true]:before:bg-background/90 data-[stuck=true]:before:backdrop-blur-md"
      >
        <div className="flex h-14 items-center gap-2 sm:gap-3">
          <ViewSwitch
            label={t.view_label}
            view={view}
            onChange={onViewChange}
            labels={{ browse: t.browse, filter: t.filter }}
          />
          <span aria-hidden="true" className="h-6 w-px shrink-0 bg-border" />

          {view === "browse" ? (
            <JumpLinks
              label={jumpLabel}
              sections={sections}
              active={activeSection}
              onJump={onJump}
            />
          ) : (
            <div
              role="search"
              aria-label={searchLabel}
              className="flex min-w-0 flex-1 items-center gap-2"
            >
              <SearchField
                value={search}
                onChange={onSearch}
                label={searchLabel}
                placeholder={searchPlaceholder}
                clearLabel={t.clear_search}
                className="min-w-0 flex-1 xl:max-w-[17rem]"
              />
              <div className="hidden items-center gap-2 xl:flex">
                {filters.map((filter) => (
                  <FilterSelect
                    key={filter.key}
                    filter={filter}
                    onFilter={onFilter}
                    className="max-w-[11rem]"
                  />
                ))}
              </div>
              <FiltersSheet
                t={t}
                filters={filters}
                onFilter={onFilter}
                activeCount={activeCount}
                hasActive={hasActive}
                onClear={onClear}
                resultLabel={resultLabel}
              />
              <p
                role="status"
                aria-live="polite"
                className="sr-only md:not-sr-only md:ml-auto md:shrink-0 md:whitespace-nowrap md:text-sm md:font-semibold md:text-muted-foreground"
              >
                {resultLabel}
              </p>
              {hasActive && (
                <button
                  type="button"
                  onClick={onClear}
                  className={cn(
                    "hidden h-10 shrink-0 items-center rounded-full px-3 text-sm font-semibold text-primary-ink transition-colors duration-150 hover:bg-secondary md:inline-flex",
                    focusRing
                  )}
                >
                  {t.clear}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/**
 * Two-option segmented switch, as a radio group: arrow keys move and select
 * (like native radios), Tab reaches the selected option only.
 */
function ViewSwitch({
  label,
  view,
  onChange,
  labels,
}: {
  label: string;
  view: ListView;
  onChange: (view: ListView) => void;
  labels: Record<ListView, string>;
}) {
  const options: { value: ListView; icon: React.ElementType }[] = [
    { value: "browse", icon: LayoutList },
    { value: "filter", icon: SlidersHorizontal },
  ];
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key))
      return;
    event.preventDefault();
    const next: ListView = view === "browse" ? "filter" : "browse";
    onChange(next);
    refs.current[next]?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label={label}
      onKeyDown={onKeyDown}
      className="inline-flex h-10 shrink-0 items-center rounded-full bg-muted p-1"
    >
      {options.map(({ value, icon: Icon }) => {
        const checked = view === value;
        return (
          <button
            key={value}
            ref={(node) => {
              refs.current[value] = node;
            }}
            type="button"
            role="radio"
            aria-checked={checked}
            tabIndex={checked ? 0 : -1}
            onClick={() => !checked && onChange(value)}
            className={cn(
              "inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-full px-3 text-sm font-semibold transition-colors duration-150",
              focusRing,
              checked
                ? "bg-card text-foreground shadow-sm ring-1 ring-border"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon aria-hidden="true" className="hidden size-4 sm:block" />
            {labels[value]}
          </button>
        );
      })}
    </div>
  );
}

/** Category jump links; the current one stays in view in the scrollable row. */
function JumpLinks({
  label,
  sections,
  active,
  onJump,
}: {
  label: string;
  sections: BarSection[];
  active: string | null;
  onJump: (event: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
}) {
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const row = list.current;
    if (!row) return;
    const link = row.querySelector<HTMLElement>("[aria-current]");
    if (!link) {
      row.scrollTo({ left: 0 });
      return;
    }
    const left = link.offsetLeft - (row.clientWidth - link.offsetWidth) / 2;
    row.scrollTo({ left: Math.max(0, left) });
  }, [active]);

  return (
    <nav aria-label={label} className="-mr-4 min-w-0 flex-1 sm:-mr-1">
      {/* Scrolls to the screen edge on phones. */}
      <ul
        ref={list}
        className="relative m-0 flex h-14 list-none items-center gap-1 overflow-x-auto p-0 pr-4 [scrollbar-width:none] sm:pr-1 [&::-webkit-scrollbar]:hidden"
      >
        {sections.map(({ id, label: title }) => {
          const current = active === id;
          return (
            <li key={id} className="m-0 shrink-0">
              <a
                href={`#${id}`}
                onClick={(event) => onJump(event, id)}
                aria-current={current ? "true" : undefined}
                className={cn(
                  "inline-flex h-10 items-center whitespace-nowrap rounded-full px-4 text-sm font-semibold no-underline transition-colors duration-150",
                  focusRing,
                  current
                    ? "bg-foreground text-background"
                    : "text-foreground hover:bg-secondary"
                )}
              >
                {title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/**
 * Search input with a clear button. Keeps its own draft so typing is never
 * interrupted while the URL follows; outside changes (Clear, back/forward)
 * flow back in.
 */
function SearchField({
  value,
  onChange,
  label,
  placeholder,
  clearLabel,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder: string;
  clearLabel: string;
  className?: string;
}) {
  const [draft, setDraft] = useState(value);
  const sent = useRef(value);
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (value !== sent.current) {
      sent.current = value;
      setDraft(value);
    }
  }, [value]);
  const update = (next: string) => {
    sent.current = next;
    setDraft(next);
    onChange(next);
  };

  return (
    <div className={cn("relative", className)}>
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <input
        ref={input}
        type="search"
        value={draft}
        onChange={(event) => update(event.target.value)}
        placeholder={placeholder}
        aria-label={label}
        enterKeyHint="search"
        className={cn(
          "h-10 w-full rounded-full border border-input bg-card pl-10 text-base text-foreground placeholder:text-muted-foreground md:text-sm [&::-webkit-search-cancel-button]:appearance-none",
          draft ? "pr-10" : "pr-4",
          focusRing
        )}
      />
      {draft && (
        <button
          type="button"
          onClick={() => {
            update("");
            input.current?.focus();
          }}
          aria-label={clearLabel}
          className={cn(
            "absolute right-1 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors duration-150 hover:bg-secondary hover:text-foreground",
            focusRing
          )}
        >
          <X aria-hidden="true" className="size-4" />
        </button>
      )}
    </div>
  );
}

/** A compact filter select: the short label when empty, the value when set. */
function FilterSelect({
  filter,
  onFilter,
  className,
}: {
  filter: BarFilter;
  onFilter: (key: string, value: string | undefined) => void;
  className?: string;
}) {
  return (
    <Select
      value={filter.value ?? ""}
      onValueChange={(value) =>
        onFilter(filter.key, value === ALL ? undefined : value)
      }
    >
      <SelectTrigger
        aria-label={filter.label}
        className={cn(
          "h-10 w-auto min-w-0 gap-1.5 rounded-full px-3.5",
          filter.value && "border-foreground font-semibold text-foreground",
          className
        )}
      >
        <SelectValue placeholder={filter.label} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ALL}>{filter.allLabel}</SelectItem>
        {filter.options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

/**
 * Below `xl`, the filters open in a sheet (a bottom sheet on phones, a
 * centred panel from `sm`); the button shows how many are active.
 */
function FiltersSheet({
  t,
  filters,
  onFilter,
  activeCount,
  hasActive,
  onClear,
  resultLabel,
}: {
  t: (typeof i18n)["en"];
  filters: BarFilter[];
  onFilter: (key: string, value: string | undefined) => void;
  activeCount: number;
  hasActive: boolean;
  onClear: () => void;
  resultLabel: string;
}) {
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger
        aria-label={activeCount > 0 ? t.filters_active(activeCount) : t.filters}
        className={cn(
          "inline-flex h-10 shrink-0 items-center gap-2 rounded-full border border-input bg-card px-3 text-sm font-semibold text-foreground transition-colors duration-150 hover:bg-secondary sm:px-4 xl:hidden",
          activeCount > 0 && "border-foreground",
          focusRing
        )}
      >
        <SlidersHorizontal aria-hidden="true" className="size-4" />
        <span className="hidden sm:inline">{t.filters}</span>
        {activeCount > 0 && (
          <span
            aria-hidden="true"
            className="inline-flex size-5 items-center justify-center rounded-full bg-foreground text-[0.6875rem] font-bold text-background"
          >
            {activeCount}
          </span>
        )}
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className="fixed inset-x-0 bottom-0 z-50 max-h-[85dvh] overflow-y-auto rounded-t-3xl border bg-card p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-lg shadow-black/10 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 motion-safe:data-[state=open]:slide-in-from-bottom-8 sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:w-full sm:max-w-md sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-3xl sm:pb-6 motion-safe:sm:data-[state=open]:slide-in-from-bottom-0 motion-safe:sm:data-[state=open]:zoom-in-95"
        >
          <div className="flex items-center justify-between gap-4">
            <DialogPrimitive.Title className="text-xl font-bold">
              {t.filters}
            </DialogPrimitive.Title>
            <DialogPrimitive.Close
              aria-label={t.done}
              className={cn(
                "-mr-2 inline-flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors duration-150 hover:bg-secondary hover:text-foreground",
                focusRing
              )}
            >
              <X aria-hidden="true" className="size-5" />
            </DialogPrimitive.Close>
          </div>
          <div className="mt-5 grid gap-4">
            {filters.map((filter) => (
              <div key={filter.key} className="grid gap-1.5">
                <span aria-hidden="true" className="text-sm font-semibold text-foreground">
                  {filter.label}
                </span>
                <FilterSelect filter={filter} onFilter={onFilter} className="w-full max-w-none justify-between" />
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-2">
            <p className="m-0 mr-auto text-sm font-semibold text-muted-foreground">
              {resultLabel}
            </p>
            {hasActive && (
              <button
                type="button"
                onClick={onClear}
                className={cn(
                  "inline-flex h-10 items-center rounded-full px-4 text-sm font-semibold text-primary-ink transition-colors duration-150 hover:bg-secondary",
                  focusRing
                )}
              >
                {t.clear}
              </button>
            )}
            <DialogPrimitive.Close
              className={cn(
                "inline-flex h-10 items-center rounded-full bg-foreground px-5 text-sm font-semibold text-background transition-colors duration-150 hover:bg-foreground/85",
                focusRing
              )}
            >
              {t.done}
            </DialogPrimitive.Close>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export default BrowseBar;
