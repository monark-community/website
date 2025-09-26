export interface I18n {
  hero_section: {
    flavor: string;
    headline: string;
    context: string;
    soon?: string;
    primary_action: string;
    secondary_action: string;
  };
}

export const en: I18n = {
  hero_section: {
    flavor: "Where ideas metamorphose into reality",
    headline: "Fostering Collaboration within the Web3 Community",
    context:
      "We incubate the next generation of Web3 innovators, launching startups by students, recent graduates, and independent developers, aligned from day one with the ecosystems of our funding partners.",
    soon: "Coming Soon",
    primary_action: "Our Web3 projects",
    secondary_action: "What is Monark?",
  },
};

export const fr: I18n = {
  hero_section: {
    flavor: "Où les idées se métamorphosent en réalité",
    headline:
      "Favoriser la collaboration au sein de la communauté Web3",
    context:
      "Nous incubons la prochaine génération d'innovateurs Web3, lançant des startups par des étudiants, de jeunes diplômés et des développeurs indépendants, alignés dès le premier jour avec les écosystèmes de nos partenaires financiers.",
    soon: "Bientôt disponible",
    primary_action: "Nos projets Web3",
    secondary_action: "Qu'est-ce que Monark?",
  },
};
