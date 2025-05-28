export type AboutActivity = {
  icon: string;
  title: string;
  content: string;
  action: string;
};

export interface I18n {
  about: {
    flavor: string;
    title: string;
    activities: AboutActivity[];
  };
}

export const en: I18n = {
  about: {
    flavor: "What is Monark",
    title: "Empowering Communities Through Collaboration",
    activities: [
      {
        icon: "modular",
        title: "Build",
        content:
          "We support the creation of useful Web3 solutions by providing access to modular infrastructure, mentorship, and collaboration opportunities with universities, cities and industry leaders.",
        action: "Start building",
      },
      {
        icon: "network",
        title: "Incubate",
        content:
          "Monark is a Web3 incubator that connects students, developers, and entrepreneurs with tools and mentors to turn ideas into viable startups.",
        action: "Learn about the ecosystem",
      },
      {
        icon: "governance",
        title: "Lead",
        content:
          "Monark fosters open governance where every member can participate in the evolution of projects, placing power in the hands of the innovators.",
        action: "Learn about governance",
      },
    ],
  },
};

export const fr: I18n = {
  about: {
    flavor: "Qu'est-ce que Monark",
    title: "Autonomiser les communautés par la collaboration",
    activities: [
      {
        icon: "modular",
        title: "Construire",
        content:
          "Nous soutenons la création de solutions Web3 utiles en fournissant un accès à une infrastructure modulaire, à du mentorat et à des opportunités de collaboration avec des universités, des villes et des leaders de l'industrie.",
        action: "Commencer à construire",
      },
      {
        icon: "network",
        title: "Incuber",
        content:
          "Monark est un incubateur Web3 qui connecte étudiants, développeurs et entrepreneurs avec des outils et des mentors pour transformer des idées en startups viables.",
        action: "Découvrir l'écosystème",
      },
      {
        icon: "governance",
        title: "Gouvernance Collaborative",
        content:
          "Monark favorise une gouvernance ouverte où chaque membre peut participer à l'évolution des projets, plaçant le pouvoir entre les mains des innovateurs.",
        action: "En savoir plus sur la gouvernance",
      },
    ],
  },
};
