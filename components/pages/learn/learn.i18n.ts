/**
 * Learn hub content (en/fr), rendered by the section components in
 * components/pages/learn/sections. Facts come from the participate pages
 * (content/{en,fr}/participate), the docs text (content/{en,fr}/doc), the
 * About page and socials.ts: no invented courses, dates or partners.
 * Copy follows the brand's text budgets ("Restraint", guidelines §8): the
 * photos carry the context, so each card keeps one short line.
 * Photos are listed in docs/assets.md. Keep en and fr equivalent.
 */

export type LearnIconName =
  | "graduation-cap"
  | "code"
  | "factory"
  | "book-open"
  | "check";

export type LearnLink = { label: string; href: string };

export type LearnPhoto = {
  /** Path under public/, e.g. /images/people/learn-….webp. */
  src: string;
  alt: string;
  width: number;
  height: number;
  /** CSS object-position for the fixed-ratio crop. */
  position?: string;
};

export type LearnPath = {
  id: "students" | "developers" | "industry";
  icon: LearnIconName;
  audience: string;
  title: string;
  /** One line, 20 words at most. */
  content: string;
  photo: LearnPhoto;
  link: LearnLink;
  /** Id of an existing news article to read first (content/{en,fr}/news). */
  starter_id: string;
};

export type LearnChannel = {
  /** Social id from components/common/socials/socials.ts. */
  id: "discord" | "youtube";
  title: string;
  content: string;
  label: string;
};

export interface I18n {
  learn_page: {
    meta: { title: string; description: string };
    hero: {
      title: string;
      lead: string;
    };
    paths: {
      eyebrow: string;
      title: string;
      starter_label: string;
      items: LearnPath[];
    };
    news: {
      eyebrow: string;
      title: string;
      see_all: string;
    };
    docs: {
      eyebrow: string;
      title: string;
      content: string;
      primary: LearnLink & { note: string };
      secondary: LearnLink & { note: string };
    };
    community: {
      eyebrow: string;
      title: string;
      channels: LearnChannel[];
    };
    cta: {
      title: string;
      content: string;
      primary: LearnLink;
      secondary: LearnLink;
    };
  };
}

/** Monark docs, as linked from the top navigation (Learn → Docs). */
export const DOCS_URL =
  "https://cliff-eustoma-c04.notion.site/Welcome-to-Monark-2222a891d75180fb8111c92d0b579775";
/** Monark's GitHub organisation (socials.ts). */
export const GITHUB_URL = "https://github.com/monark-community";

// Photos shared by both languages (alt text is per language).
const photos = {
  students: {
    src: "/images/people/learn-students-laughing-laptops.webp",
    width: 1600,
    height: 1067,
    position: "50% 40%",
  },
  developers: {
    src: "/images/people/learn-developers-mentoring-laptop.webp",
    width: 1600,
    height: 1067,
    position: "30% 60%",
  },
  industry: {
    src: "/images/people/learn-workshop-whiteboard.webp",
    width: 1600,
    height: 2401,
    position: "50% 22%",
  },
};

export const en: I18n = {
  learn_page: {
    meta: {
      title: "Learn",
      description:
        "Learn Web3 by building with Monark: paths for students, developers and industry, the latest news, the docs and the community.",
    },
    hero: {
      title: "Learn Web3 by Building Real Projects",
      lead: "Mentors, real projects and resources made with universities. Learn by doing, whatever your starting point.",
    },
    paths: {
      eyebrow: "Learning paths",
      title: "Start from Where You Are",
      starter_label: "Start reading",
      items: [
        {
          id: "students",
          icon: "graduation-cap",
          audience: "Students",
          title: "Your Degree Project, in Web3",
          content:
            "Build your end-of-degree project on a real blockchain use case, mentored by Web3 developers.",
          photo: {
            ...photos.students,
            alt: "Three people laughing together around laptops at a table",
          },
          link: {
            label: "See the university programs",
            href: "/participate/university",
          },
          starter_id: "what-is-web3-really",
        },
        {
          id: "developers",
          icon: "code",
          audience: "Developers",
          title: "From Prototype to Fundable Product",
          content:
            "A 4 to 12 month incubation with sprint mentorship, at no upfront cost. Your project stays yours.",
          photo: {
            ...photos.developers,
            alt: "Three people laughing around a laptop in a library, one leaning in to help",
          },
          link: {
            label: "See the incubation program",
            href: "/participate/developer",
          },
          starter_id: "web3-developer-roadmap-and-resources",
        },
        {
          id: "industry",
          icon: "factory",
          audience: "Industry",
          title: "Explore Web3 at Low Cost",
          content:
            "Share a real challenge. A student-led team builds and tests a proof of concept with your experts.",
          photo: {
            ...photos.industry,
            alt: "Two people mapping out an idea on a whiteboard",
          },
          link: { label: "Partner with Monark", href: "/participate/industry" },
          starter_id: "real-world-web3-use-cases-that-aren-t-just-nfts",
        },
      ],
    },
    news: {
      eyebrow: "News",
      title: "Latest from Monark",
      see_all: "See all news",
    },
    docs: {
      eyebrow: "Docs",
      title: "The Monark Docs",
      content:
        "Guides, tutorials and references, kept up to date with our partners and the Web3 ecosystem.",
      primary: { label: "Open the docs", href: DOCS_URL, note: "On Notion" },
      secondary: {
        label: "Browse the code",
        href: GITHUB_URL,
        note: "Open source on GitHub",
      },
    },
    community: {
      eyebrow: "Community",
      title: "Learn with Others",
      channels: [
        {
          id: "discord",
          title: "Discord",
          content: "Ask questions and meet other builders.",
          label: "Join the Discord",
        },
        {
          id: "youtube",
          title: "YouTube",
          content: "Follow Monark's videos.",
          label: "Visit the channel",
        },
      ],
    },
    cta: {
      title: "Ready to Build?",
      content: "Pick a project to contribute to.",
      primary: { label: "Explore our Web3 projects", href: "/project" },
      secondary: { label: "About Monark", href: "/about" },
    },
  },
};

