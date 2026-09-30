"use client";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

/**
 * State shared by the lists that use the browse bar (projects, news): the
 * view ("browse" = category sections, "filter" = one filtered grid), the
 * URL that carries it, the stuck state of the bar and the category jumps.
 *
 * URL contract:
 * - `view=filter` shows the filtered grid (with or without filters).
 * - Any filter param (the list's own, e.g. `q`, `keyword`, `tag`) also opens
 *   the filtered grid, so links like `/en/project?keyword=DAO` land there.
 * - `view=browse` is only written when switching back to Browse while
 *   filters are still in the URL (they are kept, not applied).
 * - With no view and no filter in the URL, a `#<section>` hash opens Browse;
 *   otherwise the visitor's last chosen view (localStorage) applies.
 */
export type ListView = "browse" | "filter";

export const VIEW_PARAM = "view";

// The fixed site header (h-16) and the browse bar (h-14).
export const HEADER_HEIGHT = 64;
export const BAR_HEIGHT = 56;
// The global scroll-padding-top (5rem), which scroll-margin adds to.
const SCROLL_PADDING = 80;

/**
 * Scroll margin for a category section so that, once jumped to, its top
 * border lands exactly on the bar's bottom border (one line, not two), or
 * `gap` px under the bar for a section without a top border.
 */
export function sectionScrollMargin(gap = -1): number {
  return HEADER_HEIGHT + BAR_HEIGHT + gap - SCROLL_PADDING;
}

const URL_EVENT = "monark:urlchange";

function subscribeToUrl(callback: () => void) {
  window.addEventListener("popstate", callback);
  window.addEventListener(URL_EVENT, callback);
  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener(URL_EVENT, callback);
  };
}

/**
 * The current query string, kept in sync with writeUrl() and back/forward.
 * Empty during server rendering and hydration, so the page prerenders.
 */
export function useLocationSearch(): string {
  return useSyncExternalStore(
    subscribeToUrl,
    () => window.location.search,
    () => ""
  );
}

/**
 * Pushes or replaces the URL without a navigation (Next keeps
 * useSearchParams in sync with the History API) and notifies
 * useLocationSearch().
 */
export function writeUrl(url: string, mode: "push" | "replace") {
  if (mode === "push") window.history.pushState(null, "", url);
  else window.history.replaceState(null, "", url);
  window.dispatchEvent(new Event(URL_EVENT));
}

/** The current path with `params`, without the hash. */
function urlWith(params: URLSearchParams): string {
  const query = params.toString();
  return `${window.location.pathname}${query ? `?${query}` : ""}`;
}

function viewFromParams(
  params: URLSearchParams,
  filterParams: readonly string[]
): ListView | null {
  const explicit = params.get(VIEW_PARAM);
  if (explicit === "filter" || explicit === "browse") return explicit;
  return filterParams.some((param) => params.get(param)) ? "filter" : null;
}

function readStoredView(key: string): ListView | null {
  try {
    const value = window.localStorage.getItem(key);
    return value === "filter" || value === "browse" ? value : null;
  } catch {
    return null;
  }
}

function storeView(key: string, view: ListView) {
  try {
    window.localStorage.setItem(key, view);
  } catch {
    // Private mode or blocked storage: the URL still carries the view.
  }
}

type ListViewOptions = {
  /** The current query string (with or without the leading "?"). */
  search: string;
  /** The list's filter params; any of them in the URL opens Filter. */
  filterParams: readonly string[];
  /** localStorage key for the visitor's last chosen view. */
  storageKey: string;
  /** Prefix of the category section ids (a matching hash opens Browse). */
  sectionPrefix: string;
};

/**
 * The list's view, derived from the URL, with setters that write the URL:
 * `setView` pushes a history entry (back/forward switch views), and
 * `setFilters` replaces the URL (typing doesn't fill the history) and keeps
 * the list in Filter view even when every filter is cleared.
 */
