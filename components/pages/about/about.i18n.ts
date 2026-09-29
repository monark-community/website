/**
 * About page content (en/fr), rendered by the section components in
 * components/pages/about/*. Replaces content/{en,fr}/about/page.mdx: the
 * ideas of that text are kept, split into the page's sections. Icons are
 * Lucide names resolved in about-icon.tsx; keep en and fr equivalent.
 */

export type AboutIconName =
  | "graduation-cap"
  | "coins"
  | "route"
  | "book-open"
  | "code"
  | "sprout"
  | "layout-grid"
  | "blocks"
  | "university"
  | "vote"
  | "accessibility"
  | "eye"
  | "handshake"
  | "leaf"
  | "lightbulb";

export type AboutBarrier = {
  icon: AboutIconName;
  /** The problem, as a short label. */
  problem: string;
  problem_detail: string;
  /** Monark's answer to it. */
  answer_icon: AboutIconName;
  answer: string;
  answer_detail: string;
};

export type AboutStep = {
  icon: AboutIconName;
  title: string;
  content: string;
};

export type AboutValue = {
  icon: AboutIconName;
  title: string;
  content: string;
};

export type AboutStatement = {
  label: string;
  /** Short, quotable sentence. */
  quote: string;
  content: string;
};

export type AboutLink = { label: string; href: string };

export interface I18n {
  about_page: {
    meta: { title: string; description: string };
    hero: {
      eyebrow: string;
      title: string;
      lead: string;
      audiences_label: string;
      audiences: string[];
    };
    why: {
      eyebrow: string;
      title: string;
      intro: string;
      problem_label: string;
      answer_label: string;
      barriers: AboutBarrier[];
      ownership_title: string;
      ownership: string;
    };
    how: {
      eyebrow: string;
      title: string;
      intro: string;
      steps: AboutStep[];
    };
    purpose: {
      title: string;
      mission: AboutStatement;
      vision: AboutStatement;
      motto: string;
    };
    values: {
      eyebrow: string;
      title: string;
      items: AboutValue[];
    };
    cta: {
      title: string;
      content: string;
      primary: AboutLink;
      roles_label: string;
      roles: AboutLink[];
    };
  };
}

