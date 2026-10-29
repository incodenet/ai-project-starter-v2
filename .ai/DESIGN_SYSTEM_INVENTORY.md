# Design System Inventory — ABECQ

The map that connects production sources (`src/`), canonical example markup (`design-system/`) and the approved export.

| | |
|---|---|
| Approved source | `raw/exports/design-system.html` (Claude Design bundle, SHA-256 `91951f68…7196`) |
| Extracted | `raw/extracted/design-system-91951f68-r2/` (complete; earlier `-91951f68` has identical documents) |
| Normalized reference | `raw/normalized/design-system-91951f68-b2/design-system/index.html`: all 33 states and 7 components. Foundations were first imported from `-b1`, which is identical to b2 for them |
| Import | INITIAL. 2026-10-28: Foundations. 2026-10-29: Components (atoms, molecules, organisms, templates) |

Status values: `VERIFIED` (built, rendered and compared in a browser), `UNRESOLVED` (source missing). "(static)" means the export draws the states but defines no behaviour for them.

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
| Breakpoints | — | **None in product components.** The export's only breakpoint (960px: sidebar hidden, two-column example grid becomes one) is catalog chrome: `src/scss/docs/_layout.scss` and `docs/_components.scss` | — | VERIFIED |
| Motion | create | Hover transitions in each component file. `@property --mx` (shine highlight) in `components/_button.scss`. `@keyframes stockPulse` with a `prefers-reduced-motion` stop in `components/_status.scss` | `components/buttons.html`, `components/feedback.html` | VERIFIED |
| Accessible hiding | extend | `.visually-hidden` in `src/scss/core/_helpers.scss` (native inputs behind drawn controls) | `components/choice.html` | VERIFIED |
| Shared button surfaces | create | `$btnShineImage`, `$btnShineTransition`, `$btnGradientLinear` in `src/scss/utils/_variables.scss` (Button, site buttons, ProductCard, Compare, Empty state) | — | VERIFIED |

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
- **Icon names:** icons are identified only as `i01`–`i84` in the export, which gives no semantic names. Components that use icons carry the SVG inline in their canonical markup; the library ids stay as exported.

## Components

All component SCSS is in `src/scss/components/` and is compiled into `assets/css/main.css` through `src/scss/main.scss`. No component needs production JavaScript: every behaviour in the export is either native (inputs, selects, checkboxes, radios, links, submit) or catalog-only.

Canonical markup is in the catalog page listed in each row. **Copy it from there; do not invent markup.**

