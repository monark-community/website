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

**Projects list.** A gallery instead of a wall of text. Each card leads with its 16:9 cover, then the product name (the `accronym`, with the long title as a small secondary line), one `tagline` (a new frontmatter field: one sentence, at most 12 words, the value for the user), status and ownership badges, and at most two keyword chips. The project page keeps the full `description`; a card without a tagline falls back to a shortened description. With no filter active, projects people can try today (prototype available, market validation, production) get a "Ready to try" row of larger cards with a "Try the demo" button; the rest sit in a 4-column grid. The whole card is one link (the name, stretched with `::after`); chips and the demo button sit above it, so nothing interactive is nested. The filter bar is sticky under the header: search, the four filters as pill selects (behind a "Filters" toggle on mobile), the result count, removable pills for active filters and "Clear filters". Every filter lives in the URL: `industry`, `keyword`, `status`, `ownership`, `q`. Covers of the rebuilt demo sites replace the old mockups. Screenshots: `after/projects-list-*`.

**Projects in category sections.** With no filter or search active, the list reads like the news list: one section per category (`category` frontmatter field: work & payments, managing your crypto, trust & privacy, commerce & records, DeFi, communities & governance; labels in `projects-list.i18n.ts`). Each section opens with its most advanced project as a large 16:9 feature (status order: production, market validation, prototype available, in progress, on hold, planned), the others beside it (one: a full card; two: tall rows filling the feature's height; three or four: compact rows), mirrored from one section to the next; extra projects continue in a grid, and a section of two shows two equal cards. The category jump links sit in the sticky filter bar's second row, with the same pills as the news list, smooth scrolling (instant under reduced motion) and the current section highlighted. Any filter or search switches back to one grid of results with the count and removable pills; `#projects-<category>` links open at their section. Screenshots: `after/projects-sections-*`.

**One card hover.** Every linked card uses the `card-hover` primitive in `app/globals.scss`: the title gets a 2px `--primary-ink` underline (offset 5px) on hover or keyboard focus, and, when motion is allowed, the card lifts 4px and its image zooms 4% (400ms ease-out). Hover rules only apply on devices that can hover. Applied to the project cards and the home "Join the flight" cards; the news cards follow once the Learn branch lands. Screenshots: `after/hover-*`.

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
