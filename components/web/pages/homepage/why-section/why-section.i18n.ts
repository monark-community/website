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
          "Leverage powerful core modules to fast-track your web3 journey.",
        tile: "tile-1",
        icon: "lightning",
      },
      {
        title: "Earn Rewards",
        content:
          "Build, contribute, and earn rewards while shaping the future of web3.",
        tile: "tile-2",
        icon: "coin-stack",
      },
      {
        title: "Stronger Communities",
        content:
          "Monark empowers communities—decentralized, transparent, unstoppable.",
        tile: "tile-3",
        icon: "rocket",
      },
    ],
    audiences: [
      {
        id: "developer",
        title: "Developer",
        content: "Create or leverage modules to expedite your web3 journey.",
      },
      {
        id: "entrepreneur",
        title: "Entrepreneur",
        content:
          "Submit your ideas, get visibility, support and funding to launch them.",
      },
      {
        id: "university",
        title: "University",
        content:
          "Let's address the core web3 limitations and expand what is possible.",
      },
      {
        id: "student",
        title: "Student",
        content:
          "Contribute to real-world projects, enhance your skills, and build your network.",
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
        title: "Construisez plus vite, plus intelligemment",
        content:
          "Tirez parti de puissants modules de base pour accélérer votre parcours web3.",
        tile: "tile-1",
        icon: "lightning",
      },
      {
        title: "Gagnez des récompenses",
        content:
          "Construisez, contribuez et gagnez des récompenses tout en façonnant l'avenir du web3.",
        tile: "tile-2",
        icon: "coin-stack",
      },
      {
        title: "Communautés plus fortes",
        content:
          "Monark donne du pouvoir aux communautés—décentralisées, transparentes, inarrêtables.",
        tile: "tile-3",
        icon: "rocket",
      },
    ],
    audiences: [
      {
        id: "developer",
        title: "Développeur",
        content:
          "Créez ou utilisez des modules pour accélérer votre parcours web3.",
      },
      {
        id: "entrepreneur",
        title: "Entrepreneur",
        content:
          "Soumettez vos idées, obtenez de la visibilité, du soutien et du financement pour les lancer.",
      },
      {
        id: "university",
        title: "Université",
        content:
          "Abordons les limitations fondamentales du web3 et élargissons les possibilités.",
      },
      {
        id: "student",
        title: "Étudiant",
        content:
          "Contribuez à des projets du monde réel, améliorez vos compétences et développez votre réseau.",
      },
    ],
  },
};