export const en: I18n = {
  about_page: {
    meta: {
      title: "About",
      description:
        "Monark is a collaborative Web3 ecosystem for students, developers, and communities. We provide tools, resources, and support to build decentralized applications and foster innovation.",
    },
    hero: {
      eyebrow: "What is Monark?",
      title: "A Web3 ecosystem that is open to everyone, and built together",
      lead: "Monark is one platform to share project ideas, collaborate on open-source applications and find technical resources made for you.",
      audiences_label: "Monark is built for",
      audiences: [
        "University students",
        "Developers",
        "Entrepreneurs",
        "Web3 enthusiasts",
        "Local communities",
      ],
    },
    why: {
      eyebrow: "Why Monark",
      title: "Three barriers hold Web3 back. We remove them.",
      intro:
        "Web3 adoption is still limited, and the same obstacles stop students, developers and communities again and again. Monark's open-source platform lets anyone contribute, collaborate and build real-world solutions.",
      problem_label: "The barrier",
      answer_label: "Monark's answer",
      barriers: [
        {
          icon: "graduation-cap",
          problem: "A steep learning curve",
          problem_detail: "Web3 is hard to learn alone.",
          answer_icon: "book-open",
          answer: "Mentorship and learning",
          answer_detail:
            "Mentors and learning resources, made with universities, help you learn by building.",
        },
        {
          icon: "coins",
          problem: "High development costs",
          problem_detail: "Building a project takes money most people don't have.",
          answer_icon: "code",
          answer: "Open source and rewards",
          answer_detail:
            "Shared open-source tools and contributor rewards remove the financial barrier.",
        },
        {
          icon: "route",
          problem: "No structured path",
          problem_detail: "There is no clear way from an idea to a real project.",
          answer_icon: "sprout",
          answer: "Incubation",
          answer_detail:
            "Incubation takes students, developers and communities from an idea to a working solution.",
        },
      ],
      ownership_title: "Value stays with the people who build",
      ownership:
        "Unlike many Web3 initiatives, Monark gives value back through community ownership, local partnerships and contributor rewards.",
    },
    how: {
      eyebrow: "How Monark works",
      title: "Open tools, shared learning and open governance",
      intro:
        "Monark helps Web3 grow on two fronts: development and adoption. Every step is open to the community.",
      steps: [
        {
          icon: "layout-grid",
          title: "One shared platform",
          content:
            "Share project ideas, collaborate on open-source applications and find the technical resources you need, in one place.",
        },
        {
          icon: "blocks",
          title: "Essential modules",
          content:
            "We help build the modules that make Web3 easier to develop and to adopt.",
        },
        {
          icon: "university",
          title: "Education with universities",
          content:
            "Learning resources made with universities help new developers and entrepreneurs make the move to Web3.",
        },
        {
          icon: "vote",
          title: "Open, democratic governance",
          content:
            "Every member can help create and improve Web3 tools and services, so the benefits stay with users and local communities.",
        },
      ],
    },
    purpose: {
      title: "Our mission and vision",
      mission: {
        label: "Mission",
        quote:
          "Build a scalable, open ecosystem where developers, universities and communities shape the future of Web3 together.",
        content:
          "We co-create tools, document our progress and let others adapt and build on what we started. By bridging academic insight, developer creativity and community needs, we open the way to decentralized innovation, sustainability and shared growth, and through partnerships and public collaboration we aim to inspire resilient ecosystems with real-world impact.",
      },
      vision: {
        label: "Vision",
        quote:
          "Onboard, empower and lead the next generation of Web3 developers towards a more open, inclusive and community-driven digital economy.",
        content:
          "Accessible tools, real-world pilots and modular infrastructure lay the foundation for others to innovate. We also lead with our own builds and partnerships, to show what's possible and set the standard for decentralized ecosystems that scale with purpose, equity and long-term impact.",
      },
      motto: "One module, one project and one city at a time.",
    },
    values: {
      eyebrow: "Values",
      title: "What guides our work",
      items: [
        {
          icon: "accessibility",
          title: "Accessibility",
          content: "Lowering the barrier to entry for everyone.",
        },
        {
          icon: "eye",
          title: "Transparency",
          content: "Open governance and open-source development.",
        },
        {
          icon: "handshake",
          title: "Collaboration",
          content: "Shared success through community-driven initiatives.",
        },
        {
          icon: "leaf",
          title: "Sustainability",
          content: "Long-term thinking for communities and ecosystems.",
        },
        {
          icon: "lightbulb",
          title: "Innovation",
          content: "Supporting experimentation and creativity at every level.",
        },
      ],
    },
    cta: {
      title: "Build the next step with us",
      content:
        "Explore the projects under way, or find your place in the community.",
      primary: { label: "Explore our Web3 projects", href: "/project" },
      roles_label: "Get involved as",
      roles: [
        { label: "University", href: "/participate/university" },
        { label: "Developer", href: "/participate/developer" },
        { label: "Industry representative", href: "/participate/industry" },
        { label: "Ambassador", href: "/participate/ambassador" },
      ],
    },
  },
};

