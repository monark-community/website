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
    ],
  },
};
