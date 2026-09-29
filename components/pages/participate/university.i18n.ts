/**
 * University page (en/fr). Replaces content/{en,fr}/participate/university:
 * its three offers (end-of-degree projects, blockchain associations,
 * incubation) become the three tracks of "What you get". The proof block is
 * the CryptoSys collaboration with the Université de Sherbrooke, from the
 * news article "Pioneer in supporting university projects".
 */
import { ParticipateContent } from "./participate.types";
import { DISCORD_URL } from "./participate-shared.i18n";

export const en: ParticipateContent = {
  meta: {
    title: "Universities and students",
    description:
      "End-of-degree Web3 projects with real mandates and mentors, support for campus blockchain associations, and incubation for the projects worth taking further. Monark works with universities, professors and students.",
  },
  hero: {
    eyebrow: "Participate as a university",
    title: "Real Web3 projects for students, from the classroom to launch",
    lead: "Monark works with universities, professors and student clubs: end-of-degree projects with real-world mandates, support for campus blockchain associations, and incubation for the projects worth taking further.",
    audiences_label: "For",
    audiences: [
      "Software engineering students",
      "Professors",
      "Student blockchain associations",
      "Universities",
    ],
    highlights: [
      { value: "3 ways in", label: "projects, clubs and incubation" },
      { value: "Real mandates", label: "with community or industry impact" },
      { value: "Mentors", label: "from Web3 development and product" },
    ],
  },
  offer: {
    eyebrow: "What you get",
    title: "Three ways to work with Monark",
    intro:
      "Monark has already partnered with several universities and student groups. Pick the track that fits where you are.",
    tracks: [
      {
        icon: "graduation-cap",
        title: "End-of-degree projects",
        intro:
          "Turn your final project into one you'll actually be proud of, with a real Web3 mandate.",
        items: [
          "Blockchain use cases with community or industry impact",
          "A curated list of project ideas, or the freedom to pitch your own",
          "Tools and documentation to build faster and smarter",
          "Mentorship by Web3 developers and product experts",
          "Sprint-style follow-ups, just like in real tech teams",
          "Full academic alignment: mandates are approved with your professors",
        ],
      },
      {
        icon: "school",
        title: "Blockchain associations",
        intro:
          "Already in a campus blockchain club, or thinking of starting one? We help you structure it and grow.",
        items: [
          "Starter kits and branding assets to launch or upgrade your club",
          "Templates and tools for governance, onboarding and event planning",
          "Funding support for workshops, hackathons, speaker panels and meetups",
          "Direct access to Monark's mentors and partner networks",
          "Visibility and collaboration through our national student network",
          "Your events and wins featured on Monark's platform and socials",
        ],
      },
      {
        icon: "rocket",
        title: "Incubation",
        intro:
          "Just finished your end-of-degree project and want to keep building? Take your prototype further.",
        items: [
          "4 to 12 month support cycles, at no upfront cost",
          "Sprint-based mentorship, goal setting and strategic reviews",
          "Administrative and legal templates",
          "Preparation for grants from leading Web3 foundations",
          "You keep full ownership of your project",
        ],
        link: { label: "See the incubation program", href: "/participate/developer" },
      },
    ],
  },
  steps: {
    eyebrow: "How it works",
    title: "An end-of-degree project with Monark, step by step",
    items: [
      {
        title: "Pick or pitch a project",
        content:
          "Choose from our curated project ideas, or bring your own Web3 idea.",
      },
      {
        title: "Align with your professors",
        content:
          "The mandate is approved alongside your professors, so it fits your program's requirements.",
      },
      {
        title: "Build in sprints, with mentors",
        content:
          "Web3 developers and product experts follow up with you at every sprint, like in a real tech team.",
      },
      {
        title: "Go further",
        content:
          "Your project could lead to grants, a place in our incubation program, or even launch as a Monark-integrated module.",
      },
    ],
  },
  fit: {
    eyebrow: "Who fits",
    title: "For students, professors and clubs",
    who_title: "Monark is a good match for",
    who: [
      "Software engineering students nearing the end of their degree",
      "Students who want to explore blockchain or try a new challenge",
      "Campus blockchain clubs, or students who want to start one",
      "Professors looking for real-world Web3 mandates for their students",
    ],
    expect_title: "What Monark expects",
    expect: [
      "A project approved with your professors, so academic and project goals line up",
      "Regular sprint follow-ups with your mentors",
      "For clubs: a drive to push Web3 adoption on your campus",
    ],
  },
  proof: {
    eyebrow: "Track record",
    title: "It started at the Université de Sherbrooke",
    content:
      "Monark's approach grew out of CryptoSys, a decentralized accounting system designed by students at the Université de Sherbrooke with EOS Nation and Vincent Grenier, Monark's founder. It showed what students can build when industry professionals guide them.",
    items: [
      {
        label: "Université de Sherbrooke",
        title: "CryptoSys",
        content:
          "A decentralized accounting system, and the collaboration behind Monark's way of mentoring university projects.",
        href: "/learn/news/pioneer-in-university-projects-mentorship",
      },
      {
        label: "Project ideas",
        title: "The Monark project catalogue",
        content:
          "Web3 project ideas and projects under way, ready to become end-of-degree mandates.",
        href: "/project",
      },
    ],
    link: {
      label: "Read the CryptoSys story",
      href: "/learn/news/pioneer-in-university-projects-mentorship",
    },
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions from students and universities",
    items: [
      {
        question: "Can I propose my own project idea?",
        answer:
          "Yes. Pick from our curated list of project ideas, or pitch your own.",
      },
      {
        question: "Will the project count for my degree?",
        answer:
          "Mandates are approved alongside your professors, for full academic alignment.",
      },
      {
        question: "We don't have a blockchain club yet. Can you help?",
        answer:
          "Yes. We support existing associations and help students build one from scratch, with starter kits, templates and tools.",
      },
      {
        question: "What happens after my end-of-degree project?",
        answer:
          "If you want to keep building, your project can lead to grants, to Monark's incubation program, or even launch as a Monark-integrated module.",
      },
    ],
  },
  cta: {
    title: "Bring Web3 to your campus",
    content:
      "Students, professors and clubs: say hello on Discord and tell us what you'd like to build.",
    primary: { label: "Join us on Discord", href: DISCORD_URL, external: true },
    secondary: { label: "Submit a project", href: "/form/project-proposal" },
  },
};

