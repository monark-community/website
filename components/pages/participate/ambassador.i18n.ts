/**
 * Ambassador page (en/fr). There was no MDX for it (only a "Work in
 * progress" placeholder), so the copy uses only what Monark states elsewhere:
 * - home page: "Grow the Monark ecosystem, onboard new users and get
 *   rewarded for your impact";
 * - news "What Monark is building and why": the Ambassadors Program lets
 *   passionate people represent Monark's values and mission and create local
 *   hubs for education, collaboration and project development;
 * - roadmap: "Empower community members to represent and contribute to
 *   Monark's mission" (planned);
 * - the Reffinity project, a referral system "for ambassador programs".
 * Rewards, selection and commitment are not defined anywhere, so the page
 * says they are still to come instead of inventing them.
 */
import { ParticipateContent } from "./participate.types";
import { DISCORD_URL } from "./participate-shared.i18n";

export const en: ParticipateContent = {
  meta: {
    title: "Ambassadors",
    description:
      "Monark's ambassador program invites passionate community members to represent Monark's values and mission where they live, onboard new people and help create local hubs for Web3 education, collaboration and projects.",
  },
  hero: {
    eyebrow: "Participate as an ambassador",
    title: "Grow the Monark community where you live",
    lead: "Ambassadors carry Monark's values and mission to their city, campus or community. They bring new people in, and help create local hubs for Web3 education, collaboration and project development.",
    audiences_label: "For",
    audiences: ["Community members", "Students", "Web3 enthusiasts"],
    status:
      "The ambassador program is taking shape. Join the Discord to be part of it from the start.",
  },
  offer: {
    eyebrow: "What you get",
    title: "A role at the heart of the community",
    items: [
      {
        icon: "sprout",
        title: "Rewards for your impact",
        content:
          "Ambassadors who grow the Monark ecosystem are rewarded for the impact they have.",
      },
      {
        icon: "users",
        title: "A community behind you",
        content:
          "Build alongside the developers, students and partners already working with Monark.",
      },
      {
        icon: "map-pin",
        title: "A local hub to build",
        content:
          "Create a place for Web3 education, collaboration and projects in your own community.",
      },
      {
        icon: "heart-handshake",
        title: "A mission worth sharing",
        content:
          "An open ecosystem that grows one module, one project and one city at a time.",
      },
    ],
    note: {
      title: "Details are still to come",
      content:
        "How rewards work, and what the program asks of ambassadors, will be shared as the program launches. Questions? Ask us on Discord.",
    },
  },
  steps: {
    eyebrow: "How it works",
    title: "How to get involved",
    intro:
      "The program is still being defined, so these steps may change as it launches.",
    items: [
      {
        title: "Join the community",
        content:
          "Start on Discord: meet the team and the people already building with Monark.",
      },
      {
        title: "Tell us where you are",
        content:
          "Your city, campus or community, and what you would like to do there.",
      },
      {
        title: "Represent Monark",
        content:
          "Share Monark's mission, bring new people in and help them find their place.",
      },
      {
        title: "Grow a local hub",
        content:
          "Bring people together for Web3 education, collaboration and project development.",
      },
    ],
  },
  fit: {
    eyebrow: "Who fits",
    title: "People who want Web3 to work for their community",
    who_title: "You might be a good fit if",
    who: [
      "You're passionate about Web3 and want more people to benefit from it",
      "You share Monark's values: accessibility, transparency, collaboration, sustainability and innovation",
      "You're connected to a city, a campus or a community you want to grow",
    ],
    expect_title: "What an ambassador does",
    expect: [
      "Represents Monark's values and mission",
      "Onboards new people into the Monark ecosystem",
      "Helps create local hubs for education, collaboration and project development",
    ],
  },
  proof: {
    eyebrow: "Where it's heading",
    title: "Built in the open, like the rest of Monark",
    content:
      "Monark announced its ambassador program alongside its work with universities and its incubator. Its project catalogue includes the kind of tools such programs need.",
    items: [
      {
        label: "News",
        title: "What Monark is building and why",
        content:
          "The article that introduced the ambassador program, with Monark's university work, incubator and live projects.",
        href: "/learn/news/what-monark-is-building-and-why",
      },
      {
        label: "Project · In progress",
        title: "Reffinity",
        content:
          "An on-chain referral system that records who invited whom and rewards milestones transparently, designed for ambassador programs and affiliate networks.",
        href: "/project/referral-system",
      },
    ],
    link: { label: "Browse all projects", href: "/project" },
  },
  cta: {
    title: "Want to represent Monark?",
    content:
      "Join the Discord and tell us where you'd like to grow the community. We'll keep you posted as the program launches.",
    primary: { label: "Join us on Discord", href: DISCORD_URL, external: true },
    secondary: { label: "Contact the team", href: "/form/contact" },
  },
};

