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

**Participate pages.** Developer, ambassador, industry and university are rebuilt the same way as About: typed en/fr content per page (`components/pages/participate/{developer,ambassador,industry,university}.i18n.ts`) rendered by one shared `ParticipatePage`, so the four read as a family. Every page has the same sections: a hero (who it's for, a one-line promise, key facts and line art drawn in code), what you get, how it works (numbered steps on a connecting line), who fits and what Monark expects, a proof block (projects, or the CryptoSys story for universities), a FAQ where the old copy had material for one, a call to action, and an "other ways to participate" strip that links the three sibling pages. Each page has its own accent for icons, line art and step rings: orange (developer), red (university), brown (industry) and the muted green (ambassador). The call to action stays flat orange everywhere. Discord is the primary action, and the form routes are secondary links. The old MDX (`content/*/participate`) and the per-page `<article>` layouts are removed; one plain `participate/layout.tsx` replaces them. The ambassador page only uses what the site already states: the home page card, the news article that announced the programme, and the roadmap. It says openly that rewards and requirements are still to come. Screenshots: `after/participate-*` and `after/fr-participate-*`.

**Photography.** There are now seven photos of real people working together, all free Unsplash License images (sources in [`docs/assets.md`](../assets.md)). Each photo takes the place of decoration and adds no text.
- Each participate page opens with a "magazine lead" hero, modelled on the top of the News page, with a photo of the people the page is for: students in a lecture hall, two developers pairing at a workshop, a community meetup, or a small business team. The photo replaces the hero line art.
  - Everything sits in the normal site container, left-aligned: the eyebrow, the headline, one supporting line of 25 words or fewer (it replaces the old paragraph, in EN and FR), then the two actions.
  - Below them comes one large photo. It uses the News feature card's radius and border and has hard edges, with no fade or mask. It is 21:9 on desktop, 16:9 on tablet and 4:3 on phones. A focal point per role (in `participate-shared.i18n.ts`) keeps the faces framed.
  - Under the photo, the key figures run as a row of big numbers, separated by thin rules, each with a small accent bar. The numbers stay in the text colour for contrast. On phones they stack.
  - The audience chips are gone. The hero has no bottom border: the figures row ends it, and the next section's eyebrow marks the break.
  - Participate buttons are now styled anchors instead of `<Button asChild>`. When the server streamed a child as a lazy reference, Radix Slot rendered nothing, and the hero lost its "See how it works" link on two pages.
- The home page's "Join the flight" cards reuse those four photos in place of their icons, so each role has the same face everywhere.
- About has one photo in the hero, in place of the network line art, and a wide one above "How Monark works".
- Donation shows one photo next to the heading. It is hidden on phones so the form stays near the top.

The other photos use the site's radius and border and show a muted fill and a blurred placeholder while loading. All photos are dimmed slightly in dark mode. The line art stays in the participate calls to action. The footer's legal line credits "Photos: Unsplash". Screenshots: `after/imagery-*`.

**Brand page.** `/brand` replaces the Notion "Brand assets" link (footer, EN and FR). It is built like About: typed en/fr content in `components/pages/brand/brand.i18n.ts`, one component per section, and a plain container layout. Sections: a hero with the brand kit download (a zip) and anchor chips; logo cards (horizontal, vertical, mark, mono dark, mono white), each previewed on the fixed background it is drawn for, with SVG and PNG (512, 1024, 2048px) downloads; logo rules drawn on the real files (clear space diagram, minimum sizes, and four "don'ts" made with CSS transforms and filters, never altered files); the palette for cream and espresso with click-to-copy swatches, contrast notes and the design token files; a Nunito Sans specimen set in the site's own font with a Google Fonts link (no font files are offered anywhere; Trajan is only named as the wordmark's commercial font); product brands ("butterfly + name" and the "Built with Monark" credit, with badges); voice and imagery in brief; a press and partners line. The downloads live in `public/brand/` and are generated by `scripts/brand/brand-kit.script.ts` (`npm run generate:brand-kit`). The middleware skips `/brand/…` files so they are served as static files, while `/brand` itself still redirects to `/en/brand`. Screenshots: `after/brand-page-*`.

**Error pages.** `/[locale]/error/[code]` keeps every supported code (400 to 504, unknown codes fall back to 500) and the root not-found redirect to `/error/404?route=…`. It now shows a small "Error 404" label, the code as a large orange-ink numeral (decorative, hidden from screen readers), a sentence-case title with one or two plain sentences, the requested address on 404s, and two actions: "Go back home" and "Browse projects". The mesh butterfly sits on the right at 1440px and behind the text, faint and cropped, on phones. The butterfly jokes and random fun facts were dropped: the site keeps a single butterfly line ("Join the flight"). Error pages are `noindex`. Screenshots: `after/error-*`, `after/fr-error-*`.

**Language and analytics.** `<html lang>` follows the locale: the middleware forwards the path locale in an `x-monark-locale` request header, the root layout reads it (falling back to `en` for routes outside `[locale]`), and `WebLayout` keeps it in sync after client navigation. The `[locale]` layout now takes the locale from the URL instead of the `NEXT_LOCALE` cookie, which is missing on a first visit. Google Analytics is optional: without `NEXT_PUBLIC_GA_MEASUREMENT_ID` it renders nothing (it used to throw and blank the whole site). Vercel Web Analytics only renders when running on Vercel, and `/_vercel` is excluded from the locale middleware.

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

- Outside development, the home page's `/api/gh/org_contributors` returns 500 without `GITHUB_API_KEY` and `GITHUB_ORG`.
- `npm run build` fails without `BEEHIIV_API_KEY`, because `app/api/newsletter/route.ts` throws when the module loads.
- The build scripts rewrite tracked files: `content/*/project/index.ts` and two French project MDX files.
- The whole app renders a client-side loader until hydration (`WebClientProviders` waits for mount), so first paint is the loader.
- Some visible strings are hardcoded in English, such as "No collaborator" and "Link to section".
- The French FAQ has 8 questions and the English one has 9.
- Several project cover images carry their own purple and blue gradient mockups. Those images are being regenerated separately and were left untouched.
