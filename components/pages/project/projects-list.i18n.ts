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
    filter_by_ownership: string;
    all_ownerships: string;
    ownerships: {
        monark: string;
        incubated: string;
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
    featured_title: string;
    all_projects_title: string;
    results_title: string;
    results_count_one: string;
    results_count_other: string;
    filters: string;
    try_demo: string;
    try_demo_label: string;
    empty_title: string;
    empty_hint: string;
    remove_filter: string;
    search_chip: string;
}

const en: I18n = {
    example: "Example",
    page_title: "Projects",
    search_placeholder: "Search projects…",
    not_found: "No projects found.",
    back_home: "Back home",
    description: "Web3 tools for real communities, from first idea to working prototype.",
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
    filter_by_ownership: "Filter by ownership",
    all_ownerships: "All projects",
    ownerships: {
        monark: "Monark products",
        incubated: "Incubated ventures",
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
    featured_title: "Ready to try",
    all_projects_title: "More projects",
    results_title: "Matching projects",
    results_count_one: "{count} project",
    results_count_other: "{count} projects",
    filters: "Filters",
    try_demo: "Try the demo",
    try_demo_label: "Try the {name} demo (opens in a new tab)",
    empty_title: "No project matches these filters.",
    empty_hint: "Try another keyword, or clear the filters.",
    remove_filter: "Remove filter: {label}",
    search_chip: "“{q}”",
};

const fr: I18n = {
    example: "Exemple",
    page_title: "Projets",
    search_placeholder: "Rechercher des projets…",
    not_found: "Aucun projet trouvé.",
    back_home: "Retour à l'accueil",
    description: "Des outils Web3 pour de vraies communautés, de l'idée au prototype.",
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
    filter_by_ownership: "Filtrer par propriété",
    all_ownerships: "Tous les projets",
    ownerships: {
        monark: "Produits Monark",
        incubated: "Projets incubés",
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
    featured_title: "Prêts à essayer",
    all_projects_title: "Autres projets",
    results_title: "Projets correspondants",
    results_count_one: "{count} projet",
    results_count_other: "{count} projets",
    filters: "Filtres",
    try_demo: "Essayer la démo",
    try_demo_label: "Essayer la démo de {name} (nouvel onglet)",
    empty_title: "Aucun projet ne correspond à ces filtres.",
    empty_hint: "Essayez un autre mot-clé ou effacez les filtres.",
    remove_filter: "Retirer le filtre : {label}",
    search_chip: "« {q} »",
};

const locales = { en, fr };
export default locales;