| Component | Source | Variants / states | Decision | Production source | Example | Status |
|---|---|---|---|---|---|---|
| Button | `Button.dc.html`, `#buttons` | 15 variants: `--primary`, `--glow`, `--gradient`, `--white`, `--secondary`, `--outline`, `--link`, `--text`, `--tile`, `--circle`, `--shine`, `--quiet`, `--chip`, `--dashed`, plus `.abq-btn-badge`. Sizes `--lg`/`--xl` where the variant has them (outline, circle and shine default to sm). Icon left/right (`.abq-btn_icon`, `--mirror`). `--full`. `aria-disabled="true"`. Hover lift/colour/`--mx` sweep | create | `components/_button.scss` (`.abq-btn`) | `components/buttons.html` | VERIFIED |
| Site buttons (as shipped) | `#buttons` specimens | `.abq-button--primary` (Calibration CTA), `--gradient` (Add to cart), `--secondary` (Cart), `--outline` (Log in); `.abq-icon-button--compare`, `--menu` | create, **conflict** (see below) | `components/_button.scss` (`.abq-button`, `.abq-icon-button`) | `components/buttons.html`, `components/purchase.html` | VERIFIED |
| Arrow link, language switch | `#links` | `.abq-arrow-link` (hover nudge), `.abq-lang` (flag, code, chevron) | create | `components/_link.scss` | `components/links.html` | VERIFIED |
| Eyebrow | `#links` | `.abq-eyebrow`, `--pill` | create | `components/_link.scss` | `components/links.html` | VERIFIED |
| Form field | `FormField.dc.html`, `#forms` | `.abq-field` + `.abq-field_control` for input (text, email, password, tel, date, number), `--select` (custom chevron, optional disabled prompt), `--textarea`; `:focus`; `--full` | create | `components/_form-field.scss`, `assets/img/field-select-chevron.svg`, `assets/img/field-date-calendar.svg` | `components/form-fields.html` | VERIFIED |
| Choice | `Choice.dc.html`, `#choice` | Checkbox and radio (`.abq-choice_box--checkbox/--radio`), option card (`.abq-choice-card`); checked, unchecked, `:focus-visible`; `--top`, `--radio`, `_count` | create | `components/_choice.scss`, `.visually-hidden` | `components/choice.html` | VERIFIED |
| Section heading | `SectionHeading.dc.html`, `#heading` | `.abq-section-heading` (`--center`, `--sm`; `--section-heading-mt`/`-mb` custom properties); `.abq-section-head` (heading row + arrow link) | create | `components/_section-heading.scss` | `components/section-heading.html` | VERIFIED |
| Breadcrumb | `Breadcrumb.dc.html`, `#crumbs` | 2 and 3 levels, `aria-current="page"` | create | `components/_breadcrumb.scss` | `components/breadcrumb.html` | VERIFIED |
| Product card | `ProductCard.dc.html`, `#cards` | With and without tag, stock badge, hover lift, add to cart (`--mx` sweep), compare | create (reuses `.abq-tag`) | `components/_product-card.scss` | `components/cards.html` | VERIFIED |
| PDF card | `PdfCard.dc.html`, `#cards` | Hover background | create | `components/_pdf-card.scss` | `components/cards.html` | VERIFIED |
| Tags & chips | `#chips` | `.abq-tag`, `--stock`; `.abq-chip` (+ `_remove`, `_clear`) | create | `components/_tag.scss` | `components/chips.html` | VERIFIED |
| Audience cards | `#audience` | `--dark`, `--glass`, hover lift; `.abq-audience-grid` | create | `components/_audience-card.scss` | `components/audience-cards.html` | VERIFIED |
| Segmented tabs, underline tabs | `#tabs` | `.abq-segmented` (`_option--active`), `.abq-tabs-underline` (`_tab--active`) | create | `components/_tabs.scss` | `components/tabs.html` | VERIFIED (static: no switching in the export) |
| Purchase actions | `#purchase` | Price + add to cart + compare | create | `components/_purchase.scss` | `components/purchase.html` | VERIFIED |
| Product gallery | `#gallery` | Main image, 5 thumbs (`--active`), prev/next arrows | create | `components/_gallery.scss` | `components/gallery.html` | VERIFIED (static) |
| Page contents | `#toc` | `_item--active` | create | `components/_toc.scss` | `components/page-contents.html` | VERIFIED (scroll-spy not in the export) |
| Auth actions | `#auth` | Social sign-in, `--switch` | create | `components/_auth-actions.scss` | `components/auth-actions.html` | VERIFIED (static) |
| Status & feedback | `#feedback` | `.abq-stock` (pulse), `.abq-step-badge`, `.abq-toast` (`--error`), `.abq-empty-state` | create | `components/_status.scss` | `components/feedback.html` | VERIFIED |
| Quantity, pagination, spec table | `#commerce` | `.abq-quantity` (`--cart`), `.abq-pagination` (`_page--active`), `.abq-spec-table` (`<dl>`) | create | `components/_quantity.scss`, `_pagination.scss`, `_spec-table.scss` | `components/commerce.html` | VERIFIED (static) |
| FAQ accordion | `#faq` | `_item--open` (chevron rotated, answer shown) | create | `components/_faq.scss` | `components/faq.html` | VERIFIED (static: no toggle in the export) |
| Mobile menu | `#mobilemenu` | Open panel: search, groups, links | create | `components/_mobile-menu.scss` | `components/mobile-menu.html` | VERIFIED (open/close belongs to the header) |
| Compare table | `#compare` | Product columns, spec rows | create | `components/_compare.scss` | `components/compare.html` | VERIFIED (static) |
| Checkout progress | `#checkoutbar` | `_step--done`, `_step--current` (`aria-current="step"`), upcoming | create | `components/_checkout-steps.scss` | `components/checkout-progress.html` | VERIFIED |
| Page loader | `#loader` | Static 64% frame | create | `components/_loader.scss` | `components/loader.html` | VERIFIED (fill-and-fade sequence is not in the export) |
| Drawers & modals | `#overlays` | `.abq-backdrop` (`--sheet`), `.abq-modal`, `.abq-sheet` | create | `components/_overlay.scss` | `components/overlays.html` | VERIFIED (drawn states only; open/close/focus trap not in the export) |
| Account navigation | `#accnav` | `_item--active`, `_count` | create | `components/_account-nav.scss` | `components/account-nav.html` | VERIFIED (static) |
| Header & footer | `#components` | — | — | `SiteHeader.dc.html` (only in the Home export), `SiteFooter.dc.html` (in no export) | `components/header-footer.html` (deferred placeholders) | UNRESOLVED |
| Home sections (hero, trust bar, categories, in stock, calibration CTA, knowledge hub, brands) | `#organisms` | — | — | `index.html` (Home export) | `components/home-sections.html` (deferred placeholders) | UNRESOLVED |
| Home page template | `#templates` | Link card to the Home page | keep demo-only | — | `templates/home.html` | VERIFIED |
| Tokens as code | `#handoff` | Download `abecq-tokens.json`, copy CSS variables | keep demo-only | `src/js/docs/design-system-docs.js` | `templates/handoff.html` | VERIFIED |

