"use client";
import React, { useId, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Locale } from "@/i18n.config";
import { cn } from "@/lib/utils";
import { ProjectListFilters, formatTemplate } from "./project-filters";
import i18n from "./projects-list.i18n";

export type FilterSelect = {
  key: Exclude<keyof ProjectListFilters, "search">;
  label: string;
  allLabel: string;
  value?: string;
  options: { value: string; label: string }[];
};

type Props = {
  locale: Locale;
  search: string;
  onSearch: (value: string) => void;
  selects: FilterSelect[];
  onSelect: (key: FilterSelect["key"], value: string) => void;
  onClear: () => void;
  resultCount: number;
  /** Category jump links, shown beside the count while no filter is active. */
  categoryNav?: React.ReactNode;
  /** The sticky bar element, measured by the list for scroll offsets. */
  barRef?: React.Ref<HTMLDivElement>;
};

const pillClass =
  "inline-flex h-8 shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-3 text-xs font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

/**
 * Sticky, compact filter bar: search, the four filter selects (behind a
 * "Filters" toggle below `lg`), the result count, and either removable pills
 * for the active filters or, unfiltered, the category jump links.
 */
function ProjectFilterBar({
  locale,
  search,
  onSearch,
  selects,
  onSelect,
  onClear,
  resultCount,
  categoryNav,
  barRef,
}: Props) {
  const t = i18n[locale];
  const panelId = useId();
  const [panelOpen, setPanelOpen] = useState(false);

  const activeSelects = selects.filter((select) => select.value);
  const activeCount = activeSelects.length;
  const hasActiveFilters = activeCount > 0 || search.length > 0;

  const countLabel = formatTemplate(
    resultCount === 1 ? t.results_count_one : t.results_count_other,
    { count: String(resultCount) }
  );

  return (
    <div
      ref={barRef}
      className="sticky top-16 z-30 border-y bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/80"
    >
      <div className="site-container py-3">
        <div className="flex flex-wrap items-center gap-2 lg:flex-nowrap">
          <div className="relative min-w-0 flex-1">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder={t.search_placeholder}
              aria-label={t.search_placeholder}
              className="h-10 w-full rounded-full border border-input bg-card pl-10 pr-4 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background md:text-sm"
            />
          </div>
          <button
            type="button"
            aria-expanded={panelOpen}
            aria-controls={panelId}
            onClick={() => setPanelOpen((open) => !open)}
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full border border-input bg-card px-4 text-sm font-semibold text-foreground transition-colors duration-150 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
          >
            <SlidersHorizontal aria-hidden="true" className="size-4" />
            {t.filters}
            {activeCount > 0 && (
              <span className="inline-flex size-5 items-center justify-center rounded-full bg-foreground text-[0.6875rem] font-bold text-background">
                {activeCount}
              </span>
            )}
          </button>
          <div
            id={panelId}
            className={cn(
              panelOpen ? "grid" : "hidden",
              "w-full grid-cols-2 gap-2 lg:flex lg:w-auto"
            )}
          >
            {selects.map((select) => (
              <Select
                key={select.key}
                value={select.value ?? "all"}
                onValueChange={(value) => onSelect(select.key, value)}
              >
                <SelectTrigger
                  aria-label={select.label}
                  className={cn(
                    "h-10 min-w-0 gap-1.5 rounded-full px-4 lg:w-[10.5rem] xl:w-[12rem]",
                    select.value && "border-foreground font-semibold"
                  )}
                >
                  <SelectValue placeholder={select.label} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{select.allLabel}</SelectItem>
                  {select.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}
          </div>
        </div>

        <div
          className={cn(
            "mt-2 flex min-h-8 items-center gap-1.5",
            hasActiveFilters || !categoryNav ? "flex-wrap" : "flex-nowrap"
          )}
        >
          <p
            role="status"
            aria-live="polite"
            className="mr-1 shrink-0 whitespace-nowrap text-sm font-semibold text-muted-foreground"
          >
            {countLabel}
          </p>
          {activeSelects.map((select) => {
            const label =
              select.options.find((option) => option.value === select.value)
                ?.label ?? select.value!;
            return (
              <button
                key={select.key}
                type="button"
                onClick={() => onSelect(select.key, "all")}
                aria-label={formatTemplate(t.remove_filter, { label })}
                className={cn(pillClass, "bg-foreground text-background hover:bg-foreground/85")}
              >
                {label}
                <X aria-hidden="true" className="size-3.5" />
              </button>
            );
          })}
          {search && (
            <button
              type="button"
              onClick={() => onSearch("")}
              aria-label={formatTemplate(t.remove_filter, { label: search })}
              className={cn(pillClass, "max-w-[12rem] bg-foreground text-background hover:bg-foreground/85")}
            >
              <span className="truncate">{formatTemplate(t.search_chip, { q: search })}</span>
              <X aria-hidden="true" className="size-3.5 shrink-0" />
            </button>
          )}
          {!hasActiveFilters && categoryNav}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClear}
              className={cn(pillClass, "ml-auto text-primary-ink hover:bg-secondary")}
            >
              {t.clear_filters}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectFilterBar;
