/**
 * Brand page content (en/fr), rendered by the section components in
 * components/pages/brand/sections. Replaces the Notion "Brand assets" page.
 * The rules come from monark-brand-guidelines.md (lovable-migration); file
 * names, sizes and colour values live in brand-assets.ts. Keep en and fr
 * equivalent. The kit's README.txt is generated from the English strings.
 */
import type { SwatchToken } from "./brand-assets";

export type BrandSectionId =
  | "logos"
  | "rules"
  | "colour"
  | "type"
  | "products"
  | "voice";

export type BrandLogoCardId =
  | "horizontal"
  | "vertical"
  | "mark"
  | "mono-dark"
  | "mono-light";

export type BrandDontId = "stretch" | "recolour" | "effects" | "busy";

export type BrandContrast = {
  ok: boolean;
  label: string;
  ratio: string;
  /** What to do instead, for failing pairs. */
  fix?: string;
};

export interface I18n {
  brand_page: {
    meta: { title: string; description: string };
    new_tab: string;
    hero: {
      title: string;
      lead: string;
      kit: string;
      kit_contents: string;
      nav_label: string;
      nav: Record<BrandSectionId, string>;
    };
    logos: {
      eyebrow: string;
      title: string;
      intro: string;
      cards: Record<BrandLogoCardId, { title: string; use: string }>;
      for_light: string;
      for_dark: string;
      for_any: string;
      rows: { horizontal: string; vertical: string; mark: string };
      download: string;
      preview_alt: string;
    };
    rules: {
      eyebrow: string;
      title: string;
      intro: string;
      clear_space: { title: string; text: string; x: string; half: string };
      min_size: { title: string; text: string; mark: string; horizontal: string };
      donts_title: string;
      donts: Record<BrandDontId, string>;
    };
    colour: {
      eyebrow: string;
      title: string;
      intro: string;
      orange: { name: string; role: string };
      gradient: { name: string; role: string };
      light_title: string;
      dark_title: string;
      swatches: Record<SwatchToken, { name: string; role: string }>;
      copy: string;
      copied: string;
      contrast_title: string;
      sample: string;
      contrast: BrandContrast[];
      tokens_title: string;
      tokens_text: string;
    };
    type: {
      eyebrow: string;
      title: string;
      intro: string;
      family_note: string;
      weights_title: string;
      sample: string;
      scale_title: string;
      scale: { role: string; spec: string; className: string }[];
      trajan_title: string;
      trajan: string;
      google_fonts: string;
    };
    products: {
      eyebrow: string;
      title: string;
      intro: string;
      family_title: string;
      example_product: string;
      specs: string[];
      credit_title: string;
      credit_text: string;
      credit_label: string;
      badges_title: string;
      badges: { en: string; fr: string; light: string; dark: string };
    };
    voice: {
      eyebrow: string;
      title: string;
      voice_title: string;
      voice_intro: string;
      do_label: string;
      dont_label: string;
      pairs: { principle: string; do: string; dont: string }[];
      imagery_title: string;
      imagery_intro: string;
      avoid_label: string;
      avoid: string[];
    };
    contact: {
      title: string;
      text: string;
      email: string;
      discord: string;
    };
  };
}

// Type scale samples (brand guidelines §4), shared by both languages.
const scaleClasses = {
  hero: "text-headline",
  h1: "text-[clamp(2rem,1.45rem+2.2vw,3rem)] font-extrabold tracking-[-0.02em]",
  h2: "text-[2rem] font-bold tracking-[-0.02em]",
  h3: "text-2xl font-bold",
  body: "text-base font-normal",
  small: "text-sm text-muted-foreground",
  eyebrow: "eyebrow !mb-0",
};