export const fr: I18n = {
  learn_page: {
    meta: {
      title: "Apprendre",
      description:
        "Apprenez le Web3 en bâtissant avec Monark : des parcours pour les étudiants, les développeurs et l'industrie, les dernières nouvelles, la documentation et la communauté.",
    },
    hero: {
      title: "Apprendre le Web3 en bâtissant de vrais projets",
      lead: "Des mentors, de vrais projets et des ressources conçues avec des universités. Apprenez en faisant, peu importe votre point de départ.",
    },
    paths: {
      eyebrow: "Parcours d'apprentissage",
      title: "Commencez là où vous en êtes",
      starter_label: "Pour commencer",
      items: [
        {
          id: "students",
          icon: "graduation-cap",
          audience: "Étudiants",
          title: "Votre projet de fin d'études, en Web3",
          content:
            "Réalisez votre projet de fin d'études sur un vrai cas d'usage blockchain, avec des mentors Web3.",
          photo: {
            ...photos.students,
            alt: "Trois personnes rient ensemble autour d'ordinateurs portables, attablées",
          },
          link: {
            label: "Voir les programmes universitaires",
            href: "/participate/university",
          },
          starter_id: "what-is-web3-really",
        },
        {
          id: "developers",
          icon: "code",
          audience: "Développeurs",
          title: "Du prototype au produit finançable",
          content:
            "De 4 à 12 mois d'incubation avec mentorat par sprints, sans frais initiaux. Votre projet reste à vous.",
          photo: {
            ...photos.developers,
            alt: "Trois personnes rient autour d'un ordinateur portable dans une bibliothèque, l'une se penche pour aider",
          },
          link: {
            label: "Voir le programme d'incubation",
            href: "/participate/developer",
          },
          starter_id: "web3-developer-roadmap-and-resources",
        },
        {
          id: "industry",
          icon: "factory",
          audience: "Industrie",
          title: "Explorer le Web3 à faible coût",
          content:
            "Soumettez un vrai défi : une équipe étudiante bâtit et teste une preuve de concept avec vos experts.",
          photo: {
            ...photos.industry,
            alt: "Deux personnes schématisent une idée au tableau blanc",
          },
          link: {
            label: "Devenir partenaire de Monark",
            href: "/participate/industry",
          },
          starter_id: "real-world-web3-use-cases-that-aren-t-just-nfts",
        },
      ],
    },
    news: {
      eyebrow: "Nouvelles",
      title: "Les dernières nouvelles de Monark",
      see_all: "Voir toutes les nouvelles",
    },
    docs: {
      eyebrow: "Documentation",
      title: "La documentation Monark",
      content:
        "Guides, tutoriels et références, tenus à jour avec nos partenaires et l'écosystème Web3.",
      primary: {
        label: "Ouvrir la documentation",
        href: DOCS_URL,
        note: "Sur Notion",
      },
      secondary: {
        label: "Parcourir le code",
        href: GITHUB_URL,
        note: "Open source sur GitHub",
      },
    },
    community: {
      eyebrow: "Communauté",
      title: "On apprend mieux ensemble",
      channels: [
        {
          id: "discord",
          title: "Discord",
          content: "Posez vos questions et rencontrez d'autres bâtisseurs.",
          label: "Rejoindre le Discord",
        },
        {
          id: "youtube",
          title: "YouTube",
          content: "Suivez les vidéos de Monark.",
          label: "Voir la chaîne",
        },
      ],
    },
    cta: {
      title: "Prêt à bâtir ?",
      content: "Choisissez un projet auquel contribuer.",
      primary: { label: "Explorer nos projets Web3", href: "/project" },
      secondary: { label: "À propos de Monark", href: "/about" },
    },
  },
};
