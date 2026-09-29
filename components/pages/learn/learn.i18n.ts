/**
 * Learn hub content (en/fr), rendered by the section components in
 * components/pages/learn/sections. Facts come from the participate pages
 * (content/{en,fr}/participate), the docs text (content/{en,fr}/doc), the
 * About page and socials.ts: no invented courses, dates or partners.
 * Icons are Lucide names resolved in learn-icon.tsx. Keep en and fr
 * equivalent.
 */

export type LearnIconName =
  | "graduation-cap"
  | "code"
  | "factory"
  | "book-open"
  | "check";

export type LearnLink = { label: string; href: string };

export type LearnPath = {
  id: "students" | "developers" | "industry";
  icon: LearnIconName;
  audience: string;
  title: string;
  content: string;
  points: string[];
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
      eyebrow: string;
      title: string;
      lead: string;
      jump_label: string;
      jump: LearnLink[];
    };
    paths: {
      eyebrow: string;
      title: string;
      intro: string;
      starter_label: string;
      items: LearnPath[];
    };
    news: {
      eyebrow: string;
      title: string;
      intro: string;
      see_all: string;
    };
    docs: {
      eyebrow: string;
      title: string;
      content: string;
      points: string[];
      primary: LearnLink & { note: string };
      secondary: LearnLink & { note: string };
    };
    community: {
      eyebrow: string;
      title: string;
      intro: string;
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

export const en: I18n = {
  learn_page: {
    meta: {
      title: "Learn",
      description:
        "Learn Web3 by building with Monark: learning paths for students, developers and industry, the latest news and explainers, the docs and the community.",
    },
    hero: {
      eyebrow: "Learn",
      title: "Learn Web3 by building real projects",
      lead: "Web3 is hard to learn alone. Monark pairs mentorship and learning resources, made with universities, with real projects, so you learn by doing, whatever your starting point.",
      jump_label: "On this page",
      jump: [
        { label: "Learning paths", href: "#paths" },
        { label: "News", href: "#news" },
        { label: "Docs", href: "#docs" },
        { label: "Community", href: "#community" },
      ],
    },
    paths: {
      eyebrow: "Learning paths",
      title: "Start from where you are",
      intro:
        "Three ways in, depending on who you are. Each one leads to a concrete way to take part.",
      starter_label: "Start reading",
      items: [
        {
          id: "students",
          icon: "graduation-cap",
          audience: "Students",
          title: "Turn your degree project into a Web3 project",
          content:
            "Build your end-of-degree project on a real blockchain use case, with mentorship from Web3 developers and a mandate approved with your professors.",
          points: [
            "End-of-degree projects with community or industry impact",
            "Help to start or grow a blockchain association on campus",
            "An incubation program to keep building after graduation",
          ],
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
          title: "Take your idea from prototype to fundable product",
          content:
            "Join the incubation program: 4 to 12 month cycles with technical guidance, at no upfront cost, and you keep full ownership of your project.",
          points: [
            "Sprint-based mentorship, goal setting and reviews",
            "Workshops on tokenomics, governance and product design",
            "Preparation for grants from Web3 foundations",
          ],
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
          title: "Explore Web3 for your sector, at low cost",
          content:
            "Share a real challenge. Monark assembles a student-led team to co-develop and test a decentralized proof of concept with your experts.",
          points: [
            "Proofs of concept at a fraction of traditional R&D costs",
            "Access to motivated students and young developers",
            "A path to scale promising ideas into full projects",
          ],
          link: { label: "Partner with Monark", href: "/participate/industry" },
          starter_id: "real-world-web3-use-cases-that-aren-t-just-nfts",
        },
      ],
    },
    news: {
      eyebrow: "News",
      title: "Latest from Monark",
      intro: "Explainers, updates and stories from Monark and its community.",
      see_all: "See all news",
    },
    docs: {
      eyebrow: "Docs",
      title: "The Monark docs",
      content:
        "Guides, tutorials and references in one place, kept up to date with contributions from our partners and the wider Web3 ecosystem.",
      points: [
        "Curated guides for popular Web3 tools and SDKs",
        "Step-by-step tutorials for common smart contract patterns",
        "Best practices for Web3 UX, governance, security and scaling",
      ],
      primary: { label: "Open the docs", href: DOCS_URL, note: "On Notion" },
      secondary: {
        label: "Browse the code",
        href: GITHUB_URL,
        note: "Open-source repositories on GitHub",
      },
    },
    community: {
      eyebrow: "Community",
      title: "Learn with others",
      intro:
        "Questions are easier with people around. Join the conversation, or follow along on video.",
      channels: [
        {
          id: "discord",
          title: "Discord",
          content:
            "Ask questions, meet other builders and follow what the community is working on.",
          label: "Join the Discord",
        },
        {
          id: "youtube",
          title: "YouTube",
          content: "Subscribe to Monark's channel to follow our videos.",
          label: "Visit the YouTube channel",
        },
      ],
    },
    cta: {
      title: "Ready to build?",
      content:
        "Pick a project to contribute to, or find out more about who we are.",
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
      eyebrow: "Apprendre",
      title: "Apprendre le Web3 en bâtissant de vrais projets",
      lead: "Le Web3 est difficile à apprendre seul. Monark associe du mentorat et des ressources éducatives, conçues avec des universités, à de vrais projets : vous apprenez en faisant, peu importe votre point de départ.",
      jump_label: "Sur cette page",
      jump: [
        { label: "Parcours", href: "#paths" },
        { label: "Nouvelles", href: "#news" },
        { label: "Documentation", href: "#docs" },
        { label: "Communauté", href: "#community" },
      ],
    },
    paths: {
      eyebrow: "Parcours d'apprentissage",
      title: "Commencez là où vous en êtes",
      intro:
        "Trois portes d'entrée selon votre profil. Chacune mène à une façon concrète de participer.",
      starter_label: "Pour commencer",
      items: [
        {
          id: "students",
          icon: "graduation-cap",
          audience: "Étudiants",
          title: "Faites de votre projet de fin d'études un projet Web3",
          content:
            "Réalisez votre projet de fin d'études sur un vrai cas d'usage blockchain, avec le mentorat de développeurs Web3 et un mandat approuvé avec vos professeurs.",
          points: [
            "Des projets de fin d'études à impact communautaire ou industriel",
            "Du soutien pour lancer ou faire grandir une association blockchain sur le campus",
            "Un programme d'incubation pour continuer à bâtir après le diplôme",
          ],
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
          title: "Menez votre idée du prototype au produit finançable",
          content:
            "Rejoignez le programme d'incubation : des cycles de 4 à 12 mois avec un accompagnement technique, sans frais initiaux, et votre projet reste entièrement à vous.",
          points: [
            "Mentorat par sprints, objectifs et revues stratégiques",
            "Ateliers sur la tokenomique, la gouvernance et la conception de produit",
            "Préparation aux subventions des fondations Web3",
          ],
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
          title: "Explorez le Web3 pour votre secteur, à faible coût",
          content:
            "Soumettez-nous un vrai défi. Monark forme une équipe étudiante qui co-développe et teste avec vos experts une preuve de concept décentralisée.",
          points: [
            "Des preuves de concept pour une fraction du coût d'une R-D classique",
            "Un accès à des étudiants motivés et à de jeunes développeurs",
            "Une voie pour transformer les idées prometteuses en projets complets",
          ],
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
      intro:
        "Vulgarisation, nouvelles et récits de Monark et de sa communauté.",
      see_all: "Voir toutes les nouvelles",
    },
    docs: {
      eyebrow: "Documentation",
      title: "La documentation Monark",
      content:
        "Guides, tutoriels et références au même endroit, tenus à jour grâce aux contributions de nos partenaires et de l'écosystème Web3.",
      points: [
        "Des guides choisis pour les outils et SDK Web3 les plus populaires",
        "Des tutoriels pas à pas sur les patrons courants de contrats intelligents",
        "Les bonnes pratiques Web3 : UX, gouvernance, sécurité et mise à l'échelle",
      ],
      primary: {
        label: "Ouvrir la documentation",
        href: DOCS_URL,
        note: "Sur Notion",
      },
      secondary: {
        label: "Parcourir le code",
        href: GITHUB_URL,
        note: "Dépôts open source sur GitHub",
      },
    },
    community: {
      eyebrow: "Communauté",
      title: "Apprenez avec d'autres",
      intro:
        "Les questions sont plus simples quand on est bien entouré. Joignez-vous à la conversation, ou suivez-nous en vidéo.",
      channels: [
        {
          id: "discord",
          title: "Discord",
          content:
            "Posez vos questions, rencontrez d'autres bâtisseurs et suivez ce sur quoi la communauté travaille.",
          label: "Rejoindre le Discord",
        },
        {
          id: "youtube",
          title: "YouTube",
          content: "Abonnez-vous à la chaîne de Monark pour suivre nos vidéos.",
          label: "Voir la chaîne YouTube",
        },
      ],
    },
    cta: {
      title: "Prêt à bâtir ?",
      content:
        "Choisissez un projet auquel contribuer, ou apprenez-en plus sur qui nous sommes.",
      primary: { label: "Explorer nos projets Web3", href: "/project" },
      secondary: { label: "À propos de Monark", href: "/about" },
    },
  },
};
