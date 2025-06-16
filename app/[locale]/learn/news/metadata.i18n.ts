export interface I18n {
  news_page: {
    title: string;
    description: string;
    news: {
      id: string;
      image: string;
      title: string;
      description: string;
      date: Date;
    }[];
    read_more: string;
  };
}

export const en: I18n = {
  news_page: {
    title: "Latest News",
    description:
      "Stay up to date with the latest news from the Monark project. Learn about our progress, partnerships, and upcoming events.",
    news: [
    //   {
    //     id: "new-website-2025",
    //     image: "new-website-2025.jpg",
    //     title: "Monark Launches New Website",
    //     description:
    //       "We are excited to announce the launch of our new website. The site features a fresh design, improved navigation, and updated content.",
    //     date: new Date(2025, 1, 27),
    //   },
      {
        id: "pioneer-in-university-projects-mentorship",
        image: "pioneer-in-university-projects-mentorship.jpg",
        title:
          "Pioneer in Supporting Decentralized Accounting University Projects",
        description:
          "Monark, recently founded by visionary entrepreneur Vincent Grenier, establishes itself as the new leader in developing and supporting university projects in decentralized technologies. Building on experience gained through successful collaborations with higher education institutions, Monark now positions itself as a privileged partner for students and researchers working on blockchain innovations.",
        date: new Date(2025, 1, 27),
      },
    ],
    read_more: "Read more",
  },
};

export const fr: I18n = {
  news_page: {
    title: "Dernières nouvelles",
    description:
      "Restez informé des dernières nouvelles du projet Monark. Découvrez nos progrès, nos partenariats et nos événements à venir.",
    news: [
    //   {
    //     id: "new-website-2025",
    //     image: "new-website-2025.jpg",
    //     title: "Monark lance un nouveau site web",
    //     description:
    //       "Nous sommes heureux d'annoncer le lancement de notre nouveau site web. Le site présente un design rafraîchi, une navigation améliorée et un contenu mis à jour.",
    //     date: new Date(2025, 1, 27),
    //   },
      {
        id: "pioneer-in-university-projects-mentorship",
        image: "pioneer-in-university-projects-mentorship.jpg",
        title:
          "Pionnier dans le soutien des projets universitaires de comptabilité décentralisée",
        description:
          "Monark, récemment fondée par l'entrepreneur visionnaire Vincent Grenier, s'impose comme le nouveau leader dans le développement et le soutien de projets universitaires en technologies décentralisées. Fort d'une expérience acquise grâce à des collaborations réussies avec des établissements d'enseignement supérieur, Monark se positionne désormais comme un partenaire privilégié pour les étudiants et les chercheurs travaillant sur des innovations en matière de blockchain.",
        date: new Date(2025, 1, 27),
      },
    ],
    read_more: "En savoir plus",
  },
};
