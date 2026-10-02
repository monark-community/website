import { Locale } from "@/i18n.config";

/** Lucide icon names (kebab case) used by the support list. */
export type SupportIconName =
  | "blocks"
  | "users"
  | "message-circle"
  | "calendar-sync"
  | "palette"
  | "book-open"
  | "wallet"
  | "layout-template";

export interface SupportItem {
  icon: SupportIconName;
  title: string;
  description: string;
}

export interface ProjectPageI18n {
  on_this_page: string;
  introduction: string;
  overview: string;
  key_features: string;
  use_cases: string;
  roadmap: string;
  resources: string;
  support: string;
  industries: string;
  keywords: string;
  contributors: string;

  hero: {
    try_demo: string;
    view_source: string;
    invested_by_monark: string;
    progress: string;
    /** "{done} of {total} phases delivered" */
    progress_value: string;
    contributors: string;
    no_contributors: string;
  };

  carousel: {
    region: string;
    previous: string;
    next: string;
    /** "Screenshot {n} of {total}" */
    slide: string;
  };

  roadmap_labels: {
    done: string;
    current: string;
    upcoming: string;
    now: string;
    /** "{done} of {total} phases delivered" */
    progress: string;
    /** "{n} in progress" */
    in_progress: string;
    phase: string;
    select_hint: string;
  };

  resources_labels: {
    groups: { business: string; product: string; builders: string };
    /** "{n} documents are reserved for Monark members" */
    banner_title: string;
    banner_body: string;
    banner_cta: string;
    sign_in: string;
    open: string;
    locked: string;
    kickstart_title: string;
    kickstart_description: string;
    kickstart_format: string;
    kickstart_open: string;
    kickstart_default_intro: string;
  };

  support_labels: {
    title: string;
    intro: string;
    /** Caption under the amount: "invested by Monark in {name} so far" */
    investment: string;
    items: SupportItem[];
  };
}

const en: ProjectPageI18n = {
  on_this_page: "On this page",
  introduction: "Introduction",
  overview: "Overview",
  key_features: "Key features",
  use_cases: "Who it's for",
  roadmap: "Roadmap",
  resources: "Resources",
  support: "Monark support",
  industries: "Industries",
  keywords: "Keywords",
  contributors: "Contributors",

  hero: {
    try_demo: "Try the demo",
    view_source: "View source",
    invested_by_monark: "Invested by Monark",
    progress: "Roadmap",
    progress_value: "{done} of {total} phases delivered",
    contributors: "Contributors",
    no_contributors: "Looking for a team",
  },

  carousel: {
    region: "Product screenshots",
    previous: "Previous screenshot",
    next: "Next screenshot",
    slide: "Screenshot {n} of {total}",
  },

  roadmap_labels: {
    done: "Delivered",
    current: "In progress",
    upcoming: "Planned",
    now: "Now",
    progress: "{done} of {total} phases delivered",
    in_progress: "{n} in progress",
    phase: "Phase",
    select_hint: "Select a phase to see what it covers.",
  },

  resources_labels: {
    groups: {
      business: "Business",
      product: "Product and technology",
      builders: "For builders",
    },
    banner_title: "{n} documents are reserved for Monark members",
    banner_body: "Sign in to the Monark app to read the business plan, decks and technical documents.",
    banner_cta: "Sign in to unlock",
    sign_in: "Sign in to view",
    open: "Open",
    locked: "locked",
    kickstart_title: "Project kickstart",
    kickstart_description: "The developer environment, tools and accounts a team needs to start building.",
    kickstart_format: "Guide",
    kickstart_open: "Read the guide",
    kickstart_default_intro: "Everything a team needs on day one to start building this project with Monark.",
  },

  support_labels: {
    title: "How Monark supports this project",
    intro: "Monark works alongside the team that builds this project, from onboarding to a working product.",
    investment: "invested by Monark in {name} so far",
    items: [
      { icon: "blocks", title: "Blockchain expertise", description: "Guidance on blockchain architecture and smart contract development." },
      { icon: "users", title: "Onboarding", description: "The current team onboards newcomers and hands over what it knows." },
      { icon: "calendar-sync", title: "Sprint meetings", description: "Sprint meetings twice a month with the CTO or COO to plan and unblock the work." },
      { icon: "message-circle", title: "Dedicated Discord", description: "A Discord server for day-to-day questions and coordination." },
      { icon: "palette", title: "UI/UX guidance", description: "Design reviews and direction from the CTO, plus Monark's own tooling." },
      { icon: "layout-template", title: "Starter templates", description: "Frontend and backend starters with wallet integration already wired in." },
      { icon: "wallet", title: "Funded wallets", description: "Monark-funded wallets to pay for on-chain operations." },
      { icon: "book-open", title: "Documentation", description: "Guides that teach the blockchain concepts the project relies on." },
    ],
  },
};