export function useListView({
  search,
  filterParams,
  storageKey,
  sectionPrefix,
}: ListViewOptions) {
  const params = new URLSearchParams(search);
  const view: ListView = viewFromParams(params, filterParams) ?? "browse";

  // No view in the URL: restore the visitor's last view, unless a section
  // hash asks for Browse. Reads the live URL (hydration renders without it).
  const restored = useRef(false);
  useEffect(() => {
    if (restored.current) return;
    restored.current = true;
    const live = new URLSearchParams(window.location.search);
    if (viewFromParams(live, filterParams)) return;
    if (window.location.hash.slice(1).startsWith(sectionPrefix)) return;
    if (readStoredView(storageKey) !== "filter") return;
    live.set(VIEW_PARAM, "filter");
    writeUrl(urlWith(live), "replace");
  }, [filterParams, sectionPrefix, storageKey]);

  const setView = useCallback(
    (next: ListView) => {
      storeView(storageKey, next);
      const live = new URLSearchParams(window.location.search);
      if (next === "filter") live.set(VIEW_PARAM, "filter");
      else if (filterParams.some((param) => live.get(param)))
        live.set(VIEW_PARAM, "browse");
      else live.delete(VIEW_PARAM);
      writeUrl(urlWith(live), "push");
    },
    [filterParams, storageKey]
  );

  const setFilters = useCallback(
    (updates: Record<string, string | undefined>) => {
      const live = new URLSearchParams(window.location.search);
      for (const [param, value] of Object.entries(updates)) {
        if (value) live.set(param, value);
        else live.delete(param);
      }
      live.set(VIEW_PARAM, "filter");
      writeUrl(urlWith(live), "replace");
    },
    []
  );

  return { view, setView, setFilters };
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Whether the bar is stuck under the header: a 1px sentinel just above it
 * leaves the viewport (under the header) exactly when it sticks.
 */
export function useStuck() {
  const [value, setValue] = useState(false);
  const [node, setNode] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) =>
        setValue(
          !entry.isIntersecting &&
            entry.boundingClientRect.top < HEADER_HEIGHT + 1
        ),
      { rootMargin: `-${HEADER_HEIGHT}px 0px 0px 0px`, threshold: 0 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [node]);
  return { value, node, sentinel: setNode };
}

/**
 * The section (by element id) currently under the header and the bar.
 * `lock(ms)` freezes it for a while (during a smooth scroll to a clicked
 * category). Always null when `ids` is empty.
 */
export function useActiveSection(
  ids: readonly string[]
): [string | null, (id: string | null) => void, (ms: number) => void] {
  const [active, setActive] = useState<string | null>(null);
  const lockedUntil = useRef(0);
  const lock = useCallback((ms: number) => {
    lockedUntil.current = Date.now() + ms;
  }, []);
  const key = ids.join("|");

  useEffect(() => {
    const elements = key
      .split("|")
      .filter(Boolean)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (elements.length === 0) {
      setActive(null);
      return;
    }
    if (typeof IntersectionObserver === "undefined") return;
    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.isIntersecting);
        }
        if (Date.now() < lockedUntil.current) return;
        const first = elements.find((el) => visible.get(el.id));
        setActive(first ? first.id : null);
      },
      // A band just under the header and the bar.
      { rootMargin: `-${HEADER_HEIGHT + BAR_HEIGHT + 12}px 0px -55% 0px` }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key]);

  return [active, setActive, lock];
}

/**
 * Smooth scroll to a section (instant under reduced motion); the offset
 * comes from the section's scroll-margin-top. The hash is updated in place,
 * keeping the query string, and the clicked category stays highlighted
 * while the page scrolls past the others.
 */
export function useSectionJump(
  setActive: (id: string | null) => void,
  lockActive: (ms: number) => void
) {
  return useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      const reduced = prefersReducedMotion();
      lockActive(reduced ? 0 : 900);
      setActive(id);
      target.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
      window.history.replaceState(
        window.history.state,
        "",
        `${window.location.pathname}${window.location.search}#${id}`
      );
    },
    [lockActive, setActive]
  );
}
