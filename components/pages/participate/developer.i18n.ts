/**
 * Developer page (en/fr). Replaces content/{en,fr}/participate/developer:
 * the incubation program facts are kept as they were (4–12 month cycles,
 * no upfront cost, full ownership, the six offers), plus the partner
 * alignment stated on the home page and the live projects from the news
 * article "What Monark is building and why".
 */
import { ParticipateContent } from "./participate.types";
import { DISCORD_URL } from "./participate-shared.i18n";

export const en: ParticipateContent = {
  meta: {
    title: "Developers",
    description:
      "Join Monark's incubation program for developers and early-stage Web3 teams: 4 to 12 months of sprint-based mentorship, legal templates and technical guidance, at no upfront cost. You keep full ownership.",
  },
  hero: {
    eyebrow: "Participate as a developer",
    title: "Turn your Web3 idea into a product you can fund",
    lead: "Monark's incubation program is for developers and early-stage teams with a promising idea who aren't yet ready to apply to a major foundation like the Web3 Foundation. We help you get there.",
    audiences_label: "For",
    audiences: ["Developers", "Early-stage teams", "Students and recent grads"],
    highlights: [
      { value: "4–12 months", label: "support cycles" },
      { value: "No upfront cost", label: "to join the program" },
      { value: "100%", label: "of the ownership stays with you" },
    ],
  },
  offer: {
    eyebrow: "What you get",
    title: "What a young Web3 project needs to get off the ground",
    intro:
      "Mentorship, tools and strategy, so your project reaches the level where it can apply for grants from leading Web3 foundations.",
    items: [
      {
        icon: "calendar-range",
        title: "4 to 12 month support cycles",
        content: "Cycles designed to take you from an idea to a working product.",
      },
      {
        icon: "repeat",
        title: "Sprint-based mentorship",
        content:
          "Regular follow-ups, goal setting and strategic reviews, like a real product team.",
      },
      {
        icon: "file-text",
        title: "Administrative and legal templates",
        content:
          "Incorporation, NDAs, contributor agreements and more, ready to adapt.",
      },
      {
        icon: "wrench",
        title: "Technical guidance and tools",
        content:
          "Advice from Web3 developers and access to Monark's internal developer tools.",
      },
      {
        icon: "presentation",
        title: "Web3 workshops",
        content:
          "Tokenomics (how a project's token is designed and shared), governance and product design.",
      },
      {
        icon: "landmark",
        title: "Funding preparation",
        content:
          "Get ready to apply for funding from major Web3 ecosystems and foundations.",
      },
    ],
    note: {
      title: "You keep full ownership",
      content:
        "Your project stays yours. We're here to support you, not to control you.",
    },
  },
  steps: {
    eyebrow: "How it works",
    title: "From a first conversation to a grant application",
    items: [
      {
        title: "Tell us about your idea",
        content:
          "Say hello on Discord: what you're building, and where you're stuck.",
      },
      {
        title: "Join the next cohort",
        content:
          "Teams join the incubation program in cohorts, for a support cycle of 4 to 12 months.",
      },
      {
        title: "Build in sprints",
        content:
          "Set goals, build, review. Your mentors follow up at every sprint and help you adjust your strategy.",
      },
      {
        title: "Apply for grants",
        content:
          "Once your product is ready, we help you prepare your applications to leading Web3 foundations.",
      },
    ],
  },
  fit: {
    eyebrow: "Who fits",
    title: "Made for builders at the very start",
    who_title: "The program is for you if",
    who: [
      "You have an idea worth building, or an early prototype",
      "You need funding but aren't ready for a major foundation yet",
      "You're a developer or a small early-stage team",
      "You've finished an end-of-degree project with Monark and want to keep going",
    ],
    expect_title: "What Monark expects",
    expect: [
      "Take part in the sprints: follow-ups, goals and reviews are how the program works",
      "Aim for a fundable product: every cycle works towards a project ready to apply for grants",
      "Build with the tools and chains of Monark's partners, so the model stays aligned and fair",
    ],
  },
  proof: {
    eyebrow: "Already under way",
    title: "Projects moving through Monark",
    content:
      "Monark builds real tools, not just ideas. These projects from our catalogue already have a prototype or are in development, and many more ideas are waiting for a team.",
    items: [
      {
        label: "Prototype available",
        title: "LedgerLift",
        content:
          "A multichain accounting tool that turns wallet activity into accounting-ready reports.",
        href: "/project/accounting-blockchain-data-extraction",
      },
      {
        label: "Prototype available",
        title: "Cura",
        content:
          "A decentralized medical data exchange that protects privacy while enabling AI research.",
        href: "/project/zk-medical-data-exchange",
      },
      {
        label: "In progress",
        title: "ChainProof",
        content: "Supply chain transparency through blockchain-backed traceability.",
        href: "/project/supply-chain-tracking",
      },
    ],
    link: { label: "Browse all projects", href: "/project" },
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions from developers",
    items: [
      {
        question: "Does it cost anything to join?",
        answer: "No. The incubation program has no upfront cost.",
      },
      {
        question: "Do I give up ownership of my project?",
        answer:
          "No. You keep full ownership of your project. Monark is here to support you, not to control you.",
      },
      {
        question: "How long does the program last?",
        answer:
          "A support cycle runs from 4 to 12 months, designed to take you from an idea to a product.",
      },
      {
        question: "My project isn't ready for a major foundation. Is that a problem?",
        answer:
          "That's exactly who the program is for. It bridges the gap between an idea and the level a foundation such as the Web3 Foundation expects, so you can then apply for its grants.",
      },
      {
        question: "I'm a student. Can I join?",
        answer:
          "Yes. If you've just finished your end-of-degree project with Monark and want to keep building, incubation is the natural next step.",
      },
    ],
  },
  cta: {
    title: "Got an idea worth building?",
    content:
      "Come say hello on Discord and tell us about your project. We'll tell you how to join the next incubation cohort.",
    primary: { label: "Join us on Discord", href: DISCORD_URL, external: true },
    secondary: { label: "Propose a project", href: "/form/project-proposal" },
  },
};

