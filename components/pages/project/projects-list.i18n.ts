interface I18n {
    example: string;
    page_title: string;
    search_placeholder: string;
    not_found: string;
    back_home: string;
    description: string;
    try_search: string;
    filter_by_industry: string;
    all_industries: string;
    industries: string;
    filter_by_keyword: string;
    keywords: string;
    all_keywords: string;
    contributors: string;
    filter_by_status: string,
    all_statuses: string,
    statuses: {
        planned: string;
        prototype_available: string;
        in_progress: string;
        on_hold: string;
        market_validation: string;
        production: string;
    };
    learn_more: string;
    status: string;
    mockup: string;
    milestones: string;
    on_this_page: string;
    introduction: string;
    clear_filters: string;
    show_projects_in_industry: string;
    show_projects_with_keyword: string;
}

const en: I18n = {
    example: "Example",
    page_title: "Projects",
    search_placeholder: "Search projects…",
    not_found: "No projects found.",
    back_home: "Back home",
    description: "Discover our innovative projects that combine cutting-edge technology with sustainable solutions to create a better future.",
    try_search: "Try:",
    filter_by_industry: "Filter by industry",
    all_industries: "All industries",
    industries: "Industries",
    filter_by_keyword: "Filter by keyword",
    keywords: "Keywords",
    all_keywords: "All keywords",
    contributors: "Contributors",
    filter_by_status: "Filter by status",
    all_statuses: "All statuses",
    statuses: {
        planned: "Planned",
        prototype_available: "Prototype available",
        in_progress: "In progress",
        on_hold: "On hold",
        market_validation: "Market validation",
        production: "Production",
    },
    learn_more: "Learn more",
    status: "Status",
    mockup: "Mockup",
    milestones: "Deliverables & desired functionalities",
    on_this_page: "On this page",
    introduction: "Introduction",
    clear_filters: "Clear filters",
    show_projects_in_industry: "Show projects in {tag}",
    show_projects_with_keyword: "Show projects tagged {tag}",
};

const fr: I18n = {
    example: "Exemple",
    page_title: "Projets",
    search_placeholder: "Rechercher des projets…",
    not_found: "Aucun projet trouvé.",
    back_home: "Retour à l'accueil",
    description: "Découvrez nos projets innovants qui combinent technologie de pointe et solutions durables pour créer un avenir meilleur.",
    try_search: "Essayez :",
    filter_by_industry: "Filtrer par industrie",
    industries: "Industries",
    all_industries: "Toutes les industries",
    contributors: "Contributeurs",
    filter_by_keyword: "Filtrer par mot-clé",
    keywords: "Mots-clé",
    all_keywords: "Tous les mots-clés",
    filter_by_status: "Filtrer par statut",
    all_statuses: "Tous les statuts",
    statuses: {
        planned: "Planifié",
        prototype_available: "Prototype disponible",
        in_progress: "En cours",
        on_hold: "En pause",
        market_validation: "Validation de marché",
        production: "Production",
    },
    learn_more: "En savoir plus",
    status: "État",
    mockup: "Maquette",
    milestones: "Phases",
    on_this_page: "Sur cette page",
    introduction: "Introduction",
    clear_filters: "Effacer les filtres",
    show_projects_in_industry: "Voir les projets : {tag}",
    show_projects_with_keyword: "Voir les projets avec le mot-clé {tag}",
};

const locales = { en, fr };
export default locales;