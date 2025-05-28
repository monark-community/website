export interface Member {
  name: string;
  role: string;
  linkedin: string;
  image: string;
  description: string;
}

export interface I18n {
  team: {
    team_title: string;
    members: Member[];
  };
}

export const en: I18n = {
  team: {
    team_title: "The Team",
    members: [
      {
        name: "Vincent Grenier",
        role: "CEO",
        linkedin: "https://www.linkedin.com/in/vincent-grenier-3565b492/",
        image: "/images/team/vincent-grenier.jpg",
        description:
          "With a background in civil and structural engineering, Vincent made his mark in the Web3 space as co-founder of EOS Nation and Pinax. He also served as VP of Finance & Crypto at ENF. Having built business systems and led teams of over 50 people, Vincent brings vision, structure, and hands-on experience to drive Monark's mission forward.",
      },
      {
        name: "Loucas Pelletier",
        role: "COO",
        linkedin: "https://www.linkedin.com/in/loucas-pelletier/",
        image: "/images/team/loucas-pelletier.jpg",
        description:
          "Loucas combines sharp analytical thinking with strong project management skills. With a background in tech-focused management and an MBA, he's led teams of 10 to 25 people and thrives at turning big ideas into structured action. At Monark, he makes sure operations stay aligned, efficient, and ready to scale.",
      },
      {
        name: "Dominic Fournier",
        role: "CTO",
        linkedin: "https://www.linkedin.com/in/dominicf96/",
        image: "/images/team/dominic-fournier.jpg",
        description:
          "Dominic brings 8 years of experience in development, including deep expertise in Web3 products and UI/UX design. He's led full-stack teams and knows how to turn rough ideas into intuitive, well-built tools. Passionate and pragmatic, he ensures every product Monark delivers is both technically solid and user-friendly.",
      },
    ],
  },
};

export const fr: I18n = {
  team: {
    team_title: "L'équipe",
    members: [
      {
        name: "Vincent Grenier",
        role: "CEO",
        linkedin: "https://www.linkedin.com/in/vincent-grenier-3565b492/",
        image: "/images/team/vincent-grenier.jpg",
        description:
          "Études en génie civil et structurel. Co-fondateur et CFO d'EOS Nation et Pinax. VP Finance & Crypto operations à ENF. Années d'expérience dans l'environnement blockchain. A construit des systèmes d'affaires et dirigé des équipes de plus de 50 personnes.",
      },
      {
        name: "Loucas Pelletier",
        role: "COO",
        linkedin: "https://www.linkedin.com/in/loucas-pelletier/",
        image: "/images/team/loucas-pelletier.jpg",
        description:
          "Loucas combine une pensée analytique aiguisée avec de solides compétences en gestion de projet. Avec un parcours en gestion axée sur la technologie et un MBA, il a dirigé des équipes de 10 à 25 personnes et excelle à transformer de grandes idées en actions structurées. Chez Monark, il veille à ce que les opérations restent alignées, efficaces et prêtes à évoluer.",
      },
      {
        name: "Dominic Fournier",
        role: "CTO",
        linkedin: "https://www.linkedin.com/in/dominicf96/",
        image: "/images/team/dominic-fournier.jpg",
        description:
          "Dominic apporte 8 ans d'expérience en développement, y compris une expertise approfondie dans les produits Web3 et la conception UI/UX. Il a dirigé des équipes full-stack et sait comment transformer des idées brutes en outils intuitifs et bien construits. Passionné et pragmatique, il veille à ce que chaque produit que Monark livre soit à la fois techniquement solide et convivial.",
      },
    ],
  },
};