export const fr: ParticipateContent = {
  meta: {
    title: "Universités et étudiants",
    description:
      "Des projets de fin d'études Web3 avec de vrais mandats et des mentors, du soutien aux associations blockchain étudiantes, et l'incubation des projets qui méritent d'aller plus loin. Monark travaille avec les universités, les professeurs et les étudiants.",
  },
  hero: {
    eyebrow: "Participer en tant qu'université",
    title: "De vrais projets Web3 pour les étudiants, de la salle de classe au lancement",
    lead: "Monark collabore avec les universités, les professeurs et les clubs étudiants : des projets de fin d'études avec de vrais mandats, du soutien aux associations blockchain sur les campus, et l'incubation des projets qui méritent d'aller plus loin.",
    audiences_label: "Pour",
    audiences: [
      "Étudiants en génie logiciel",
      "Professeurs",
      "Associations blockchain étudiantes",
      "Universités",
    ],
    highlights: [
      { value: "3 parcours", label: "projets, clubs et incubation" },
      { value: "De vrais mandats", label: "à impact communautaire ou industriel" },
      { value: "Des mentors", label: "en développement Web3 et en produit" },
    ],
  },
  offer: {
    eyebrow: "Ce que vous obtenez",
    title: "Trois façons de travailler avec Monark",
    intro:
      "Monark a déjà collaboré avec plusieurs universités et groupes étudiants. Choisissez le parcours qui vous correspond.",
    tracks: [
      {
        icon: "graduation-cap",
        title: "Projets de fin d'études",
        intro:
          "Faites de votre projet final un projet dont vous serez vraiment fier, avec un vrai mandat Web3.",
        items: [
          "Des cas d'usage blockchain à impact communautaire ou industriel",
          "Une liste d'idées de projets sélectionnées, ou la liberté de proposer la vôtre",
          "Des outils et de la documentation pour avancer plus vite",
          "Le mentorat de développeurs Web3 et d'experts produit",
          "Des suivis en mode sprint, comme dans les vraies équipes tech",
          "Un alignement académique complet : les mandats sont validés avec vos professeurs",
        ],
      },
      {
        icon: "school",
        title: "Associations blockchain",
        intro:
          "Vous faites partie d'un club blockchain sur votre campus, ou vous voulez en lancer un ? Nous vous aidons à le structurer et à le faire grandir.",
        items: [
          "Des trousses de démarrage et des éléments de marque pour lancer ou relancer votre club",
          "Des modèles et outils pour la gouvernance, l'accueil des membres et les événements",
          "Du soutien financier pour vos ateliers, hackathons, conférences et rencontres",
          "Un accès direct aux mentors et aux réseaux de partenaires de Monark",
          "De la visibilité et des collaborations grâce à notre réseau étudiant national",
          "Vos événements et vos succès mis en valeur sur la plateforme et les réseaux de Monark",
        ],
      },
      {
        icon: "rocket",
        title: "Incubation",
        intro:
          "Vous venez de terminer votre projet de fin d'études et voulez continuer ? Emmenez votre prototype plus loin.",
        items: [
          "Des cycles de 4 à 12 mois, sans frais initiaux",
          "Un mentorat par sprints, avec objectifs et bilans stratégiques",
          "Des modèles administratifs et juridiques",
          "La préparation aux subventions des grandes fondations Web3",
          "Vous restez pleinement propriétaire de votre projet",
        ],
        link: { label: "Découvrir le programme d'incubation", href: "/participate/developer" },
      },
    ],
  },
  steps: {
    eyebrow: "Comment ça marche",
    title: "Un projet de fin d'études avec Monark, étape par étape",
    items: [
      {
        title: "Choisissez ou proposez un projet",
        content:
          "Piochez dans nos idées de projets, ou apportez votre propre idée Web3.",
      },
      {
        title: "Validez-le avec vos professeurs",
        content:
          "Le mandat est approuvé avec vos professeurs, pour qu'il réponde aux exigences de votre programme.",
      },
      {
        title: "Avancez par sprints, avec des mentors",
        content:
          "Des développeurs Web3 et des experts produit font le suivi avec vous à chaque sprint, comme dans une vraie équipe tech.",
      },
      {
        title: "Allez plus loin",
        content:
          "Votre projet pourrait mener à des subventions, à une place dans notre programme d'incubation, voire devenir un module intégré à Monark.",
      },
    ],
  },
  fit: {
    eyebrow: "Pour qui",
    title: "Pour les étudiants, les professeurs et les clubs",
    who_title: "Monark vous correspond si vous êtes",
    who: [
      "Étudiant en génie logiciel en fin de baccalauréat",
      "Étudiant curieux d'explorer la blockchain ou de relever un nouveau défi",
      "Membre d'un club blockchain, ou partant pour en fonder un",
      "Professeur à la recherche de mandats Web3 concrets pour vos étudiants",
    ],
    expect_title: "Ce que Monark attend",
    expect: [
      "Un projet validé avec vos professeurs, pour que les objectifs académiques et ceux du projet concordent",
      "Des suivis de sprint réguliers avec vos mentors",
      "Pour les clubs : l'envie de faire avancer l'adoption du Web3 sur votre campus",
    ],
  },
  proof: {
    eyebrow: "Nos réalisations",
    title: "Tout a commencé à l'Université de Sherbrooke",
    content:
      "L'approche de Monark est née de CryptoSys, un système comptable décentralisé conçu par des étudiants de l'Université de Sherbrooke avec EOS Nation et Vincent Grenier, fondateur de Monark. Le projet a montré ce que des étudiants peuvent bâtir quand des professionnels de l'industrie les guident.",
    items: [
      {
        label: "Université de Sherbrooke",
        title: "CryptoSys",
        content:
          "Un système comptable décentralisé, et la collaboration à l'origine de la façon dont Monark encadre les projets universitaires.",
        href: "/learn/news/pioneer-in-university-projects-mentorship",
      },
      {
        label: "Idées de projets",
        title: "Le catalogue de projets Monark",
        content:
          "Des idées de projets Web3 et des projets en cours, prêts à devenir des mandats de fin d'études.",
        href: "/project",
      },
    ],
    link: {
      label: "Lire l'histoire de CryptoSys",
      href: "/learn/news/pioneer-in-university-projects-mentorship",
    },
  },
  faq: {
    eyebrow: "FAQ",
    title: "Les questions des étudiants et des universités",
    items: [
      {
        question: "Puis-je proposer ma propre idée de projet ?",
        answer:
          "Oui. Choisissez parmi nos idées de projets sélectionnées, ou proposez la vôtre.",
      },
      {
        question: "Le projet comptera-t-il pour mon diplôme ?",
        answer:
          "Les mandats sont validés avec vos professeurs, pour un alignement académique complet.",
      },
      {
        question: "Nous n'avons pas encore de club blockchain. Pouvez-vous nous aider ?",
        answer:
          "Oui. Nous soutenons les associations existantes et aidons les étudiants à en créer une de zéro, avec des trousses de démarrage, des modèles et des outils.",
      },
      {
        question: "Que se passe-t-il après mon projet de fin d'études ?",
        answer:
          "Si vous voulez continuer, votre projet peut mener à des subventions, au programme d'incubation de Monark, voire devenir un module intégré à Monark.",
      },
    ],
  },
  cta: {
    title: "Faites entrer le Web3 sur votre campus",
    content:
      "Étudiants, professeurs et clubs : venez nous saluer sur Discord et dites-nous ce que vous aimeriez construire.",
    primary: { label: "Rejoindre le Discord", href: DISCORD_URL, external: true },
    secondary: { label: "Soumettre un projet", href: "/form/project-proposal" },
  },
};
