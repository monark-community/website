/**
 * Industry page (en/fr). Replaces content/{en,fr}/participate/industry: the
 * partnership pitch, what Monark looks for, what partners get and the four
 * steps are kept; the proof block reuses the live projects named in the news
 * article "What Monark is building and why", which match the sectors the old
 * page listed (finance, healthcare, supply chain).
 */
import { ParticipateContent } from "./participate.types";
import { DISCORD_URL } from "./participate-shared.i18n";

export const en: ParticipateContent = {
  meta: {
    title: "Industry Partners",
    description:
      "Partner with Monark to test Web3 ideas from your sector at a fraction of traditional R&D costs: bring a real challenge, and a student-led team co-develops and tests a decentralized proof of concept with you.",
  },
  hero: {
    eyebrow: "Participate as an industry partner",
    title: "Test What Web3 Can Do for Your Sector, at a Fraction of the Cost",
    lead: "Bring a real-world challenge: a student-led team explores it with you through proofs of concept, not slide decks.",
    audiences_label: "For",
    audiences: [
      "Finance",
      "Healthcare",
      "Supply chain",
      "Energy",
      "And beyond",
    ],
    highlights: [
      { value: "Real challenges", label: "from your own sector" },
      { value: "Student-led", label: "project teams" },
      { value: "A fraction", label: "of traditional R&D costs" },
    ],
  },
  offer: {
    eyebrow: "What you get",
    title: "An Early, Hands-On Look at Web3 in Your Industry",
    intro:
      "See how blockchain, smart contracts (programs that run on a blockchain) and decentralized identity could reshape your industry, before committing to a full project.",
    items: [
      {
        icon: "flask-conical",
        title: "Proofs of Concept, Fast",
        content:
          "Ideas tested quickly and cost-effectively, at a fraction of traditional R&D costs.",
      },
      {
        icon: "user-plus",
        title: "Access to Talent",
        content:
          "Work with motivated students and young developers who use the latest tools and frameworks.",
      },
      {
        icon: "heart-handshake",
        title: "Hands-On Collaboration",
        content:
          "Bring your domain expertise directly into the design and testing of decentralized applications.",
      },
      {
        icon: "eye",
        title: "Visibility",
        content:
          "Be seen as an innovator exploring Web3 with the next generation of builders.",
      },
      {
        icon: "route",
        title: "A Path to Scale",
        content:
          "Promising directions can grow into full-fledged projects.",
      },
      {
        icon: "lightbulb",
        title: "Early Exposure",
        content:
          "Find out early how Web3 opportunities apply to your own field.",
      },
    ],
  },
  steps: {
    eyebrow: "How it works",
    title: "Four Steps from a Challenge to Results",
    items: [
      {
        title: "Share Your Challenge or Idea",
        content: "Tell us about a real problem in your field that decentralized technology might solve.",
      },
      {
        title: "Monark Assembles a Team",
        content: "We put together a student-led project team around your challenge.",
      },
      {
        title: "Co-Develop and Test",
        content:
          "Together, we design and test decentralized solutions, with your expertise guiding the direction.",
      },
      {
        title: "Get Results and Insights",
        content:
          "You receive the results and what was learned, with the option to take promising directions further.",
      },
    ],
  },
  fit: {
    eyebrow: "Who fits",
    title: "What We're Looking For in a Partner",
    intro:
      "Partners across industries, curious about Web3 and ready to take part as active collaborators, not from the sidelines.",
    who_title: "Good Partners Bring",
    who: [
      "Real-world challenges or datasets",
      "Domain expertise to guide the project's direction",
      "Feedback on prototypes and early experiments",
    ],
    expect_title: "Sectors We Can Explore Together",
    expect: [
      "Finance and insurance",
      "Healthcare",
      "Supply chain and logistics",
      "Energy, and beyond",
    ],
  },
  proof: {
    eyebrow: "Already under way",
    title: "Web3 Solutions for Real Sectors",
    content:
      "Monark builds tools that answer concrete problems, beyond speculative trends. A few projects from our catalogue:",
    items: [
      {
        label: "Supply chain · In progress",
        title: "ChainProof",
        content: "Supply chain transparency through blockchain-backed traceability.",
        href: "/project/supply-chain-tracking",
      },
      {
        label: "Healthcare · Prototype available",
        title: "Cura",
        content:
          "Medical data exchange that protects privacy while enabling AI research.",
        href: "/project/zk-medical-data-exchange",
      },
      {
        label: "Finance · Prototype available",
        title: "LedgerLift",
        content:
          "Multichain accounting that turns wallet activity into accounting-ready reports.",
        href: "/project/accounting-blockchain-data-extraction",
      },
    ],
    link: { label: "Browse all projects", href: "/project" },
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions from Industry Partners",
    items: [
      {
        question: "Who does the development work?",
        answer:
          "A student-led project team assembled by Monark, with your domain expertise guiding the direction and your feedback on each prototype.",
      },
      {
        question: "What do we need to bring?",
        answer:
          "A real challenge or dataset, your domain expertise, and feedback on prototypes and early experiments.",
      },
      {
        question: "Does our industry need to be \"Web3\" already?",
        answer:
          "No. Partners come from finance, healthcare, supply chain, energy and beyond. The point is to find out what decentralized technology could change in your field.",
      },
      {
        question: "What happens after the proof of concept?",
        answer:
          "You get the results and insights. If a direction is promising, it can grow into a full-fledged project.",
      },
    ],
  },
  cta: {
    title: "Let's Start the Conversation",
    content:
      "Tell us about your challenge on Discord. Your expertise and our experimentation can open up entirely new possibilities.",
    primary: { label: "Join us on Discord", href: DISCORD_URL, external: true },
    secondary: { label: "Contact the team", href: "/form/contact" },
  },
};