export const fr: ParticipateContent = {
  meta: {
    title: "Ambassadeurs",
    description:
      "Le programme d'ambassadeurs de Monark invite des membres passionnés de la communauté à représenter les valeurs et la mission de Monark là où ils vivent, à accueillir de nouvelles personnes et à créer des pôles locaux d'éducation, de collaboration et de projets Web3.",
  },
  hero: {
    eyebrow: "Participer en tant qu'ambassadeur",
    title: "Faites grandir la communauté Monark là où vous vivez",
    lead: "Les ambassadeurs portent les valeurs et la mission de Monark dans leur ville, sur leur campus ou dans leur communauté. Ils y accueillent de nouvelles personnes et aident à créer des pôles locaux d'éducation, de collaboration et de développement de projets Web3.",
    audiences_label: "Pour",
    audiences: ["Membres de la communauté", "Étudiants", "Passionnés de Web3"],
    status:
      "Le programme d'ambassadeurs prend forme. Rejoignez le Discord pour en faire partie dès le début.",
  },
  offer: {
    eyebrow: "Ce que vous obtenez",
    title: "Un rôle au cœur de la communauté",
    items: [
      {
        icon: "sprout",
        title: "Une reconnaissance de votre impact",
        content:
          "Les ambassadeurs qui font grandir l'écosystème Monark sont récompensés pour leur impact.",
      },
      {
        icon: "users",
        title: "Une communauté derrière vous",
        content:
          "Construisez aux côtés des développeurs, des étudiants et des partenaires qui travaillent déjà avec Monark.",
      },
      {
        icon: "map-pin",
        title: "Un pôle local à bâtir",
        content:
          "Créez un lieu d'éducation, de collaboration et de projets Web3 dans votre propre communauté.",
      },
      {
        icon: "heart-handshake",
        title: "Une mission qui vaut d'être partagée",
        content:
          "Un écosystème ouvert qui grandit un module, un projet et une ville à la fois.",
      },
    ],
    note: {
      title: "Les détails restent à venir",
      content:
        "Le fonctionnement des récompenses et ce que le programme demande aux ambassadeurs seront précisés au lancement. Des questions ? Posez-les-nous sur Discord.",
    },
  },
  steps: {
    eyebrow: "Comment ça marche",
    title: "Comment vous impliquer",
    intro:
      "Le programme est encore en cours de définition : ces étapes pourront évoluer d'ici son lancement.",
    items: [
      {
        title: "Rejoignez la communauté",
        content:
          "Tout commence sur Discord : rencontrez l'équipe et celles et ceux qui construisent déjà avec Monark.",
      },
      {
        title: "Dites-nous où vous êtes",
        content:
          "Votre ville, votre campus ou votre communauté, et ce que vous aimeriez y faire.",
      },
      {
        title: "Représentez Monark",
        content:
          "Faites connaître la mission de Monark, accueillez de nouvelles personnes et aidez-les à trouver leur place.",
      },
      {
        title: "Faites vivre un pôle local",
        content:
          "Rassemblez les gens autour de l'éducation, de la collaboration et du développement de projets Web3.",
      },
    ],
  },
  fit: {
    eyebrow: "Pour qui",
    title: "Des gens qui veulent que le Web3 serve leur communauté",
    who_title: "Ce rôle est peut-être pour vous si",
    who: [
      "Le Web3 vous passionne et vous voulez que plus de gens en profitent",
      "Vous partagez les valeurs de Monark : accessibilité, transparence, collaboration, durabilité et innovation",
      "Vous êtes attaché à une ville, un campus ou une communauté que vous voulez faire grandir",
    ],
    expect_title: "Ce que fait un ambassadeur",
    expect: [
      "Il représente les valeurs et la mission de Monark",
      "Il accueille de nouvelles personnes dans l'écosystème Monark",
      "Il aide à créer des pôles locaux d'éducation, de collaboration et de développement de projets",
    ],
  },
  proof: {
    eyebrow: "Où l'on s'en va",
    title: "Construit au grand jour, comme le reste de Monark",
    content:
      "Monark a annoncé son programme d'ambassadeurs en même temps que son travail avec les universités et son incubateur. Son catalogue de projets comprend le genre d'outils dont ces programmes ont besoin.",
    items: [
      {
        label: "Nouvelle",
        title: "Ce que Monark construit et pourquoi",
        content:
          "L'article qui a présenté le programme d'ambassadeurs, avec le travail universitaire, l'incubateur et les projets actifs de Monark.",
        href: "/learn/news/what-monark-is-building-and-why",
      },
      {
        label: "Projet · En cours",
        title: "Reffinity",
        content:
          "Un système de parrainage on-chain qui enregistre qui a invité qui et récompense les étapes franchies en toute transparence, pensé pour les programmes d'ambassadeurs et les réseaux d'affiliation.",
        href: "/project/referral-system",
      },
    ],
    link: { label: "Voir tous les projets", href: "/project" },
  },
  cta: {
    title: "Envie de représenter Monark ?",
    content:
      "Rejoignez le Discord et dites-nous où vous aimeriez faire grandir la communauté. Nous vous tiendrons au courant du lancement du programme.",
    primary: { label: "Rejoindre le Discord", href: DISCORD_URL, external: true },
    secondary: { label: "Contacter l'équipe", href: "/form/contact" },
  },
};
