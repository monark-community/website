/**
 * Strings for the news list (/learn/news) and the article page
 * (/learn/news/[id]). Article text itself lives in content/{en,fr}/news.
 * Keep en and fr equivalent.
 */
export interface NewsI18n {
  meta: { title: string; description: string };
  list: {
    eyebrow: string;
    title: string;
    lead: string;
    featured_label: string;
    search_label: string;
    search_placeholder: string;
    count: (n: number) => string;
    empty_search_title: (query: string) => string;
    empty_search_body: string;
    clear_search: string;
    empty_title: string;
    empty_body: string;
    back_to_learn: string;
  };
  card: {
    read_more: string;
    min_read: (minutes: number) => string;
  };
  article: {
    back: string;
    published: string;
    by: string;
    source: string;
    share_label: string;
    share_on: (network: string) => string;
    copy_link: string;
    copied: string;
    more_title: string;
    see_all: string;
  };
}

export const en: NewsI18n = {
  meta: {
    title: "News",
    description:
      "Stories, explainers and updates from Monark: what we build with universities and developers, why it matters, and how Web3 works in practice.",
  },
  list: {
    eyebrow: "Learn",
    title: "News",
    lead: "Stories, explainers and updates from Monark: what we build, why it matters, and how Web3 works in practice.",
    featured_label: "Latest",
    search_label: "Search news",
    search_placeholder: "Search by title or tag",
    count: (n) => (n === 1 ? "1 article" : `${n} articles`),
    empty_search_title: (query) => `No news matches “${query}”`,
    empty_search_body:
      "Try another word, or clear the search to see every article.",
    clear_search: "Clear search",
    empty_title: "No news yet",
    empty_body:
      "Articles will appear here as soon as they are published. In the meantime, the Learn hub has paths and resources to get you started.",
    back_to_learn: "Go to the Learn hub",
  },
  card: {
    read_more: "Read the article",
    min_read: (minutes) => `${minutes} min read`,
  },
  article: {
    back: "All news",
    published: "Published",
    by: "By",
    source: "Read the original article",
    share_label: "Share this article",
    share_on: (network) => `Share on ${network}`,
    copy_link: "Copy link",
    copied: "Link copied",
    more_title: "More news",
    see_all: "See all news",
  },
};

export const fr: NewsI18n = {
  meta: {
    title: "Nouvelles",
    description:
      "Récits, vulgarisation et nouvelles de Monark : ce que nous bâtissons avec les universités et les développeurs, pourquoi c'est important et comment le Web3 fonctionne concrètement.",
  },
  list: {
    eyebrow: "Apprendre",
    title: "Nouvelles",
    lead: "Récits, vulgarisation et nouvelles de Monark : ce que nous bâtissons, pourquoi c'est important et comment le Web3 fonctionne concrètement.",
    featured_label: "À la une",
    search_label: "Rechercher dans les nouvelles",
    search_placeholder: "Rechercher par titre ou par étiquette",
    count: (n) => (n <= 1 ? `${n} article` : `${n} articles`),
    empty_search_title: (query) => `Aucune nouvelle ne correspond à « ${query} »`,
    empty_search_body:
      "Essayez un autre mot, ou effacez la recherche pour voir tous les articles.",
    clear_search: "Effacer la recherche",
    empty_title: "Aucune nouvelle pour l'instant",
    empty_body:
      "Les articles paraîtront ici dès leur publication. D'ici là, l'espace Apprendre propose des parcours et des ressources pour vous lancer.",
    back_to_learn: "Aller à l'espace Apprendre",
  },
  card: {
    read_more: "Lire l'article",
    min_read: (minutes) => `${minutes} min de lecture`,
  },
  article: {
    back: "Toutes les nouvelles",
    published: "Publié le",
    by: "Par",
    source: "Lire l'article original",
    share_label: "Partager cet article",
    share_on: (network) => `Partager sur ${network}`,
    copy_link: "Copier le lien",
    copied: "Lien copié",
    more_title: "Autres nouvelles",
    see_all: "Voir toutes les nouvelles",
  },
};

const locales = { en, fr };
export default locales;
