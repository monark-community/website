export interface I18n {
  title: string;
  subtitle: string;
  content_1: {
    description: string;
    actions: {
      home: string;
    };
  };
  fun_facts: string[];
}

export const en: I18n = {
  title: "Lost in the Decentralized Wilderness?",
  subtitle:
    "This page has fluttered away 🦋 — But don't worry, in a strong community, no one gets lost for long!",
  content_1: {
    description: "Get back on track",
    actions: {
      home: "Return to the homepage",
    },
  },
  fun_facts: [
    "✨ Fun fact about monarchs: They can travel over 100 miles in a single day, with the right conditions!",
    "🦋 Fun fact about monarchs: They often fly at elevations where we can't even see them from the ground, at 800 to 1,200 feet high!",
    "🌍 Fun fact about monarchs: They migrate only once. Their short lifespan means that they can only migrate once (north or south) in their lifetime.",
    "🫂 Fun fact about monarchs: Most of what we know about monarchs come from community science!",
  ],
};

export const fr: I18n = {
  title: "Perdu dans la nature décentralisée ?",
  subtitle:
    "Cette page s'est envolée 🦋 — Mais ne vous inquiétez pas, dans une communauté forte, personne ne se perd longtemps !",
  content_1: {
    description: "Remettez-vous sur la bonne voie",
    actions: {
      home: "Retourner à la page d'accueil",
    },
  },
  fun_facts: [
    "✨ Fait intéressant sur le monarque: ils peuvent parcourir plus de 100 miles en un seul jour, avec les bonnes conditions !",
    "🦋 Fait intéressant sur le monarque: ils volent souvent à des altitudes où nous ne pouvons même pas les voir du sol, à 800 à 1 200 pieds de hauteur !",
    "🌍 Fait intéressant sur le monarque: ils ne migrent qu'une seule fois. Leur courte durée de vie signifie qu'ils ne peuvent migrer qu'une seule fois (vers le nord ou le sud) dans leur vie.",
    "🫂 Fait intéressant sur le monarque: La plupart de ce que nous savons sur les monarques provient de la science communautaire !",
  ],
};
