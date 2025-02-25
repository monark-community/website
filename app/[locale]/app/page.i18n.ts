export interface I18n {
  app_dashboard: {
    title: string;
    description: string;
  };
}

export const en: I18n = {
  app_dashboard: {
    title: "Dashboard",
    description:
      "Welcome to the Monark dashboard. No features are available at the moment, but stay tuned for updates.",
  },
};

export const fr: I18n = {
  app_dashboard: {
    title: "Tableau de bord",
    description:
      "Bienvenue sur le tableau de bord Monark. Aucune fonctionnalité n'est disponible pour le moment, mais restez à l'écoute pour les mises à jour.",
  },
};
