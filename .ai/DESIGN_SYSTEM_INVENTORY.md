# Design System Inventory — ABECQ

The map that connects production sources (`src/`), canonical example markup (`design-system/`) and the approved export.

| | |
|---|---|
| Approved source | `raw/exports/design-system.html` (Claude Design bundle, SHA-256 `91951f68…7196`) |
| Extracted | `raw/extracted/design-system-91951f68/` |
| Normalized reference used for this import | `raw/normalized/design-system-91951f68-b1/design-system/index.html` (batch 1: shell + Foundations) |
| Import | INITIAL, 2026-10-28 — **Foundations only**. Components arrive with later normalized batches. |

Status values: `VERIFIED` (built, rendered and compared in a browser), `PENDING` (not yet normalized upstream), `UNRESOLVED` (source missing).

## Single source of truth

- **Tokens:** `src/scss/core/_tokens.scss`. This is the only place the 191 `--abq-*` custom properties are declared. Never redeclare them elsewhere.
- **Fonts:** `src/scss/core/_fonts.scss` declares them; the files are in `assets/fonts/`.
- **Base element defaults:** `src/scss/core/_core.scss`.
- **Canonical example markup:** `design-system/**/*.html`. These pages are documentation only: not routed by `index.php` and not production templates.
- **Catalog framing:**
  - CSS: `src/scss/design-system-docs.scss` and `src/scss/docs/`, compiled to `assets/css/design-system-docs.css`.
  - JS: `src/js/docs/design-system-docs.js`, compiled to `assets/js/docs/design-system-docs.js`.
  - Everything is namespaced `.ds-docs-*`. **Never load either file on production pages.**

## Foundations

| Concern | Decision | Production source | Catalog example | Status |
|---|---|---|---|---|
| Colour tokens: 68 (Brand, Blue tints, Neutral, Icons & controls, Button gradient, Status, Extra tones, See-through, Background gradients) | create | `src/scss/core/_tokens.scss` | `design-system/foundations/colors.html` | VERIFIED |
| Type tokens: 22 `--abq-font-*`, 20 `--abq-lh-*`, 8 `--abq-ls-*`, 4 `--abq-fw-*` | create | `src/scss/core/_tokens.scss` | `design-system/foundations/typography.html` | VERIFIED |
| Spacing tokens: 28 `--abq-space-*`, 2px base | create | `src/scss/core/_tokens.scss` | `design-system/foundations/spacing.html` | VERIFIED |
| Radius tokens: 13 `--abq-radius-*` | create | `src/scss/core/_tokens.scss` | `design-system/foundations/radius-elevation.html` | VERIFIED |
| Shadow tokens: 28 `--abq-shadow-*` | create | `src/scss/core/_tokens.scss` | `design-system/foundations/radius-elevation.html` | VERIFIED |
| Outfit variable font (100–900; latin and latin-ext subsets) | create | `src/scss/core/_fonts.scss`, `assets/fonts/outfit-latin.woff2`, `assets/fonts/outfit-latin-ext.woff2` | all catalog pages | VERIFIED |
| Base defaults: body font/colour/background, h1–h4 font, weight and colour, button font | extend | `src/scss/core/_core.scss` | all catalog pages | VERIFIED (catalog only; no production page exists yet) |
| Icons: 84 distinct 24×24 line icons, `currentColor` | reuse the existing `.icon` helper (`src/scss/core/_helpers.scss`) | inline SVG in markup | `design-system/foundations/icons.html` | VERIFIED |
| Brand logo | create | `assets/img/abecq-logo.png` (304×80) | catalog sidebar | VERIFIED |
| Breakpoints | — | No product breakpoint is evidenced by the Foundations batch. The 960px rule belongs to the catalog chrome (`src/scss/docs/_layout.scss`) | — | PENDING (expected with component batches) |
| Motion | — | No product animation in this batch. `@keyframes stockPulse` exists in the export but its user is not normalized yet | — | PENDING |

### Using the foundations

```html
<!-- colour, type and spacing always via tokens -->
<p class="price">€149.00</p>
```

```scss
.price {
  font-size: var(--abq-font-price);
  line-height: var(--abq-lh-price);
  color: var(--abq-color-ink-900);
  margin-bottom: var(--abq-space-12);
}
```

```html
<!-- icon: copy the SVG from design-system/foundations/icons.html; colour comes from currentColor -->
<svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
  <path d="M4 12H20.5M14.5 18L20.5 12L14.5 6" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"/>
</svg>
```

- **Accessibility:** icons are decorative by default (`aria-hidden="true"`). An icon-only control needs an accessible name on the control itself, for example `aria-label`.
- **Icon names:** icons are identified only as `i01`–`i84` in the export, which gives no semantic names. Name them when a component that uses them is imported.

## Components

None are imported yet, because the normalized reference covers Foundations only. Everything below is listed so that page migrations do not invent these components.