export const en: I18n = {
  brand_page: {
    meta: {
      title: "Brand",
      description:
        "Monark's logos, colours, typography and voice, with the brand kit to download: SVG and PNG logos, credit badges and colour tokens.",
    },
    new_tab: "(opens in a new tab)",
    hero: {
      title: "Monark brand",
      lead: "Logos, colours, type and voice for anyone who writes about Monark or builds with it. Take what you need.",
      kit: "Download the brand kit",
      kit_contents: "SVG and PNG logos, credit badges and colour tokens",
      nav_label: "On this page",
      nav: {
        logos: "Logos",
        rules: "Logo rules",
        colour: "Colour",
        type: "Typography",
        products: "Product brands",
        voice: "Voice and imagery",
      },
    },
    logos: {
      eyebrow: "Logos",
      title: "The logo in every shape",
      intro:
        "The colour logo goes on plain cream, white or espresso. On photos or orange, use a mono version.",
      cards: {
        horizontal: {
          title: "Horizontal",
          use: "The default: footers, documents and slides.",
        },
        vertical: {
          title: "Vertical",
          use: "Centred layouts, such as error pages and empty states.",
        },
        mark: {
          title: "Mark only",
          use: "Favicons, avatars, loading states and product brands.",
        },
        "mono-dark": {
          title: "Mono, dark",
          use: "Orange fills, light photos and busy light backgrounds.",
        },
        "mono-light": {
          title: "Mono, white",
          use: "Photos and busy dark backgrounds.",
        },
      },
      for_light: "For light backgrounds",
      for_dark: "For dark backgrounds",
      for_any: "For light and dark backgrounds",
      rows: { horizontal: "Horizontal", vertical: "Vertical", mark: "Mark" },
      download: "Download",
      preview_alt: "Monark logo",
    },
    rules: {
      eyebrow: "Logo rules",
      title: "Give it room, keep it whole",
      intro:
        "Use the files as they are. Never retype, redraw, recolour, stretch, rotate or animate the logo.",
      clear_space: {
        title: "Clear space",
        text: "Keep at least half the mark's height empty on every side.",
        x: "x",
        half: "½x",
      },
      min_size: {
        title: "Minimum size",
        text: "Measured on the drawing, not on the file's padding.",
        mark: "Mark: 20px tall (16px as a favicon)",
        horizontal: "Horizontal: 120px wide",
      },
      donts_title: "Don't",
      donts: {
        stretch: "Stretch or squash it",
        recolour: "Change its colours",
        effects: "Add shadows or effects",
        busy: "Put the colour logo on a photo",
      },
    },
    colour: {
      eyebrow: "Colour",
      title: "Cream, espresso and one flat orange",
      intro:
        "Orange is the accent, about a tenth of any screen. No gradients: the logo's is the only one.",
      orange: {
        name: "Monark orange",
        role: "Fills, icons, focus rings and the one main button on a screen.",
      },
      gradient: { name: "Logo gradient", role: "Inside the logo only." },
      light_title: "Cream, the light theme",
      dark_title: "Espresso, the dark theme",
      swatches: {
        background: { name: "Background", role: "Page background" },
        card: { name: "Card", role: "Cards and panels" },
        secondary: { name: "Surface", role: "Quiet areas and chips" },
        border: { name: "Border", role: "Dividers and outlines" },
        foreground: { name: "Text", role: "Headings and body text" },
        "muted-foreground": { name: "Muted text", role: "Captions and hints" },
        "primary-ink": { name: "Orange ink", role: "Orange text and links" },
        "chart-2": { name: "Red accent", role: "Charts and small highlights" },
      },
      copy: "Copy",
      copied: "Copied",
      contrast_title: "Contrast",
      sample: "Aa",
      contrast: [
        { ok: true, label: "Dark text on orange", ratio: "7.9:1" },
        {
          ok: false,
          label: "White text on orange",
          ratio: "2.4:1",
          fix: "Use dark text",
        },
        {
          ok: false,
          label: "Orange text on cream",
          ratio: "2.3:1",
          fix: "Use orange ink, 4.9:1",
        },
        { ok: true, label: "Orange text on espresso", ratio: "8.1:1" },
      ],
      tokens_title: "Design tokens",
      tokens_text: "The same colours and type for code and Figma: CSS variables, W3C design tokens and Tokens Studio.",
    },
    type: {
      eyebrow: "Typography",
      title: "Nunito Sans, for everything",
      intro: "One family, four weights, sentence case headings.",
      family_note: "Free and open source (SIL Open Font License).",
      weights_title: "Weights",
      sample: "Build it together",
      scale_title: "Web scale",
      scale: [
        { role: "Hero headline", spec: "3.5–4.5rem · 800 · home page only", className: scaleClasses.hero },
        { role: "Heading 1", spec: "2.5–3rem · 800", className: scaleClasses.h1 },
        { role: "Heading 2", spec: "2rem · 700", className: scaleClasses.h2 },
        { role: "Heading 3", spec: "1.5rem · 700", className: scaleClasses.h3 },
        { role: "Body text, up to 68 characters a line", spec: "1rem · 400 · line height 1.6", className: scaleClasses.body },
        { role: "Small text for hints", spec: "0.875rem · 400", className: scaleClasses.small },
        { role: "Eyebrow label", spec: "12–13px · 700 · uppercase, 0.08em", className: scaleClasses.eyebrow },
      ],
      trajan_title: "Trajan, only in the wordmark",
      trajan:
        "The MONARK lettering is set in Trajan Pro, a commercial font we don't provide. Never set other text in Trajan or its lookalike Cinzel.",
      google_fonts: "Get Nunito Sans on Google Fonts",
    },
    products: {
      eyebrow: "Product brands",
      title: "The butterfly, then the name",
      intro:
        "Monark products don't get their own logo. The mark and the product name on one line keep the family recognisable.",
      family_title: "Monark products",
      example_product: "Splitflow",
      specs: [
        "Colour mark, 28px",
        "10px gap",
        "Nunito Sans 800, 18px",
        "No “by Monark” in the header",
      ],
      credit_title: "Independent products",
      credit_text:
        "Products with their own identity keep one small credit in the footer, linked to monark.io.",
      credit_label: "Built with Monark",
      badges_title: "Credit badges",
      badges: { en: "English", fr: "French", light: "light", dark: "dark" },
    },
    voice: {
      eyebrow: "Voice and imagery",
      title: "Clear words, real people",
      voice_title: "Voice",
      voice_intro:
        "Write for a curious student and an experienced developer at the same time.",
      do_label: "Do",
      dont_label: "Don't",
      pairs: [
        {
          principle: "Lead with the outcome",
          do: "Split every payment automatically among your contributors.",
          dont: "Programmable revenue-sharing primitives.",
        },
        {
          principle: "Explain terms once",
          do: "Add collateral (the tokens you lock to secure a loan).",
          dont: "Add collateral.",
        },
        {
          principle: "Optimistic, never hype",
          do: "Your community decides where the funds go.",
          dont: "Revolutionary returns. To the moon!",
        },
        {
          principle: "Buttons start with a verb",
          do: "Create a split",
          dont: "SUBMIT",
        },
      ],
      imagery_title: "Imagery",
      imagery_intro: "Real people working together, in warm natural light.",
      avoid_label: "Avoid",
      avoid: [
        "Gold coins",
        "Candlestick charts",
        "Rockets",
        "Hooded hackers",
        "Glowing blockchains",
        "Cold blue office stock",
      ],
    },
    contact: {
      title: "Press or partnership request?",
      text: "Write to us, or find the team on Discord.",
      email: "contact@monark.io",
      discord: "Discord",
    },
  },
};

