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
    top_stories: string;
    all_title: string;
    filter_label: string;
    all_topics: string;
    empty_title: string;
    empty_body: string;
    back_to_learn: string;
  };
  card: {
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
      "Stories, explainers and updates from Monark: what we build with universities and developers, and how Web3 works in practice.",
  },
  list: {
    eyebrow: "Learn",
    title: "News",
    lead: "Stories, explainers and updates from Monark.",
    top_stories: "Top stories",
    all_title: "All news",
    filter_label: "Filter by topic",
    all_topics: "All",
    empty_title: "No news yet",
    empty_body: "Articles will appear here once published.",
    back_to_learn: "Go to the Learn hub",
  },
  card: {
    min_read: (minutes) => `${minutes} min read`,
  },
  article: {
    back: "All news",
    published: "Published",
    by: "By",
    source: "Read the original article",
    share_label: "Share",
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
      "Récits, vulgarisation et nouvelles de Monark : ce que nous bâtissons avec les universités et les développeurs, et comment le Web3 fonctionne concrètement.",
  },
  list: {
    eyebrow: "Apprendre",
    title: "Nouvelles",
    lead: "Récits, vulgarisation et nouvelles de Monark.",
    top_stories: "À la une",
    all_title: "Toutes les nouvelles",
    filter_label: "Filtrer par sujet",
    all_topics: "Tout",
    empty_title: "Aucune nouvelle pour l'instant",
    empty_body: "Les articles paraîtront ici dès leur publication.",
    back_to_learn: "Aller à l'espace Apprendre",
  },
  card: {
    min_read: (minutes) => `${minutes} min de lecture`,
  },
  article: {
    back: "Toutes les nouvelles",
    published: "Publié le",
    by: "Par",
    source: "Lire l'article original",
    share_label: "Partager",
    share_on: (network) => `Partager sur ${network}`,
    copy_link: "Copier le lien",
    copied: "Lien copié",
    more_title: "Autres nouvelles",
    see_all: "Voir toutes les nouvelles",
  },
};

const locales = { en, fr };
export default locales;
