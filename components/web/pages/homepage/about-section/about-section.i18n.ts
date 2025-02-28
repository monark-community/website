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
    title: "Empowering Communities Through Decentralization",
    activities: [
      {
        icon: "network",
        title: "Connect",
        content:
          "Monark is a collaborative Web3 ecosystem for students, developers, and entrepreneurs. It facilitates idea sharing, open-source collaboration, and access to technical resources.",
        action: "Learn about the ecosystem",
      },
      {
        icon: "modular",
        title: "Build",
        content:
          "The initiative also develops Web3 modules and partners with universities to provide educational resources.",
        action: "Start building",
      },
      {
        icon: "governance",
        title: "Lead",
        content:
          "Open and democratic, Monark puts innovation in the hands of users and communities.",
        action: "Learn about governance",
      },
    ],
  },
};

export const fr: I18n = {
  about: {
    flavor: "Qu'est-ce que Monark",
    title: "Autonomiser les communautés grâce à la décentralisation",
    activities: [
      {
        icon: "network",
        title: "Connecter",
        content:
          "Monark est un écosystème Web3 collaboratif pour les étudiants, développeurs et entrepreneurs. Il facilite le partage d'idées, la collaboration open-source et l'accès à des ressources techniques.",
        action: "Découvrir l'écosystème",
      },
      {
        icon: "modular",
        title: "Construire",
        content:
          "L'initiative développe aussi des modules Web3 et s'associe aux universités pour proposer des ressources éducatives.",
        action: "Commencer à construire",
      },
      {
        icon: "governance",
        title: "Diriger",
        content:
          "Ouvert et démocratique, Monark met l'innovation entre les mains des utilisateurs et des communautés.",
        action: "En savoir plus sur la gouvernance",
      },
    ],
  },
};
