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
  icon: string;
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
    flavor: "Build on Web3",
    title: "Join the Flight",
    perks: [
      {
        title: "Launching Tomorrow's Founders",
        content:
          "Monark helps students and recent grads build strong Web3 startups ready for serious funding.",
        tile: "tile-3",
        icon: "rocket",
      },
      {
        title: "Bridging the Early-Stage Gap",
        content:
          "We support founders before traditional incubators, where Web3 structure and access are still missing.",
        tile: "tile-2",
        icon: "lightning",
      },
      {
        title: "Aligned and Fair by Design",
        content:
          "We empower communities while ensuring projects support our partners' tools and chains.",
        tile: "tile-1",
        icon: "handshake",
      },
    ],
    audiences: [
      // {
      //   id: "entrepreneur",
      //   title: "Entrepreneur",
      //   content:
      //     "Submit your ideas, get visibility, support and funding to launch them.",
      //   href: "/participate/entrepreneur",
      // },
      {
        id: "student",
        title: "Student",
        content:
          "Contribute to real-world projects, enhance your skills and build your ideas.",
        href: "/participate/student",
        icon: "graduation-cap",
      },
      {
        id: "university",
        title: "University",
        content:
          "Let's address the core web3 limitations and expand what is possible.",
        href: "/participate/university",
        icon: "university",
      },
      {
        id: "developer",
        title: "Developer",
        content: "Create or leverage modules to expedite your web3 journey.",
        href: "/participate/developer",
        icon: "code",
      },
      {
        id: "ambassador",
        title: "Ambassador",
        content:
          "Grow the Monark ecosystem, onboard new users and get rewarded for your impact.",
        href: "/participate/ambassador",
        icon: "users",
      },
    ],
  },
};

export const fr: I18n = {
  why: {
    flavor: "Bâtir sur le Web3",
    title: "Rejoignez le mouvement",
    perks: [
      {
        title: "Lancer les fondateurs de demain",
        content:
          "Monark aide étudiants et jeunes diplômés à créer des startups Web3 solides et prêtes à lever des fonds.",
        tile: "tile-3",
        icon: "rocket",
      },
      {
        title: "Combler le vide du Web3 early",
        content:
          "Nous structurons l'accès au Web3 là où il manque : avant les incubateurs traditionnels.",
        tile: "tile-2",
        icon: "lightning",
      },
      {
        title: "Un modèle aligné et équitable",
        content:
          "Monark soutient les communautés et intègre les outils et chaînes de ses partenaires financiers.",
        tile: "tile-1",
        icon: "handshake",
      },
    ],
    audiences: [
      // {
      //   id: "entrepreneur",
      //   title: "Entrepreneur",
      //   content:
      //     "Soumettez vos idées, obtenez de la visibilité, du soutien et du financement pour les lancer.",
      //   href: "/participate/entrepreneur",
      // },
      {
        id: "student",
        title: "Étudiant",
        content:
          "Contribuez à des projets concrets, améliorez vos compétences et construisez vos idées.",
        href: "/participate/student",
        icon: "graduation-cap",
      },
      {
        id: "university",
        title: "Université",
        content:
          "Abordons les limitations fondamentales du web3 et élargissons les possibilités.",
        href: "/participate/university",
        icon: "university",
      },
      {
        id: "developer",
        title: "Développeur",
        content:
          "Créez ou utilisez des modules pour accélérer votre parcours web3.",
        href: "/participate/developer",
        icon: "code",
      },
      {
        id: "ambassador",
        title: "Ambassadeur",
        content:
          "Développez l'écosystème Monark, intégrez de nouveaux utilisateurs et soyez récompensé pour votre impact.",
        href: "/participate/ambassador",
        icon: "users",
      },
    ],
  },
};
