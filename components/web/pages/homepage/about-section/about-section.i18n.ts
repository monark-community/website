export type AboutActivity = {
    icon: string;
    title: string;
    content: string;
    action: string;
}

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
        content: "Join your community, share ideas, contribute to projects and expand your local resilience.",
        action: "Learn about the ecosystem",
      },
      {
        icon: "modular",
        title: "Build",
        content: "Expand your community's capabilities by working on requested products and modules.",
        action: "Start building",
      },
      {
        icon: "governance",
        title: "Lead",
        content: "Decide on the highest impact projects and where funds of the community should be allocated.",
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
        content: "Rejoignez votre communauté, partagez des idées, contribuez à des projets et développez votre résilience locale.",
        action: "Découvrir l'écosystème",
      },
      {
        icon: "modular",
        title: "Construire",
        content: "Élargissez les capacités de votre communauté en travaillant sur des produits et modules demandés.",
        action: "Commencer à construire",
      },
      {
        icon: "governance",
        title: "Diriger",
        content: "Décidez des projets les plus impactants et de l'allocation des fonds de la communauté.",
        action: "En savoir plus sur la gouvernance",
      },
    ],
  },
};