### Usage contracts

- **Button:** `<a class="abq-btn abq-btn--gradient abq-btn--lg" href="…">` for navigation, `<button class="abq-btn abq-btn--primary" type="button|submit">` for actions.
  - Icons go in `<span class="abq-btn_icon" aria-hidden="true">`.
  - Icon-only variants (`--tile`, `--circle`) need `aria-label`.
  - Disabled links use `aria-disabled="true"`, and the page must ignore clicks on them.
- **Form field:** wrap the control in its label, and give every control an `id`.
  - `<label class="abq-field">Email<input class="abq-field_control" id="…" type="email"></label>`
- **Choice:** the native input must come **directly before** its drawn box, with the input inside the label. State then follows `:checked`, and keyboard focus shows the ring. Group radios with a shared `name`. The option card is `<label class="abq-choice-card">` holding the input and the parts.
- **Product card:** an `<article>` whose name link (`.abq-product-card_link`) stretches over the card. Badges are `.abq-tag` + `.abq-product-card_badge--start` / `--end`. Product titles are headings (h2–h4 per page outline); the component resets the heading letter-spacing.
- **Headings inside components:** core gives `h1`–`h4` `letter-spacing: -0.02em`, so components that use a heading set their own letter-spacing (`.abq-product-card_name`, `.abq-spec-table_title`).
- **Icons:** inline SVG with `class="icon"` unless the component defines its own icon class. Core gives every svg `max-width: 100%`, so an icon in a flex row needs `.icon` (or `flex: none`) or it can shrink when space runs out.

### Conflicts (record; decide before page migration)

| Conflict | Values | Kept |
|---|---|---|
| Site buttons vs Button component | **CTA:** padding 14px 24px (≈48px) vs `.abq-btn--primary` h50 / px 24.<br>**Add to cart:** 16px, radius 11, padding 10px vs `--shine` 15px, radius 11, px 16.<br>**Cart:** hover `#E6EEFA` / `#0347871F` shadow vs `--secondary` `line-soft` / `nav-hover`.<br>**Log in:** border `#C7DCEE6A`, padding 8px 13px vs `--outline` solid Blue 100.<br>**Compare tile:** border `#03478733`, 12px padding vs `--tile` border Line | Both, exactly as exported. **Decide which values pages use**, then retire one set |
| ProductCard add to cart vs both | 15px, radius 10 | Kept inside the ProductCard component |
| `.abq-chip` vs `.abq-btn--chip` | Padding 7px 12px with normal line-height vs 6px 12px with line-height 1.2 | Both |
| FormField chevron and date icon | The export's `data:` URIs fail to load in Chromium, so its selects show no arrow at all | Icons rendered from `assets/img/field-*.svg`, following the export's CSS |

## Catalog (documentation only)

The catalog has 33 pages: one per state of the export viewer. All of them load the production `top.css`, `main.css` and `bottom.css`, then `design-system-docs.css`, followed by `main.js` and the docs script.

