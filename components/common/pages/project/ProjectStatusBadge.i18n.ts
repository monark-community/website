// ProjectStatusBadge.i18n.ts
// Localization keys for project status badge

export const projectStatusBadgeI18n = {
  en: {
    status: "Status",
    idea: "Idea",
    prototype_available: "Prototype Available",
    in_progress: "In Progress",
    market_validation: "Market Validation",
    live: "Live",
  },
  fr: {
    status: "Statut",
    idea: "Idée",
    prototype_available: "Prototype disponible",
    in_progress: "En cours",
    market_validation: "Validation du marché",
    live: "En ligne",
  },
};

export type ProjectStatusKey = keyof typeof projectStatusBadgeI18n["en"];
