// ProjectStatusBadge.i18n.ts
// Localization keys for project status badge

export const projectStatusBadgeI18n = {
  en: {
    status: "Status",
    planned: "Planned",
    prototype_available: "Prototype available",
    in_progress: "In progress",
    market_validation: "Market validation",
    on_hold: "On hold",
    production: "Production",
    live: "Live",
  },
  fr: {
    status: "Statut",
    planned: "Planifié",
    prototype_available: "Prototype disponible",
    in_progress: "En cours",
    market_validation: "Validation du marché",
    on_hold: "En pause",
    production: "Production",
    live: "En ligne",
  },
};

export type ProjectStatusKey = keyof typeof projectStatusBadgeI18n["en"];
