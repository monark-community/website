export interface ErrorI18n {
  title: string;
  subtitle: string;
  content_1: {
    description: string;
    actions: {
      home: string;
    };
  };
}

export interface I18n {
  error_definitions: {
    "400": ErrorI18n;
    "401": ErrorI18n;
    "403": ErrorI18n;
    "404": ErrorI18n;
    "405": ErrorI18n;
    "408": ErrorI18n;
    "409": ErrorI18n;
    "410": ErrorI18n;
    "418": ErrorI18n;
    "429": ErrorI18n;
    "500": ErrorI18n;
    "501": ErrorI18n;
    "502": ErrorI18n;
    "503": ErrorI18n;
    "504": ErrorI18n;
  };
  fun_facts: string[];
}

export const en: I18n = {
  error_definitions: {
    "400": {
      title: "Bad Request",
      subtitle:
        "Something went wrong with your request. Let's adjust our flight path!",
      content_1: {
        description: "Check your input and try again.",
        actions: { home: "Return to the homepage" },
      },
    },
    "401": {
      title: "Unauthorized",
      subtitle:
        "You don't have the right permissions to access this area. Please authenticate to continue!",
      content_1: {
        description: "Try refreshing the page or come back later.",
        actions: { home: "Return to the homepage" },
      },
    },
    "403": {
      title: "Forbidden",
      subtitle: "This space is restricted—only verified butterflies can enter!",
      content_1: {
        description:
          "Ensure you have the right permissions or contact support.",
        actions: { home: "Return to the homepage" },
      },
    },
    "404": {
      title: "Not Found",
      subtitle:
        "This page has fluttered away 🦋 — But don't worry, in a strong community, no one gets lost for long!",
      content_1: {
        description: "Get back on track.",
        actions: { home: "Return to the homepage" },
      },
    },
    "405": {
      title: "Method Not Allowed",
      subtitle:
        "The method used isn't supported here. Let's adjust our flight path!",
      content_1: {
        description: "Try a different action or return to safety.",
        actions: { home: "Return to the homepage" },
      },
    },
    "408": {
      title: "Request Timeout",
      subtitle:
        "Your request took too long—our butterflies don't wait forever!",
      content_1: {
        description: "Please try again with a stronger connection.",
        actions: { home: "Return to the homepage" },
      },
    },
    "409": {
      title: "Conflict",
      subtitle: "There's a disagreement between requests—let's smooth it out!",
      content_1: {
        description: "Resolve conflicts and try again.",
        actions: { home: "Return to the homepage" },
      },
    },
    "410": {
      title: "Gone",
      subtitle: "This resource has flown away and is no longer available!",
      content_1: {
        description: "Try searching for something else.",
        actions: { home: "Return to the homepage" },
      },
    },
    "418": {
      title: "I'm a Teapot",
      subtitle:
        "Even butterflies need humor! This server refuses to brew coffee.",
      content_1: {
        description: "Try a different request.",
        actions: { home: "Return to the homepage" },
      },
    },
    "429": {
      title: "Too Many Requests",
      subtitle: "Too many requests! Give our network a moment to breathe.",
      content_1: {
        description: "Wait a bit before trying again.",
        actions: { home: "Return to the homepage" },
      },
    },
    "500": {
      title: "Internal Server Error",
      subtitle:
        "Something broke on our side. Even the best wings sometimes need rest!",
      content_1: {
        description: "We're working on it—please try again later.",
        actions: { home: "Return to the homepage" },
      },
    },
    "501": {
      title: "Not Implemented",
      subtitle:
        "Oops! This feature isn't implemented yet. We're working on it!",
      content_1: {
        description: "This functionality is currently unavailable.",
        actions: { home: "Return to the homepage" },
      },
    },
    "502": {
      title: "Bad Gateway",
      subtitle: "A gateway issue has caused turbulence in our flight path!",
      content_1: {
        description: "Give it a moment, then try again.",
        actions: { home: "Return to the homepage" },
      },
    },
    "503": {
      title: "Service Unavailable",
      subtitle:
        "The network is undergoing maintenance or is overwhelmed—our butterflies need a break!",
      content_1: {
        description: "Please check back soon.",
        actions: { home: "Return to the homepage" },
      },
    },
    "504": {
      title: "Gateway Timeout",
      subtitle:
        "The request took too long to complete. The breeze must have slowed down!",
      content_1: {
        description: "Try again later when the conditions improve.",
        actions: { home: "Return to the homepage" },
      },
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
  error_definitions: {
    "400": {
      title: "Mauvaise requête",
      subtitle:
        "Il y a eu un problème avec votre demande. Ajustons notre trajectoire !",
      content_1: {
        description: "Vérifiez votre entrée et réessayez.",
        actions: { home: "Retour à la page d'accueil" },
      },
    },
    "401": {
      title: "Non autorisé",
      subtitle:
        "Vous n'avez pas les permissions nécessaires pour accéder à cette zone. Veuillez vous authentifier pour continuer !",
      content_1: {
        description: "Essayez de rafraîchir la page ou revenez plus tard.",
        actions: { home: "Retour à la page d'accueil" },
      },
    },
    "403": {
      title: "Interdit",
      subtitle:
        "Cet espace est restreint—seules les papillons vérifiés peuvent entrer !",
      content_1: {
        description:
          "Assurez-vous d'avoir les bonnes permissions ou contactez le support.",
        actions: { home: "Retour à la page d'accueil" },
      },
    },
    "404": {
      title: "Non trouvé",
      subtitle:
        "Cette page s'est envolée 🦋 — Mais ne vous inquiétez pas, dans une communauté forte, personne ne se perd longtemps !",
      content_1: {
        description: "Reprenez votre chemin.",
        actions: { home: "Retour à la page d'accueil" },
      },
    },
    "405": {
      title: "Méthode non autorisée",
      subtitle:
        "La méthode utilisée n'est pas supportée ici. Ajustons notre trajectoire !",
      content_1: {
        description: "Essayez une autre action ou retournez en sécurité.",
        actions: { home: "Retour à la page d'accueil" },
      },
    },
    "408": {
      title: "Délai d'attente de la requête",
      subtitle:
        "Votre requête a pris trop de temps—nos papillons n'attendent pas éternellement !",
      content_1: {
        description: "Essayez à nouveau avec une connexion plus stable.",
        actions: { home: "Retour à la page d'accueil" },
      },
    },
    "409": {
      title: "Conflit",
      subtitle: "Il y a un désaccord entre les demandes—aplanissons-le !",
      content_1: {
        description: "Résolvez les conflits et réessayez.",
        actions: { home: "Retour à la page d'accueil" },
      },
    },
    "410": {
      title: "Disparu",
      subtitle: "Cette ressource s'est envolée et n'est plus disponible !",
      content_1: {
        description: "Essayez de chercher quelque chose d'autre.",
        actions: { home: "Retour à la page d'accueil" },
      },
    },
    "418": {
      title: "Je suis une théière",
      subtitle:
        "Même les papillons ont de l'humour ! Ce serveur refuse de préparer du café.",
      content_1: {
        description: "Essayez une autre requête.",
        actions: { home: "Retour à la page d'accueil" },
      },
    },
    "429": {
      title: "Trop de requêtes",
      subtitle:
        "Trop de requêtes ! Laissez un moment à notre réseau pour respirer.",
      content_1: {
        description: "Attendez un peu avant d'essayer à nouveau.",
        actions: { home: "Retour à la page d'accueil" },
      },
    },
    "500": {
      title: "Erreur interne du serveur",
      subtitle:
        "Quelque chose a cassé de notre côté. Même les meilleures ailes ont parfois besoin de repos !",
      content_1: {
        description: "Nous y travaillons—veuillez réessayer plus tard.",
        actions: { home: "Retour à la page d'accueil" },
      },
    },
    "501": {
      title: "Non implémenté",
      subtitle:
        "Oups ! Cette fonctionnalité n'est pas encore implémentée. Nous y travaillons !",
      content_1: {
        description: "Cette fonctionnalité est actuellement indisponible.",
        actions: { home: "Retour à la page d'accueil" },
      },
    },
    "502": {
      title: "Mauvaise passerelle",
      subtitle:
        "Un problème de passerelle a causé des turbulences dans notre trajectoire !",
      content_1: {
        description: "Laissez un moment, puis réessayez.",
        actions: { home: "Retour à la page d'accueil" },
      },
    },
    "503": {
      title: "Service indisponible",
      subtitle:
        "Le réseau est en maintenance ou est surchargé—nos papillons ont besoin d'une pause !",
      content_1: {
        description: "Veuillez revenir bientôt.",
        actions: { home: "Retour à la page d'accueil" },
      },
    },
    "504": {
      title: "Délai d'attente de la passerelle",
      subtitle:
        "La requête a pris trop de temps à se terminer. La brise doit avoir ralenti !",
      content_1: {
        description:
          "Essayez à nouveau plus tard lorsque les conditions s'amélioreront.",
        actions: { home: "Retour à la page d'accueil" },
      },
    },
  },
  fun_facts: [
    "✨ Fait intéressant sur les monarques : ils peuvent parcourir plus de 100 miles en un seul jour, avec les bonnes conditions !",
    "🦋 Fait intéressant sur les monarques : ils volent souvent à des altitudes où nous ne pouvons même pas les voir du sol, à 800 à 1 200 pieds de hauteur !",
    "🌍 Fait intéressant sur les monarques : ils ne migrent qu'une seule fois. Leur courte durée de vie signifie qu'ils ne peuvent migrer qu'une seule fois (vers le nord ou le sud) dans leur vie.",
    "🫂 Fait intéressant sur les monarques : La plupart de ce que nous savons sur les monarques provient de la science communautaire !",
  ],
};
