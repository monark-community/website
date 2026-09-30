/** Strings for the browse bar shared by the projects and news lists. */
export interface BrowseBarI18n {
  view_label: string;
  browse: string;
  filter: string;
  filters: string;
  filters_active: (count: number) => string;
  clear: string;
  clear_search: string;
  done: string;
}

const en: BrowseBarI18n = {
  view_label: "View",
  browse: "Browse",
  filter: "Filter",
  filters: "Filters",
  filters_active: (count) => `Filters, ${count} active`,
  clear: "Clear",
  clear_search: "Clear search",
  done: "Done",
};

const fr: BrowseBarI18n = {
  view_label: "Affichage",
  browse: "Parcourir",
  filter: "Filtrer",
  filters: "Filtres",
  filters_active: (count) =>
    `Filtres, ${count} ${count > 1 ? "actifs" : "actif"}`,
  clear: "Effacer",
  clear_search: "Effacer la recherche",
  done: "Terminé",
};

const locales = { en, fr };
export default locales;
