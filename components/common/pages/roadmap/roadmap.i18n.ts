export interface I18n {
  roadmap: {
    title: string;
    due: string;
    statuses: {
      completed: string;
      inProgress: string;
      planned: string;
    };
    shortTerm: {
      phase1: { title: string; description: string };
      documentation: { title: string; description: string };
      usecases: { title: string; description: string };
      ecosystem: { title: string; description: string };
      socialmedia: { title: string; description: string };
    };
    midTerm: {
      phase1: { title: string; description: string };
      ambassador: { title: string; description: string };
      initiatives: { title: string; description: string };
      university: { title: string; description: string };
      podcast: { title: string; description: string };
    };
    longTerm: {
      phase2: { title: string; description: string };
      platform: { title: string; description: string };
      merging: { title: string; description: string };
      modules: { title: string; description: string };
    };
  };
}

export const en: I18n = {
  roadmap: {
    title: "Roadmap",
    due: "Due",
    statuses: {
      completed: "Completed",
      inProgress: "In Progress",
      planned: "Planned",
    },
    shortTerm: {
      phase1: {
        title: "Phase 0: Community building",
        description: "Initial phase focused on community building",
      },
      documentation: {
        title: "Documentation",
        description:
          "Ensure uniformity in documentation and templates for university initiatives",
      },
      usecases: {
        title: "Use cases and projects",
        description:
          "Define, document and present potential use cases and projects",
      },
      ecosystem: {
        title: "Local ecosystem development",
        description:
          "Establish partnerships with universities, schools, and cities",
      },
      socialmedia: {
        title: "Social media program",
        description:
          "Increase awareness and visibility of Monark through strategic social media efforts",
      },
    },
    midTerm: {
      phase1: {
        title: "Phase 1: Community building (continued)",
        description: "Continuing community building efforts",
      },
      ambassador: {
        title: "Ambassador program",
        description:
          "Empower community members to represent and contribute to Monark's mission",
      },
      initiatives: {
        title: "Local initiatives",
        description:
          "Expand adoption by fostering engagement through local events and collaborations",
      },
      university: {
        title: "University Initiatives",
        description:
          "Establish Monark's presence in universities through various programs",
      },
      podcast: {
        title: "Podcast Initiative",
        description:
          "Share insights, stories, and experiences to engage developers, students, and entrepreneurs",
      },
    },
    longTerm: {
      phase2: {
        title: "Phase 2: Expanding Web3",
        description: "Long-term expansion of Web3 capabilities",
      },
      platform: {
        title: "Monark Platform Development",
        description:
          "Establish the Monark technology platform for interactions",
      },
      merging: {
        title: "Merging Physical & Digital",
        description: "Integrate real-world assets with Web3 applications",
      },
      modules: {
        title: "Building Core Modules",
        description: "Develop essential modules to support Monark's ecosystem",
      },
    },
  },
};

export const fr: I18n = {
  roadmap: {
    title: "Feuille de route",
    due: "Dû",
    statuses: {
      completed: "Terminé",
      inProgress: "En cours",
      planned: "Prévu",
    },
    shortTerm: {
      phase1: {
        title: "Phase 0 : Construction de la communauté",
        description: "Phase initiale axée sur la construction de la communauté",
      },
      documentation: {
        title: "Documentation",
        description:
          "Assurer l'uniformité de la documentation et des modèles pour les initiatives universitaires",
      },
      usecases: {
        title: "Cas d'utilisation et projets",
        description:
          "Définir, documenter et présenter des cas d'utilisation et des projets potentiels",
      },
      ecosystem: {
        title: "Développement de l'écosystème local",
        description:
          "Établir des partenariats avec des universités, des écoles et des villes",
      },
      socialmedia: {
        title: "Programme de médias sociaux",
        description:
          "Augmenter la notoriété et la visibilité de Monark grâce à des efforts stratégiques sur les réseaux sociaux",
      },
    },
    midTerm: {
      phase1: {
        title: "Phase 1 : Construction de la communauté (suite)",
        description: "Poursuite des efforts de construction de la communauté",
      },
      ambassador: {
        title: "Programme d'ambassadeurs",
        description:
          "Permettre aux membres de la communauté de représenter et de contribuer à la mission de Monark",
      },
      initiatives: {
        title: "Initiatives locales",
        description:
          "Étendre l'adoption en favorisant l'engagement par le biais d'événements locaux et de collaborations",
      },
      university: {
        title: "Initiatives universitaires",
        description:
          "Établir la présence de Monark dans les universités par le biais de divers programmes",
      },
      podcast: {
        title: "Initiative de podcast",
        description:
          "Partager des idées, des histoires et des expériences pour engager les développeurs, les étudiants et les entrepreneurs",
      },
    },
    longTerm: {
      phase2: {
        title: "Phase 2 : Expansion du Web3",
        description: "Expansion à long terme des capacités Web3",
      },
      platform: {
        title: "Développement de la plateforme Monark",
        description:
          "Établir la plateforme technologique Monark pour les interactions",
      },
      merging: {
        title: "Fusion du physique et du numérique",
        description: "Intégrer des actifs réels avec des applications Web3",
      },
      modules: {
        title: "Construction de modules de base",
        description:
          "Développer des modules essentiels pour soutenir l'écosystème de Monark",
      },
    },
  },
};