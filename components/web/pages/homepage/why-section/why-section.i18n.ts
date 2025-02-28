export type WhyPerk = {
  title: string;
  content: string;
  tile: string;
  icon: string;
};

export type WhyAudience = {
  id: string;
  title: string;
  content: string;
  href: string;
};

export interface I18n {
  why: {
    flavor: string;
    title: string;
    perks: WhyPerk[];
    audiences: WhyAudience[];
  };
}

export const en: I18n = {
  why: {
    flavor: "Why Monark",
    title: "Join the Flight, Unleash Freedom",
    perks: [
      {
        title: "Build Faster, Smarter",
        content:
          "Web3 suffers from a lack of structure, high costs, and centralized governance that hinders its adoption.",
        tile: "tile-1",
        icon: "lightning",
      },
      {
        title: "Earn Rewards",
        content:
          "Monark addresses these challenges with a collaborative and educational platform, simplifying access to decentralized technologies.",
        tile: "tile-2",
        icon: "coin-stack",
      },
      {
        title: "Stronger Communities",
        content:
          "Unlike traditional models, Monark fosters community governance and profit redistribution to users.",
        tile: "tile-3",
        icon: "rocket",
      },
    ],
    audiences: [
      {
        id: "developer",
        title: "Developer",
        content: "Create or leverage modules to expedite your web3 journey.",
        href: "/participate/developer",
      },
      {
        id: "entrepreneur",
        title: "Entrepreneur",
        content:
          "Submit your ideas, get visibility, support and funding to launch them.",
        href: "/participate/entrepreneur",
      },
      {
        id: "university",
        title: "University",
        content:
          "Let's address the core web3 limitations and expand what is possible.",
        href: "/participate/university",
      },
      {
        id: "student",
        title: "Student",
        content:
          "Contribute to real-world projects, enhance your skills, and build your network.",
        href: "/participate/student",
      },
    ],
  },
};

export const fr: I18n = {
  why: {
    flavor: "Pourquoi Monark",
    title: "Rejoignez le mouvement, libérez-vous",
    perks: [
      {
        title: "Résoudre les défis du web3",
        content:
          "Le Web3 souffre d'un manque de structure, de coûts élevés et d'une gouvernance centralisée qui freine son adoption.",
        tile: "tile-1",
        icon: "lightning",
      },
      {
        title: "Solutions accessibles et collaboratives",
        content:
          "Monark résout ces défis avec une plateforme collaborative et éducative, simplifiant l'accès aux technologies décentralisées.",
        tile: "tile-3",
        icon: "rocket",
      },
      {
        title: "Gouvernance communautaire",
        content:
          "Contrairement aux modèles traditionnels, Monark favorise la gouvernance communautaire et la redistribution des bénéfices aux utilisateurs.",
        tile: "tile-2",
        icon: "handshake",
      },
    ],
    audiences: [
      {
        id: "developer",
        title: "Développeur",
        content:
          "Créez ou utilisez des modules pour accélérer votre parcours web3.",
        href: "/participate/developer",
      },
      {
        id: "entrepreneur",
        title: "Entrepreneur",
        content:
          "Soumettez vos idées, obtenez de la visibilité, du soutien et du financement pour les lancer.",
        href: "/participate/entrepreneur",
      },
      {
        id: "university",
        title: "Université",
        content:
          "Abordons les limitations fondamentales du web3 et élargissons les possibilités.",
        href: "/participate/university",
      },
      {
        id: "student",
        title: "Étudiant",
        content:
          "Contribuez à des projets du monde réel, améliorez vos compétences et développez votre réseau.",
        href: "/participate/student",
      },
    ],
  },
};
