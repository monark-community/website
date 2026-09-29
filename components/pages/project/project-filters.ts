import { Locale } from "@/i18n.config";

/**
 * Query params understood by the projects list (`/[locale]/project`).
 *
 * - `industry`: one industry tag, as written in that locale's content
 * - `keyword`: one keyword tag, as written in that locale's content
 * - `status`: one `ProjectStatus` value (e.g. `planned`)
 * - `q`: free-text search
 *
 * Values are matched case-insensitively against the known tags of the current
 * locale; unknown values are ignored (treated as "all").
 */
export const PROJECT_FILTER_PARAMS = {
  industry: "industry",
  keyword: "keyword",
  status: "status",
  search: "q",
} as const;

export type ProjectListFilters = {
  industry?: string;
  keyword?: string;
  status?: string;
  search?: string;
};

export function projectFiltersToSearchParams(
  filters: ProjectListFilters
): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.industry) params.set(PROJECT_FILTER_PARAMS.industry, filters.industry);
  if (filters.keyword) params.set(PROJECT_FILTER_PARAMS.keyword, filters.keyword);
  if (filters.status) params.set(PROJECT_FILTER_PARAMS.status, filters.status);
  if (filters.search) params.set(PROJECT_FILTER_PARAMS.search, filters.search);
  return params;
}

/** Locale-aware link to the projects list with the given filters applied. */
export function projectListHref(
  locale: Locale,
  filters: ProjectListFilters = {}
): string {
  const query = projectFiltersToSearchParams(filters).toString();
  return `/${locale}/project${query ? `?${query}` : ""}`;
}

/**
 * Returns the canonical spelling of `value` among `known` (case-insensitive),
 * or `undefined` when the value is missing or unknown.
 */
export function matchKnownValue(
  value: string | null | undefined,
  known: Iterable<string>
): string | undefined {
  if (!value) return undefined;
  const needle = value.trim().toLocaleLowerCase();
  if (!needle) return undefined;
  for (const candidate of known) {
    if (candidate.toLocaleLowerCase() === needle) return candidate;
  }
  return undefined;
}

/** Fills `{name}` placeholders in an i18n template. */
export function formatTemplate(
  template: string,
  values: Record<string, string>
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? values[key] : match
  );
}
