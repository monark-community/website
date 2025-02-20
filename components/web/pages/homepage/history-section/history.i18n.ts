export interface I18n {
  history: {
    content: string;
  };
}

export const en: I18n = {
  history: {
    content: `
      <p>Monark was born from a simple yet powerful idea—<strong>to bridge the digital and physical worlds through open data and decentralized governance</strong>. Inspired by the resilience and transformation of the monarch butterfly, we set out to create an <strong>accessible, efficient ecosystem where innovation thrives</strong>.</p>
    `,
  },
};

export const fr: I18n = {
  history: {
    content: `
      <p>Monark est né d'une idée simple mais puissante : <strong>relier les mondes numérique et physique grâce à des données ouvertes et à une gouvernance décentralisée</strong>. Inspirés par la résilience et la transformation du papillon monarque, nous avons entrepris de créer un <strong>écosystème accessible et efficace où l'innovation prospère</strong
    `,
  },
};