export const fr: ParticipateContent = {
  meta: {
    title: "Développeurs",
    description:
      "Rejoignez le programme d'incubation de Monark pour les développeurs et les jeunes équipes Web3 : 4 à 12 mois de mentorat par sprints, des modèles juridiques et un accompagnement technique, sans frais initiaux. Vous restez pleinement propriétaire.",
  },
  hero: {
    eyebrow: "Participer en tant que développeur",
    title: "Faites de votre idée Web3 un produit finançable",
    lead: "Le programme d'incubation de Monark s'adresse aux développeurs et aux équipes en démarrage qui ont une idée prometteuse, mais qui ne sont pas encore prêts à solliciter une grande fondation comme la Web3 Foundation. Nous vous aidons à y arriver.",
    audiences_label: "Pour",
    audiences: [
      "Développeurs",
      "Équipes en démarrage",
      "Étudiants et jeunes diplômés",
    ],
    highlights: [
      { value: "4 à 12 mois", label: "d'accompagnement" },
      { value: "Aucuns frais", label: "initiaux pour participer" },
      { value: "100 %", label: "de la propriété vous revient" },
    ],
  },
  offer: {
    eyebrow: "Ce que vous obtenez",
    title: "Tout ce qu'il faut à un jeune projet Web3 pour décoller",
    intro:
      "Du mentorat, des outils et une stratégie, pour que votre projet atteigne le niveau requis par les grandes fondations Web3 qui octroient des subventions.",
    items: [
      {
        icon: "calendar-range",
        title: "Des cycles de 4 à 12 mois",
        content: "Pensés pour passer de l'idée à un produit qui fonctionne.",
      },
      {
        icon: "repeat",
        title: "Un mentorat par sprints",
        content:
          "Des suivis réguliers, des objectifs et des bilans stratégiques, comme dans une vraie équipe produit.",
      },
      {
        icon: "file-text",
        title: "Des modèles administratifs et juridiques",
        content:
          "Constitution d'entreprise, NDA, ententes de contribution et plus encore, prêts à adapter.",
      },
      {
        icon: "wrench",
        title: "Accompagnement et outils techniques",
        content:
          "Les conseils de développeurs Web3 et l'accès aux outils de développement internes de Monark.",
      },
      {
        icon: "presentation",
        title: "Des ateliers Web3",
        content:
          "Tokenomics (la conception et la répartition du jeton d'un projet), gouvernance et design produit.",
      },
      {
        icon: "landmark",
        title: "La préparation au financement",
        content:
          "Préparez vos demandes auprès des grands écosystèmes et fondations Web3.",
      },
    ],
    note: {
      title: "Vous restez pleinement propriétaire",
      content:
        "Votre projet vous appartient. Notre rôle est de vous soutenir, pas de prendre le contrôle.",
    },
  },
  steps: {
    eyebrow: "Comment ça marche",
    title: "De la première discussion à la demande de subvention",
    items: [
      {
        title: "Parlez-nous de votre idée",
        content:
          "Venez nous saluer sur Discord : ce que vous construisez, et là où vous bloquez.",
      },
      {
        title: "Rejoignez la prochaine cohorte",
        content:
          "Les équipes intègrent le programme par cohortes, pour un cycle de 4 à 12 mois.",
      },
      {
        title: "Avancez par sprints",
        content:
          "Fixer des objectifs, construire, faire le bilan. Vos mentors assurent le suivi à chaque sprint et vous aident à ajuster votre stratégie.",
      },
      {
        title: "Demandez des subventions",
        content:
          "Quand votre produit est prêt, nous vous aidons à préparer vos demandes auprès des grandes fondations Web3.",
      },
    ],
  },
  fit: {
    eyebrow: "Pour qui",
    title: "Pensé pour les projets tout juste lancés",
    who_title: "Le programme est fait pour vous si",
    who: [
      "Vous avez une idée qui mérite d'être construite, ou un premier prototype",
      "Vous avez besoin de financement sans être prêt pour une grande fondation",
      "Vous êtes développeur ou membre d'une petite équipe en démarrage",
      "Vous avez terminé un projet de fin d'études avec Monark et voulez aller plus loin",
    ],
    expect_title: "Ce que Monark attend",
    expect: [
      "Participer aux sprints : suivis, objectifs et bilans sont le cœur du programme",
      "Viser un produit finançable : chaque cycle mène vers un projet prêt à demander des subventions",
      "Construire avec les outils et les chaînes des partenaires de Monark, pour un modèle aligné et équitable",
    ],
  },
  proof: {
    eyebrow: "Déjà en route",
    title: "Des projets qui avancent avec Monark",
    content:
      "Monark construit de vrais outils, pas seulement des idées. Ces projets de notre catalogue ont déjà un prototype ou sont en développement, et bien d'autres idées attendent leur équipe.",
    items: [
      {
        label: "Prototype disponible",
        title: "LedgerLift",
        content:
          "Un outil comptable multichaîne qui transforme l'activité d'un portefeuille en rapports prêts pour la comptabilité.",
        href: "/project/accounting-blockchain-data-extraction",
      },
      {
        label: "Prototype disponible",
        title: "Cura",
        content:
          "Un échange décentralisé de données médicales qui protège la vie privée tout en rendant possible la recherche en IA.",
        href: "/project/zk-medical-data-exchange",
      },
      {
        label: "En cours",
        title: "ChainProof",
        content:
          "La transparence des chaînes d'approvisionnement grâce à une traçabilité appuyée sur la blockchain.",
        href: "/project/supply-chain-tracking",
      },
    ],
    link: { label: "Voir tous les projets", href: "/project" },
  },
  faq: {
    eyebrow: "FAQ",
    title: "Les questions des développeurs",
    items: [
      {
        question: "Est-ce que la participation est payante ?",
        answer: "Non. Le programme d'incubation n'a aucuns frais initiaux.",
      },
      {
        question: "Est-ce que je cède une part de mon projet ?",
        answer:
          "Non. Vous restez pleinement propriétaire de votre projet. Monark est là pour vous soutenir, pas pour prendre le contrôle.",
      },
      {
        question: "Combien de temps dure le programme ?",
        answer:
          "Un cycle d'accompagnement dure de 4 à 12 mois, le temps de passer de l'idée au produit.",
      },
      {
        question: "Mon projet n'est pas prêt pour une grande fondation. Est-ce un problème ?",
        answer:
          "C'est justement à vous que le programme s'adresse. Il fait le pont entre une idée et le niveau qu'attend une fondation comme la Web3 Foundation, pour que vous puissiez ensuite demander ses subventions.",
      },
      {
        question: "Je suis étudiant. Puis-je participer ?",
        answer:
          "Oui. Si vous venez de terminer votre projet de fin d'études avec Monark et souhaitez continuer, l'incubation est la suite logique.",
      },
    ],
  },
  cta: {
    title: "Vous avez une idée qui mérite d'être construite ?",
    content:
      "Venez nous saluer sur Discord et parlez-nous de votre projet. Nous vous expliquerons comment rejoindre la prochaine cohorte d'incubation.",
    primary: { label: "Rejoindre le Discord", href: DISCORD_URL, external: true },
    secondary: { label: "Proposer un projet", href: "/form/project-proposal" },
  },
};
