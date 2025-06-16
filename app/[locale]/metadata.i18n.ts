export interface I18n {
  metadata: {
    title: string;
    description: string;
    keywords: string;
  };
}

export const en: I18n = {
  metadata: {
    title: "Empowering Communities, Democratising Technology • Monark",
    description:
      "The Monark Project reveals web3 technology's power to empower people. We envisioned a decentralized platform that democratizes access to software, lowers costs over time, and ensures governance and profits remain within local communities.",
    keywords:
      "Blockchain, web3, Decentralized, Governance, Community, Technology, Software, Open Source, Monark, Monark Project",
  },
};

export const fr: I18n = {
  metadata: {
    title: "Autonomiser les communautés, démocratiser la technologie • Monark",
    description:
      "Le projet Monark révèle le pouvoir de la technologie web3 à autonomiser les gens. Nous avons imaginé une plateforme décentralisée qui démocratise l'accès au logiciel, réduit les coûts au fil du temps et garantit que la gouvernance et les profits restent au sein des communautés locales.",
    keywords:
      "Blockchain, web3, Décentralisé, Gouvernance, Communauté, Technologie, Logiciel, Open Source, Monark, Projet Monark",
  },
};