| Component | Source | Variants/states | Decision | Source file(s) | Dependencies | Status |
|---|---|---|---|---|---|---|
| Button | export `#buttons`, `Button.dc.html` | 16 variants (all, primary, glow, gradient, white, secondary, outline, link, text, tile, circle, badge, shine, quiet, chip, dashed); sizes sm/md/lg/xl; icon left/right; full; disabled | create (later) | — | `support.js` (unresolved) | PENDING |
| Links & eyebrow | export `#links` | — | — | — | — | PENDING |
| Form field | export `#forms`, `FormField.dc.html` | input, select, textarea; error; read-only | — | — | `support.js` | PENDING |
| Choice controls | export `#choice`, `Choice.dc.html` | checkbox, radio, card | — | — | `support.js` | PENDING |
| Segmented tabs, section heading, breadcrumb, product & PDF cards, audience cards, purchase actions, commerce controls, status & feedback, FAQ accordion, tags & chips, product gallery, page contents, auth actions | export molecules | — | — | `SectionHeading`, `Breadcrumb`, `ProductCard` and `PdfCard` `.dc.html` | `support.js` | PENDING |
| Header & footer | export `#components` | — | — | `SiteHeader.dc.html`, `SiteFooter.dc.html` | — | UNRESOLVED: not in the bundle |
| Home sections (hero, trust bar, categories, product grid, CTA band, guides, brands) | export `#organisms` | — | — | `index.html` | — | UNRESOLVED: not in the bundle |
| Account navigation, drawers & modals, mobile menu, compare table, checkout progress, page loader | export organisms | — | — | — | — | PENDING |
| Home page template, developer handoff | export templates | — | — | — | — | PENDING |

## Catalog (documentation only)

| Page | Shows |
|---|---|
| `design-system/index.html` | Overview and the five levels. Pending levels show "Not imported yet" and are not links |
| `design-system/foundations/colors.html` | 68 swatches. Click one to copy `var(--abq-color-*)` |
| `design-system/foundations/typography.html` | 20-step type scale and 4 weights |
| `design-system/foundations/spacing.html` | 28 spacing steps with usage counts |
| `design-system/foundations/radius-elevation.html` | 13 radii and 28 shadows |
| `design-system/foundations/icons.html` | 84 icons with canonical `.icon` markup |

How the catalog is put together:

- **Assets:** each page loads `assets/css/top.css`, `main.css` and `bottom.css`, then `design-system-docs.css`. Scripts are `assets/js/main.js`, then `assets/js/docs/design-system-docs.js`.
- **Inline styles:** none, apart from per-item data hooks (`style="--swatch: var(--abq-color-…)"`) that the docs CSS reads.
- **Differences from the export viewer:**
  - It is several pages instead of one hash-switched page.
  - The active sidebar link is static (`aria-current="page"`).
  - Levels not yet imported are greyed out and not linked.

## Validation (2026-10-28)

- **Build:** `npm run build` succeeds. Warnings are only Sass `@import` and slash-division deprecations, which also appear in pre-existing files. `main.css` and `bottom.css` are unchanged; `top.css` gains the tokens and fonts.
- **Visual parity:** catalog pages, on the production CSS, were compared in headless Chrome against the normalized reference at 1440px and 390px (sidebar masked at desktop).
  - colours, typography, spacing, radius-elevation and icons are pixel-identical at both widths.
  - The index differs only in the intended "Not imported yet" text.
- **Catalog checks:** all links and assets resolve; no console errors; Outfit loads; the production `main.js` loads without errors on catalog pages; copy-to-clipboard and toast behave as in the export (1400ms, single listener); sidebar groups collapse by mouse and keyboard.
- **Not verified:**
  - Production pages: `templates/home.php` does not exist, so `index.php` currently ends in a PHP fatal error. This predates the import (removed in `5acf3be`).
  - Browsers other than Chrome.
  - Screen readers.

## Known project issues outside this import

These are reported, not changed:

- `index.php` still loads Google Fonts Montserrat and Space Grotesk from the previous brand. No stylesheet uses them any more. It also declares `lang="ru"`.
- `assets/css/mobile.css`, `tablet.css` and `assets/css/pages/` are compiled leftovers with no source in `src/scss`.
- `src/js/main.js` was reduced to an empty skeleton, and `src/js/shared/accordion.js` and `home.js` were deleted, in the working tree during this import. That was not part of the import, and those changes are left as they are. The catalog was re-verified against the current `main.js`.
- `::selection { background: #d7e3ff; }` in `core/_core.scss` is a previous-brand value. The export defines no selection colour.
- `.ai/CODEBASE.md` lists `src/fonts/`, which does not exist. Fonts are public assets in `assets/fonts/` because the build has no copy step.

## Future PHP partial candidates (report only, do not implement)

- Site header and footer, once `SiteHeader.dc.html` and `SiteFooter.dc.html` are available.
- Product card and PDF card, once normalized.