const fr: ProjectPageI18n = {
  on_this_page: "Sur cette page",
  introduction: "Introduction",
  overview: "Aperçu",
  key_features: "Fonctionnalités clés",
  use_cases: "Pour qui",
  roadmap: "Feuille de route",
  resources: "Ressources",
  support: "Soutien de Monark",
  industries: "Industries",
  keywords: "Mots-clé",
  contributors: "Contributeurs",

  hero: {
    try_demo: "Essayer la démo",
    view_source: "Voir le code",
    invested_by_monark: "Investi par Monark",
    progress: "Feuille de route",
    progress_value: "{done} phase(s) livrée(s) sur {total}",
    contributors: "Contributeurs",
    no_contributors: "À la recherche d'une équipe",
  },

  carousel: {
    region: "Captures d'écran du produit",
    previous: "Capture précédente",
    next: "Capture suivante",
    slide: "Capture {n} sur {total}",
  },

  roadmap_labels: {
    done: "Livrée",
    current: "En cours",
    upcoming: "Planifiée",
    now: "Maintenant",
    progress: "{done} phase(s) livrée(s) sur {total}",
    in_progress: "{n} en cours",
    phase: "Phase",
    select_hint: "Sélectionnez une phase pour voir ce qu'elle couvre.",
  },

  resources_labels: {
    groups: {
      business: "Affaires",
      product: "Produit et technologie",
      builders: "Pour les équipes",
    },
    banner_title: "{n} documents sont réservés aux membres Monark",
    banner_body: "Connectez-vous à l'app Monark pour lire le plan d'affaires, les présentations et les documents techniques.",
    banner_cta: "Se connecter",
    sign_in: "Se connecter pour consulter",
    open: "Ouvrir",
    locked: "verrouillé",
    kickstart_title: "Démarrage du projet",
    kickstart_description: "L'environnement de développement, les outils et les accès nécessaires pour commencer.",
    kickstart_format: "Guide",
    kickstart_open: "Lire le guide",
    kickstart_default_intro: "Tout ce dont une équipe a besoin dès le premier jour pour réaliser ce projet avec Monark.",
  },

  support_labels: {
    title: "Comment Monark soutient ce projet",
    intro: "Monark accompagne l'équipe qui réalise ce projet, de l'intégration jusqu'à un produit fonctionnel.",
    investment: "investis par Monark dans {name} jusqu'à présent",
    items: [
      { icon: "blocks", title: "Expertise blockchain", description: "Des conseils en architecture blockchain et en développement de contrats intelligents." },
      { icon: "users", title: "Intégration", description: "L'équipe actuelle accueille les nouveaux membres et leur transmet ses connaissances." },
      { icon: "calendar-sync", title: "Rencontres de sprint", description: "Deux rencontres de sprint par mois avec le CTO ou le COO pour planifier et débloquer le travail." },
      { icon: "message-circle", title: "Discord dédié", description: "Un serveur Discord pour les questions et la coordination au quotidien." },
      { icon: "palette", title: "Conseils UI/UX", description: "Revues de design et orientation par le CTO, ainsi que les outils de Monark." },
      { icon: "layout-template", title: "Modèles de départ", description: "Des bases frontend et backend avec l'intégration de portefeuille déjà en place." },
      { icon: "wallet", title: "Portefeuilles financés", description: "Des portefeuilles financés par Monark pour les opérations sur la blockchain." },
      { icon: "book-open", title: "Documentation", description: "Des guides sur les notions blockchain dont le projet a besoin." },
    ],
  },
};

const locales: Record<Locale, ProjectPageI18n> = { en, fr };
export default locales;
