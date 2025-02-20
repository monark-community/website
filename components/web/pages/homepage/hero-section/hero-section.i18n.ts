export interface I18n {
  hero_section: {
    flavor: string;
    headline: string;
    context: string;
    primary_action: string;
    secondary_action: string;
  };
}

export const en: I18n = {
  hero_section: {
    flavor: "Where ideas metamorphose into reality",
    headline: "Bridging Digital & Physical Worlds with Open Data",
    context:
      "We connect communities, developers, and local entities, by creating an accessible, efficient ecosystem where innovation thrives.",
    primary_action: "Join the Movement",
    secondary_action: "What is Monark?",
  },
};

export const fr: I18n = {
  hero_section: {
    flavor: "Où les idées se métamorphosent en réalité",
    headline:
      "Relier les mondes numérique et physique avec des données ouvertes",
    context:
      "Nous connectons les communautés, les développeurs et les entités locales, en créant un écosystème accessible et efficace où l'innovation prospère.",
    primary_action: "Rejoignez le mouvement",
    secondary_action: "Qu'est-ce que Monark?",
  },
};