export const fr: ParticipateContent = {
  meta: {
    title: "Partenaires industriels",
    description:
      "Devenez partenaire de Monark pour tester des idées Web3 dans votre secteur à une fraction du coût d'une R&D traditionnelle : apportez un défi concret, et une équipe étudiante co-développe et teste avec vous une preuve de concept décentralisée.",
  },
  hero: {
    eyebrow: "Participer en tant que partenaire industriel",
    title: "Découvrez ce que le Web3 peut faire pour votre secteur, à moindre coût",
    lead: "Apportez un défi concret : une équipe étudiante l'explore avec vous par des preuves de concept, pas par des présentations.",
    audiences_label: "Pour",
    audiences: ["Finance", "Santé", "Logistique", "Énergie", "Et bien d'autres"],
    highlights: [
      { value: "De vrais défis", label: "issus de votre secteur" },
      { value: "Des équipes", label: "menées par des étudiants" },
      { value: "Une fraction", label: "du coût d'une R&D traditionnelle" },
    ],
  },
  offer: {
    eyebrow: "Ce que vous obtenez",
    title: "Un regard concret et précoce sur le Web3 dans votre industrie",
    intro:
      "Voyez comment la blockchain, les contrats intelligents (des programmes qui s'exécutent sur une blockchain) et l'identité décentralisée pourraient transformer votre industrie, avant de vous engager dans un projet complet.",
    items: [
      {
        icon: "flask-conical",
        title: "Des preuves de concept, rapidement",
        content:
          "Des idées testées vite et à moindre coût, pour une fraction du prix d'une R&D traditionnelle.",
      },
      {
        icon: "user-plus",
        title: "L'accès aux talents",
        content:
          "Travaillez avec des étudiants motivés et de jeunes développeurs qui maîtrisent les outils les plus récents.",
      },
      {
        icon: "heart-handshake",
        title: "Une collaboration concrète",
        content:
          "Apportez votre expertise directement dans la conception et les tests d'applications décentralisées.",
      },
      {
        icon: "eye",
        title: "De la visibilité",
        content:
          "Affichez-vous comme un innovateur qui explore le Web3 avec la nouvelle génération.",
      },
      {
        icon: "route",
        title: "Une voie pour grandir",
        content:
          "Les pistes prometteuses peuvent devenir des projets à part entière.",
      },
      {
        icon: "lightbulb",
        title: "Une longueur d'avance",
        content:
          "Découvrez tôt comment les possibilités du Web3 s'appliquent à votre domaine.",
      },
    ],
  },
  steps: {
    eyebrow: "Comment ça marche",
    title: "Quatre étapes, du défi aux résultats",
    items: [
      {
        title: "Vous partagez votre défi ou votre idée",
        content:
          "Parlez-nous d'un problème réel de votre domaine que la technologie décentralisée pourrait résoudre.",
      },
      {
        title: "Monark forme une équipe",
        content: "Nous réunissons une équipe projet menée par des étudiants autour de votre défi.",
      },
      {
        title: "On co-développe et on teste",
        content:
          "Ensemble, nous concevons et testons des solutions décentralisées, orientées par votre expertise.",
      },
      {
        title: "Vous recevez résultats et analyses",
        content:
          "Vous obtenez les résultats et les apprentissages, avec la possibilité de poursuivre les pistes prometteuses.",
      },
    ],
  },
  fit: {
    eyebrow: "Pour qui",
    title: "Ce que nous recherchons chez un partenaire",
    intro:
      "Des partenaires de tous les secteurs, curieux du Web3 et prêts à s'impliquer en collaborateurs actifs, pas en spectateurs.",
    who_title: "Un bon partenaire apporte",
    who: [
      "Des défis concrets ou des jeux de données",
      "Une expertise métier pour orienter le projet",
      "Des retours sur les prototypes et les premières expérimentations",
    ],
    expect_title: "Des secteurs à explorer ensemble",
    expect: [
      "Finance et assurance",
      "Santé",
      "Chaîne d'approvisionnement et logistique",
      "Énergie, et bien d'autres",
    ],
  },
  proof: {
    eyebrow: "Déjà en route",
    title: "Des solutions Web3 pour de vrais secteurs",
    content:
      "Monark construit des outils qui répondent à des problèmes concrets, loin des effets de mode. Quelques projets de notre catalogue :",
    items: [
      {
        label: "Logistique · En cours",
        title: "ChainProof",
        content:
          "La transparence des chaînes d'approvisionnement grâce à une traçabilité appuyée sur la blockchain.",
        href: "/project/supply-chain-tracking",
      },
      {
        label: "Santé · Prototype disponible",
        title: "Cura",
        content:
          "Un échange de données médicales qui protège la vie privée tout en rendant possible la recherche en IA.",
        href: "/project/zk-medical-data-exchange",
      },
      {
        label: "Finance · Prototype disponible",
        title: "LedgerLift",
        content:
          "Une comptabilité multichaîne qui transforme l'activité d'un portefeuille en rapports prêts pour la comptabilité.",
        href: "/project/accounting-blockchain-data-extraction",
      },
    ],
    link: { label: "Voir tous les projets", href: "/project" },
  },
  faq: {
    eyebrow: "FAQ",
    title: "Les questions des partenaires industriels",
    items: [
      {
        question: "Qui réalise le développement ?",
        answer:
          "Une équipe projet menée par des étudiants et réunie par Monark, orientée par votre expertise métier et vos retours sur chaque prototype.",
      },
      {
        question: "Que devons-nous apporter ?",
        answer:
          "Un défi concret ou un jeu de données, votre expertise métier, et vos retours sur les prototypes et les premières expérimentations.",
      },
      {
        question: "Notre industrie doit-elle déjà être « Web3 » ?",
        answer:
          "Non. Nos partenaires viennent de la finance, de la santé, de la logistique, de l'énergie et d'ailleurs. L'idée est justement de découvrir ce que la technologie décentralisée pourrait changer dans votre domaine.",
      },
      {
        question: "Que se passe-t-il après la preuve de concept ?",
        answer:
          "Vous recevez les résultats et les analyses. Si une piste est prometteuse, elle peut devenir un projet à part entière.",
      },
    ],
  },
  cta: {
    title: "Démarrons la conversation",
    content:
      "Parlez-nous de votre défi sur Discord. Votre expertise et notre expérimentation peuvent ouvrir de toutes nouvelles possibilités.",
    primary: { label: "Rejoindre le Discord", href: DISCORD_URL, external: true },
    secondary: { label: "Contacter l'équipe", href: "/form/contact" },
  },
};
