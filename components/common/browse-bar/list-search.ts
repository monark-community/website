/** Matching helpers shared by the filtered lists (server-safe, no hooks). */

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

/** Lower case without accents, for forgiving search ("equipe" finds "Équipe"). */
export function foldText(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLocaleLowerCase();
}

/** Whether every word of `query` appears somewhere in `haystack`. */
export function matchesQuery(query: string, haystack: string[]): boolean {
  const words = foldText(query).split(/\s+/).filter(Boolean);
  if (words.length === 0) return true;
  const text = foldText(haystack.join(" "));
  return words.every((word) => text.includes(word));
}