export const fr: I18n = {
  brand_page: {
    meta: {
      title: "Marque",
      description:
        "Les logos, couleurs, typographie et ton de Monark, avec le kit de marque à télécharger : logos SVG et PNG, badges de crédit et jetons de couleur.",
    },
    new_tab: "(s'ouvre dans un nouvel onglet)",
    hero: {
      title: "La marque Monark",
      lead: "Logos, couleurs, typographie et ton pour quiconque parle de Monark ou construit avec. Servez-vous.",
      kit: "Télécharger le kit de marque",
      kit_contents: "Logos SVG et PNG, badges de crédit et jetons de couleur",
      nav_label: "Sur cette page",
      nav: {
        logos: "Logos",
        rules: "Règles du logo",
        colour: "Couleurs",
        type: "Typographie",
        products: "Marques produit",
        voice: "Ton et images",
      },
    },
    logos: {
      eyebrow: "Logos",
      title: "Le logo sous toutes ses formes",
      intro:
        "Le logo couleur se pose sur un fond uni : crème, blanc ou espresso. Sur une photo ou de l'orange, prenez une version mono.",
      cards: {
        horizontal: {
          title: "Horizontal",
          use: "Le choix par défaut : pieds de page, documents et présentations.",
        },
        vertical: {
          title: "Vertical",
          use: "Les mises en page centrées, comme les pages d'erreur ou les écrans vides.",
        },
        mark: {
          title: "Symbole seul",
          use: "Favicons, avatars, chargements et marques produit.",
        },
        "mono-dark": {
          title: "Mono foncé",
          use: "Aplats orange, photos claires et fonds clairs chargés.",
        },
        "mono-light": {
          title: "Mono blanc",
          use: "Photos et fonds foncés chargés.",
        },
      },
      for_light: "Pour fonds clairs",
      for_dark: "Pour fonds foncés",
      for_any: "Pour fonds clairs et foncés",
      rows: { horizontal: "Horizontal", vertical: "Vertical", mark: "Symbole" },
      download: "Télécharger",
      preview_alt: "Logo Monark",
    },
    rules: {
      eyebrow: "Règles du logo",
      title: "De l'espace, et aucune retouche",
      intro:
        "Utilisez les fichiers tels quels. Ne retapez, ne redessinez, ne recolorez, n'étirez, ne pivotez et n'animez jamais le logo.",
      clear_space: {
        title: "Zone de protection",
        text: "Laissez vide, de chaque côté, au moins la moitié de la hauteur du symbole.",
        x: "x",
        half: "½x",
      },
      min_size: {
        title: "Taille minimale",
        text: "Mesurée sur le dessin, pas sur les marges du fichier.",
        mark: "Symbole : 20 px de haut (16 px en favicon)",
        horizontal: "Horizontal : 120 px de large",
      },
      donts_title: "À éviter",
      donts: {
        stretch: "L'étirer ou l'écraser",
        recolour: "Changer ses couleurs",
        effects: "Ajouter une ombre ou un effet",
        busy: "Poser le logo couleur sur une photo",
      },
    },
    colour: {
      eyebrow: "Couleurs",
      title: "Crème, espresso et un orange franc",
      intro:
        "L'orange est l'accent, environ un dixième de l'écran. Aucun dégradé : celui du logo est le seul.",
      orange: {
        name: "Orange Monark",
        role: "Aplats, icônes, contours de focus et l'unique bouton principal d'un écran.",
      },
      gradient: { name: "Dégradé du logo", role: "Uniquement dans le logo." },
      light_title: "Crème, le thème clair",
      dark_title: "Espresso, le thème sombre",
      swatches: {
        background: { name: "Fond", role: "Fond de page" },
        card: { name: "Carte", role: "Cartes et panneaux" },
        secondary: { name: "Surface", role: "Zones calmes et puces" },
        border: { name: "Bordure", role: "Séparateurs et contours" },
        foreground: { name: "Texte", role: "Titres et texte courant" },
        "muted-foreground": { name: "Texte atténué", role: "Légendes et aides" },
        "primary-ink": { name: "Encre orange", role: "Texte et liens orange" },
        "chart-2": { name: "Rouge d'accent", role: "Graphiques et petits rappels" },
      },
      copy: "Copier",
      copied: "Copié",
      contrast_title: "Contraste",
      sample: "Aa",
      contrast: [
        { ok: true, label: "Texte foncé sur orange", ratio: "7,9:1" },
        {
          ok: false,
          label: "Texte blanc sur orange",
          ratio: "2,4:1",
          fix: "Prendre un texte foncé",
        },
        {
          ok: false,
          label: "Texte orange sur crème",
          ratio: "2,3:1",
          fix: "Prendre l'encre orange, 4,9:1",
        },
        { ok: true, label: "Texte orange sur espresso", ratio: "8,1:1" },
      ],
      tokens_title: "Jetons de design",
      tokens_text: "Les mêmes couleurs et la même typographie pour le code et Figma : variables CSS, jetons W3C et Tokens Studio.",
    },
    type: {
      eyebrow: "Typographie",
      title: "Nunito Sans, pour tout",
      intro: "Une famille, quatre graisses, et une majuscule en début de titre seulement.",
      family_note: "Libre et gratuite (SIL Open Font License).",
      weights_title: "Graisses",
      sample: "Construire ensemble",
      scale_title: "Échelle web",
      scale: [
        { role: "Grand titre d'accueil", spec: "3,5–4,5 rem · 800 · page d'accueil seulement", className: scaleClasses.hero },
        { role: "Titre 1", spec: "2,5–3 rem · 800", className: scaleClasses.h1 },
        { role: "Titre 2", spec: "2 rem · 700", className: scaleClasses.h2 },
        { role: "Titre 3", spec: "1,5 rem · 700", className: scaleClasses.h3 },
        { role: "Texte courant, 68 caractères par ligne au plus", spec: "1 rem · 400 · interligne 1,6", className: scaleClasses.body },
        { role: "Petit texte pour les aides", spec: "0,875 rem · 400", className: scaleClasses.small },
        { role: "Surtitre", spec: "12–13 px · 700 · majuscules, 0,08 em", className: scaleClasses.eyebrow },
      ],
      trajan_title: "Trajan, seulement dans le logotype",
      trajan:
        "Les lettres MONARK sont composées en Trajan Pro, une police commerciale que nous ne fournissons pas. N'utilisez jamais Trajan, ni son sosie Cinzel, pour un autre texte.",
      google_fonts: "Obtenir Nunito Sans sur Google Fonts",
    },
    products: {
      eyebrow: "Marques produit",
      title: "Le papillon, puis le nom",
      intro:
        "Les produits Monark n'ont pas de logo à eux. Le symbole et le nom du produit, sur une seule ligne, gardent la famille reconnaissable.",
      family_title: "Produits Monark",
      example_product: "Splitflow",
      specs: [
        "Symbole couleur, 28 px",
        "Espace de 10 px",
        "Nunito Sans 800, 18 px",
        "Pas de « par Monark » dans l'en-tête",
      ],
      credit_title: "Produits indépendants",
      credit_text:
        "Les produits qui ont leur propre identité gardent un petit crédit en pied de page, avec un lien vers monark.io.",
      credit_label: "Propulsé par Monark",
      badges_title: "Badges de crédit",
      badges: { en: "Anglais", fr: "Français", light: "clair", dark: "foncé" },
    },
    voice: {
      eyebrow: "Ton et images",
      title: "Des mots clairs, de vraies personnes",
      voice_title: "Ton",
      voice_intro:
        "Écrivez à la fois pour une étudiante curieuse et pour un développeur chevronné.",
      do_label: "À faire",
      dont_label: "À éviter",
      pairs: [
        {
          principle: "Commencer par le résultat",
          do: "Répartissez automatiquement chaque paiement entre vos contributeurs.",
          dont: "Primitives programmables de partage des revenus.",
        },
        {
          principle: "Expliquer un terme la première fois",
          do: "Déposez une garantie (les jetons bloqués pour sécuriser un prêt).",
          dont: "Déposez du collatéral.",
        },
        {
          principle: "Optimiste, jamais racoleur",
          do: "Votre communauté décide où va l'argent.",
          dont: "Des rendements révolutionnaires. Direction la lune !",
        },
        {
          principle: "Des boutons qui commencent par un verbe",
          do: "Créer une répartition",
          dont: "VALIDER",
        },
      ],
      imagery_title: "Images",
      imagery_intro:
        "De vraies personnes qui travaillent ensemble, dans une lumière naturelle et chaude.",
      avoid_label: "À éviter",
      avoid: [
        "Pièces d'or",
        "Graphiques en chandeliers",
        "Fusées",
        "Hackers encapuchonnés",
        "Blockchains lumineuses",
        "Bureaux froids et bleutés",
      ],
    },
    contact: {
      title: "Une demande presse ou partenariat ?",
      text: "Écrivez-nous, ou retrouvez l'équipe sur Discord.",
      email: "contact@monark.io",
      discord: "Discord",
    },
  },
};