| Pages | Shows |
|---|---|
| `design-system/index.html` | Overview and the five levels, all linked |
| `design-system/foundations/*.html` (5) | Colour, typography, spacing, radius & elevation, icons |
| `design-system/components/*.html` (25) | Every component above, with all exported variants and states. Library pages for Button, FormField and Choice |
| `design-system/templates/home.html` | Link to the Home page (`../../`, the site root) |
| `design-system/templates/handoff.html` | `abecq-tokens.json` download and the CSS variables, with copy |

How it is put together:

- **Framing:** catalog-only framing is namespaced `.ds-docs-*` in `src/scss/docs/` (`_components.scss` holds the example cards, live frames, library tables and deferred previews). It never styles a component.
- **Inline styles:** none, apart from the per-item custom properties on foundation pages.
- **Demo links:** in-page demo links are `href="#"`. `index.html` links in the export point at the site root.
- **Deferred previews:** the Header/Footer and Home-section previews are placeholders marked with `data-docs-deferred`, and `data-docs-preview-target` records the block each one should show.
- **Pages are generated** from the normalized reference with an explicit class map. Sidebars are identical on every page, except that `aria-current` marks the current page.

## Validation (2026-10-29, components import)

- **Build:** `npm run build` exits 0.
  - Warnings are the existing Sass `@import`, `slash-div` and `global-builtin` deprecations.
  - `top.css` and `bottom.css` are byte-identical to before.
  - `main.css` gains only new selectors: `.abq-*`, `.visually-hidden`, `@property --mx`, `@keyframes stockPulse` and the reduced-motion rule. No existing selector changed.
- **Visual parity:** each catalog page, on the production CSS, was compared in headless Edge (Chromium 156) with the verified normalized reference state.
  - Setup: full page, animations paused at t=0, exact RGB match.
  - Coverage: 33 states × 1440, 961, 960 and 390px = 132 captures.
  - Result: **131 pixel-identical**. `section-heading` at 390px differs in 29 corner-anti-aliasing pixels (max Δ 2/255, identical geometry).
- **Icon sizes:** every SVG's rendered size matches the reference at 320, 390, 600, 960 and 1440px.
  - This check found the core `svg { max-width: 100% }` shrink.
  - Fixed with `flex: none` on `.abq-button_icon` and `.icon` on the display-only icons.
- **Interactions:** the same real input was sent to the reference and to the catalog page, and the results compared.
  - Hover end-states: 35/35 identical, 30 with a visible change.
  - Field focus border: identical.
  - Choice: 5 states identical.
  - Copy CSS variables: clipboard (7,570 chars), label and toast identical.
  - `tokens.json`: 16,784 bytes, identical.
  - Choice keyboard: Space toggles, the focus ring shows, Tab moves to the next control.
  - Foundation swatch copy: still works.
- **Catalog checks (all 33 pages):**
  - no inline CSS, handlers or scripts
  - every local reference and image resolves
  - every class used is defined
  - unique ids, button types, labels and accessible names
  - no heading skips
  - one current link per sidebar
  - no console errors and no network requests
- **Not verified:**
  - Production pages. `templates/home.php` does not exist yet, so `index.php` still fails (pre-existing), and `templates/header.php` and `footer.php` are empty. No production markup uses the new classes yet.
  - Browsers other than Chromium.
  - Screen readers.
  - Real clipboard and download (both were stubbed in tests).

## Known project issues outside this import

These are reported, not changed:

- `index.php` still loads Google Fonts Montserrat and Space Grotesk from the previous brand. No stylesheet uses them any more. It also declares `lang="ru"`.
- `assets/css/mobile.css`, `tablet.css` and `assets/css/pages/` are compiled leftovers with no source in `src/scss`.
- `src/js/main.js` was reduced to an empty skeleton, and `src/js/shared/accordion.js` and `home.js` were deleted, in the working tree during this import. That was not part of the import, and those changes are left as they are. The catalog was re-verified against the current `main.js`.
- `::selection { background: #d7e3ff; }` in `core/_core.scss` is a previous-brand value. The export defines no selection colour.
- `.ai/CODEBASE.md` lists `src/fonts/`, which does not exist. Fonts are public assets in `assets/fonts/` because the build has no copy step.

## Future PHP partial candidates (report only, do not implement)

- Site header and footer, once `SiteHeader.dc.html` and `SiteFooter.dc.html` are available.
- Product card, PDF card, Breadcrumb, Section heading and Form field (repeated per page with data): candidates for PHP partials in the decomposition task.