export const fr: I18n = {
  about_page: {
    meta: {
      title: "À propos",
      description:
        "Monark est un écosystème Web3 collaboratif pour les étudiants, les développeurs et les communautés. Nous fournissons des outils, des ressources et un soutien pour construire des applications décentralisées et favoriser l'innovation.",
    },
    hero: {
      eyebrow: "Qu'est-ce que Monark ?",
      title: "Un écosystème Web3 ouvert à toutes et à tous, construit ensemble",
      lead: "Monark est une plateforme unique pour partager des idées de projets, collaborer sur des applications open source et trouver des ressources techniques adaptées à vos besoins.",
      audiences_label: "Monark s'adresse aux",
      audiences: [
        "Étudiants universitaires",
        "Développeurs",
        "Entrepreneurs",
        "Passionnés de Web3",
        "Communautés locales",
      ],
    },
    why: {
      eyebrow: "Pourquoi Monark",
      title: "Trois obstacles freinent le Web3. Nous les levons.",
      intro:
        "L'adoption du Web3 reste limitée, et les mêmes obstacles arrêtent sans cesse les étudiants, les développeurs et les communautés. La plateforme open source de Monark permet à chacun de contribuer, de collaborer et de construire des solutions concrètes.",
      problem_label: "L'obstacle",
      answer_label: "La réponse de Monark",
      barriers: [
        {
          icon: "graduation-cap",
          problem: "Une courbe d'apprentissage élevée",
          problem_detail: "Le Web3 est difficile à apprendre seul.",
          answer_icon: "book-open",
          answer: "Mentorat et formation",
          answer_detail:
            "Des mentors et des ressources éducatives, conçues avec des universités, vous aident à apprendre en construisant.",
        },
        {
          icon: "coins",
          problem: "Des coûts de développement importants",
          problem_detail:
            "Bâtir un projet demande des moyens que peu de gens ont.",
          answer_icon: "code",
          answer: "Open source et récompenses",
          answer_detail:
            "Des outils open source partagés et des récompenses aux contributeurs lèvent la barrière financière.",
        },
        {
          icon: "route",
          problem: "Aucun parcours structuré",
          problem_detail: "Rien ne mène clairement d'une idée à un vrai projet.",
          answer_icon: "sprout",
          answer: "Incubation",
          answer_detail:
            "L'incubation accompagne étudiants, développeurs et communautés de l'idée à une solution qui fonctionne.",
        },
      ],
      ownership_title: "La valeur reste à celles et ceux qui construisent",
      ownership:
        "Contrairement à de nombreuses initiatives Web3, Monark redistribue la valeur par la propriété communautaire, les partenariats locaux et les récompenses aux contributeurs.",
    },
    how: {
      eyebrow: "Comment fonctionne Monark",
      title: "Des outils ouverts, un apprentissage partagé et une gouvernance ouverte",
      intro:
        "Monark fait avancer le Web3 sur deux fronts : le développement et l'adoption. Chaque étape est ouverte à la communauté.",
      steps: [
        {
          icon: "layout-grid",
          title: "Une plateforme commune",
          content:
            "Partagez des idées de projets, collaborez sur des applications open source et trouvez les ressources techniques dont vous avez besoin, au même endroit.",
        },
        {
          icon: "blocks",
          title: "Des modules essentiels",
          content:
            "Nous participons au développement des modules qui facilitent la création et l'adoption de solutions Web3.",
        },
        {
          icon: "university",
          title: "La formation avec les universités",
          content:
            "Des ressources éducatives conçues avec des universités accompagnent les nouveaux développeurs et entrepreneurs dans leur transition vers le Web3.",
        },
        {
          icon: "vote",
          title: "Une gouvernance ouverte et démocratique",
          content:
            "Chaque membre peut contribuer à créer et à améliorer des outils et services Web3, pour que les bénéfices restent entre les mains des utilisateurs et des communautés locales.",
        },
      ],
    },
    purpose: {
      title: "Notre mission et notre vision",
      mission: {
        label: "Mission",
        quote:
          "Construire un écosystème évolutif et ouvert où développeurs, universités et communautés façonnent ensemble l'avenir du Web3.",
        content:
          "Nous co-créons des outils, documentons nos avancées et permettons à d'autres de s'approprier et d'enrichir ce que nous avons initié. En reliant les savoirs académiques, la créativité des développeurs et les besoins des communautés, nous ouvrons la voie à une innovation décentralisée, durable et partagée, et, grâce à des partenariats et à une collaboration publique, nous voulons inspirer des écosystèmes résilients à l'impact concret.",
      },
      vision: {
        label: "Vision",
        quote:
          "Embarquer, autonomiser et guider la prochaine génération de développeurs Web3 vers une économie numérique plus ouverte, inclusive et portée par ses communautés.",
        content:
          "Des outils accessibles, des projets pilotes réels et une infrastructure modulaire posent les bases sur lesquelles d'autres pourront innover. Nous montrons aussi l'exemple avec nos propres projets et partenariats, pour démontrer ce qui est possible et établir la norme d'écosystèmes décentralisés évolutifs, équitables et porteurs d'impact durable.",
      },
      motto: "Un module, un projet, une ville à la fois.",
    },
    values: {
      eyebrow: "Valeurs",
      title: "Ce qui guide notre travail",
      items: [
        {
          icon: "accessibility",
          title: "Accessibilité",
          content: "Réduire les barrières à l'entrée pour tout le monde.",
        },
        {
          icon: "eye",
          title: "Transparence",
          content: "Gouvernance ouverte et développement open source.",
        },
        {
          icon: "handshake",
          title: "Collaboration",
          content: "Une réussite partagée grâce aux initiatives communautaires.",
        },
        {
          icon: "leaf",
          title: "Durabilité",
          content: "Une vision à long terme pour les communautés et les écosystèmes.",
        },
        {
          icon: "lightbulb",
          title: "Innovation",
          content: "Favoriser l'expérimentation et la créativité à tous les niveaux.",
        },
      ],
    },
    cta: {
      title: "Construisons la suite ensemble",
      content:
        "Découvrez les projets en cours, ou trouvez votre place dans la communauté.",
      primary: { label: "Explorer nos projets Web3", href: "/project" },
      roles_label: "Participer en tant que",
      roles: [
        { label: "Université", href: "/participate/university" },
        { label: "Développeur", href: "/participate/developer" },
        { label: "Représentant industriel", href: "/participate/industry" },
        { label: "Ambassadeur", href: "/participate/ambassador" },
      ],
    },
  },
};
