# 2026 brand refresh: design note

A restyle of monark.io to the 2026 Monark brand (warm cream and espresso, flat orange, pill actions, bordered cards). Routes, the `[locale]` en/fr structure, MDX content, forms, the donation flow, the newsletter and all integrations are unchanged.

Screenshots of home, projects list, one project page, about and donation, at 390px and 1440px, light and dark: [`before/`](./before) and [`after/`](./after). `after/fr-home-*` shows the French home page.

## Decisions

**Base branch.** The work starts from `main`, the live site. `develop` is an abandoned branch 150 commits behind `main`, with none of the current project, news or donation code.

**Colour tokens: live relative colour, with hex fallbacks.** `app/theme.css` holds the brand's token block, in which every surface, border and text colour is derived from `--primary: #f88d10` with `oklch(from var(--primary) …)` and `--surface-tint: 1`. It has two layers:

1. Literal hex values precomputed from the formulas, for browsers without relative colour support.
2. The formulas themselves, inside `@supports (color: oklch(from red l c h))`.

The tokens are now complete colours, not HSL triplets. Tailwind 3 can't add alpha to a bare `var()`, so `tailwind.config.ts` wraps each token in `color-mix(in oklab, var(--x) calc(<alpha-value> * 100%), transparent)`, and opacity modifiers like `bg-primary/10` keep working. The tokens live in plain CSS rather than `globals.scss` so Sass never parses the relative colour syntax. The production build keeps the formulas intact.

**Focus colour.** Flat orange is only 2.3:1 on cream, under the 3:1 minimum for focus indicators. `--ring` keeps its brand value, but focus outlines and rings use a new `--focus-ring` token: the orange ink (`#B65000`, 4.9:1) in light mode, and the orange itself on espresso (8.1:1).

**Orange text.** Orange text on light backgrounds uses `text-primary-ink`, as do eyebrows, links, the 404 numeral and the explorer links. Flat orange is kept for fills, icons, borders and separators. Text on orange is always dark.

**Gradients removed.** This covers the gradient card frame (`BrandedCard` is now a plain bordered card), the glow filters baked into `governance.svg`, `modular.svg` and `network.svg` (flat strokes remain), the blurred duplicate icons, the tinted discs behind the hero and feature art, the glowing progress-bar peg, and the tiled butterfly pattern behind the footer text. The logo keeps its own gradient. The only remaining gradient is the one the brand allows: a very faint warm radial light behind the hero, in dark mode only.

**Typography.** Nunito Sans (400, 600, 700, 800) is now applied through the `next/font` variable. Before, the `* { font-family: "Nunito Sans" }` rule didn't match the generated family name. The type scale is tighter:

- Hero: clamped 2.25–4.25rem, 800.
- H1: 2–3rem.
- H2: 1.625–2rem.
- Body: 16px at 1.6 line height.
- Letter spacing: -0.02em on large headings.
- Eyebrows: small uppercase labels at 0.08em tracking.

Headings and UI strings are in sentence case in English; the French strings already were. MDX article and project content was not rewritten.

**Shape and depth.** Buttons, nav tabs, filter chips and badges are pills. Cards use a 1rem radius (1.5rem for feature tiles) with a 1px border, near-white on cream or warm brown on espresso. Shadows are kept only for popovers and dialogs.

**Shell.**
- **Header:** 64px and translucent, with a blur. Pill tabs, where the active route gets a highlighted pill. The language and theme switches moved into the header on desktop.
- **Mobile sheet:** full height, and hidden from assistive technology and the keyboard when closed.
- **Skip link:** added.
- **Footer:** a contact call-to-action card; the Monark logo with the tagline; links; a legal line; and the social icons, now drawn in the text colour through a CSS mask because the source SVGs are orange and fail contrast as icons.
- **Page frame:** the fixed orange lines at the page edges are gone.

**Hero.** The mesh butterfly is the single signature image: large, partly cropped, and on no tinted disc. The tagline "Fostering Collaboration within the Web3 Community" stays as the headline. The primary action now starts with a verb ("Explore our Web3 projects" / « Explorer nos projets Web3 »). The Pinax partner logo is white-only, so it was invisible on cream; it is now inverted in light mode.

**Status colours.** Project statuses use muted tones from the brand's status tokens (success green, warning amber, brown, orange ink), always with an icon and a label, and all at least 4.5:1. The spinning "in progress" icon no longer spins.

**About page.** Rebuilt in React from typed en/fr content (`components/pages/about/about.i18n.ts`) instead of MDX. The author card stays sticky in the left column; every section sits in the right column (no full-width band), so the card never overlaps one. Sections: a hero with who Monark is for; "Why Monark" as three barriers each met by Monark's answer; "How Monark works" as four numbered cards; mission and vision on an inverted panel (`bg-foreground`/`text-background`: espresso in light mode, cream in dark), where orange is decorative only; the five values as an icon grid with chart-colour accents; a closing call to action to the projects and participate pages. The route's layout is a plain container, because the global `article` prose styles restyled lists and links. `after/about-1440-light-scrolled.jpg` shows the sticky card mid-page, and `after/fr-about-*` the French page.

**Learn hub.** `/learn` replaces the "Work in progress" placeholder with a hub built from typed en/fr content (`components/pages/learn/learn.i18n.ts`) and section components, like the About page, and follows the brand's text budgets ("Restraint", guidelines §8). Sections: a hero (headline and one line); learning paths for students, developers and industry, each with a photo of people, one line from its participate page, an existing news article to read first and a link to the participate page; the three latest news items (same data as `/learn/news`); the Monark docs on an inverted panel (the Notion hub the top navigation already links as "Docs", plus the GitHub organisation); Discord and YouTube from `socials.ts`; a closing call to action. No courses, dates or partners were added. The three photos are free-licence Unsplash images, listed in `docs/assets.md`. The blurred glow copy was removed from `roadmap.svg` (hero art, also used by the home FAQ), as it was for the other line art. See `after/learn-*` and `after/fr-learn-*`.

**News.** The list (`/learn/news`) reads like a magazine: the latest story as a wide lead (16:9 image beside the title on wide screens), a sticky row of jump links, then one section per category. Each section has a heading and one short line, then a large 16:9 feature with the other stories beside it as compact rows (a full card when there is only one), mirrored from one section to the next on wide screens (feature left, then right); more than four stories would continue in a grid below. On phones everything stacks, feature first, and the jump links scroll sideways and follow the section in view. The lead story isn't repeated in its category. Categories come from a one-line `category` field in each article's frontmatter (`monark`, `beyond-the-hype`, `build`, `explained`), copied into the generated index; labels are in `news.i18n.ts`, and an article without a category would land in a final "More news" section. Cards show the cover, one topic tag, the date, the title and a summary cut to 20 words; the whole card is one link, and hover lifts it slightly and zooms the image (motion-safe). There is an empty state for no news. The article page (`/learn/news/[id]`) has a back link, tags, title, summary, byline (author, date, reading time, city), share buttons (LinkedIn, X, copy link), a large 16:9 cover with its credit, the MDX body at ~68ch, the original source when there is one, and "More news". The body's typography is a CSS module (`news-prose.module.scss`), so it can't leak into other pages, and the route no longer wraps pages in `<article>`. Dates are formatted in UTC, because the stored calendar days showed as the previous day in North American time zones. Share metadata now uses the article's real `.webp` cover (the shared helper pointed to a `.jpg` that doesn't exist), with Open Graph `article` fields, en/fr alternates and NewsArticle JSON-LD. See `after/news-*` and `after/fr-news-*`.

**Motion.** Transitions run at 150–250ms ease-out. `prefers-reduced-motion` turns off animations, transitions and view transitions, and the table of contents scrolls instantly under reduced motion.

**Copy polish, kept in sync in both languages.**
- The French mission statement on the home page was cut off mid-sentence; it is now complete.
- "Nectar for the Curious Mind" became "Questions, answered" / « Vos questions, nos réponses », so the site keeps a single butterfly metaphor ("Join the flight").
- Added the missing "On hold" and "Production" status labels.

**No new dependencies.** Screenshots were taken with an existing Playwright install outside the repo.

## Checks

- `npm run lint`: passes.
- `tsc --noEmit`: passes.
- `npm run build`: passes. It needs `BEEHIIV_API_KEY` set (any value), which was already the case before this work.
- First-load JS is unchanged, within ±0.3 kB per route.
- No horizontal scroll at 360px or 390px on home, projects, a project page, about, donation, news, participate, the 404 page, `/fr` or `/fr/donation`.
- Keyboard: the skip link comes first, every control shows a visible focus ring, and the closed mobile menu is out of the tab order.

## Pre-existing issues, not addressed

- `npm run build` fails without `BEEHIIV_API_KEY`, because `app/api/newsletter/route.ts` throws when the module loads.
- The build scripts rewrite tracked files: `content/*/project/index.ts` and two French project MDX files.
- `<html lang>` is always `en`, including on French pages.
- The whole app renders a client-side loader until hydration (`WebClientProviders` waits for mount), so first paint is the loader.
- Some visible strings are hardcoded in English, such as "No collaborator" and "Link to section".
- The French FAQ has 8 questions and the English one has 9.
- Several project cover images carry their own purple and blue gradient mockups. Those images are being regenerated separately and were left untouched.
