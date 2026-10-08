# Hybrid Interaction — Design System, frontend export

The whole design system as standalone, framework-free HTML: every sheet in the design-system
navigation (Foundations, Atoms, Molecules, Sections) and every component file it links to.
Open `index.html` in a browser — no build step, no framework. Each page is one self-contained file:
CSS in `<head>`, page JS before `</body>`, images as relative `images/…` paths.

Animations: see `ANIMATION-SPEC.md`.

## Pages

**Overview** — `index.html` (search across every sheet and component)

**Foundations**
- `typography.html` · `colour.html` · `motion.html` · `icon-library.html`
- `3d-icons.html` · `3d-icon-lab.html` · `ui-illustrations-lab.html` · `image-guide.html`

**Atoms** — `button-library.html` · `tabs.html` · `icon-tile.html` · `pointer-tilt.html` · `figure.html`

**Molecules** — `article-blocks.html` · `cards.html` · `case-card.html` · `stat-row.html` · `logo-sphere.html` · `menu-panel-lab.html`

**Sections** — `site-header.html` · `site-footer.html`

**Component files** (each component on its own, at its default props, like opening the component file in the design tool):
`component-caption.html` · `component-button.html` · `component-accent-line.html` · `component-menu-row.html` ·
`component-menu-panel.html` · `component-numbered-row.html` · `component-news-card.html` · `component-filter-tabs.html` ·
`component-numeral.html` · `component-numbered-item.html` · `component-section-transition.html` ·
`component-section-head.html` · `component-faq-accordion.html` · `component-form-field.html` ·
`component-service-3d-strategy.html` · `-setup` · `-optimisation` · `-consultation` · `-migration`

## CSS structure (every page)

`DESIGN TOKENS` → `RESET` → `TYPOGRAPHY` → `LAYOUT` (design-system shell + sheet) → `BUTTONS` →
`COMPONENTS` (only the components that page uses) → `ANIMATIONS` → `RESPONSIVE`.
The token block is identical on every page — lift it once into your project's variables file.
Desktop-first; every breakpoint is the design's own, kept verbatim.

## Class names: design tool → export

The design tool's `hi-*` classes and `data-*` styling hooks are renamed to `block_element--modifier`.
The sheets show the export names wherever they document a class.

| Design system | Export |
|---|---|
| `.hi-hero` `.hi-figure` `.hi-display` `.hi-h1` `.hi-h2` `.hi-h-feature` `.hi-h3` | `.text_hero` `.text_figure` `.text_display` `.text_h1` `.text_h2` `.text_h_feature` `.text_h3` |
| `.hi-eyebrow` · `.hi-figcaption` (`data-mode="dark"`) | `.eyebrow` · `.figcaption` (`.figcaption--on-dark`) |
| `.hi-body-lg/md/sm` · `.hi-label` | `.text_body_lg/md/sm` · `.text_label` |
| `.hi-prose-l/m/s` · `.hi-bullets(-l/m/s)` · `.hi-bullet` | `.prose.prose--l/m/s` · `.bullets(.bullets--l/m/s)` · `.bullet` |
| `.hi-tabbar[data-mode][data-rule][data-scrollfade]` · `.hi-tab[data-active]` | `.tabs.tabs--light/dark.tabs--rule.tabs--scrollfade` · `.tabs_item[aria-selected]` |
| `.hi-m-lead` `.hi-m-section` `.hi-m-rule` `.hi-m-quote` | `.article_lead` `.article_section` `.article_rule` `.article_quote` |
| `.hi-m-postmeta` `.hi-m-dateline` `.hi-m-tags/.hi-m-tag` `.hi-m-railfact` `.hi-m-numrow` | `.post_meta` `.dateline` `.tag_list/.topic_tag` `.rail_fact` `.numbered_row` |
| Button `variant="…" mode="dark" size="…" iconOnly` | `.button.button--{variant}.button--on-dark.button--{xs/sm/lg/xl}.button--icon` |

Component props became modifiers (e.g. Value Card `tone="dark" reveal="always"` → `.value_card--dark.value_card--open`;
Case Card `variant` / `tone` → `.case_card--featured/standard/compact` + `.case_card--violet/blue/…`).
Prose that names a design-tool *file* (`hi-fonts.css`, `hi-typography.css`, `Case Card.dc.html`, `<dc-import …>` samples) is kept
verbatim: it documents the design source; in this export those values live in each page's CSS sections.

## JavaScript

One IIFE per feature, no globals, no libraries. Shared behaviours:
- **Design-system nav** — group accordions + live filter.
- **Filter tabs** — `[data-tabs]` keeps its own selection and fires a bubbling `tabs:change` event (`detail.key`);
  `.tabs--scrollfade` measures overflow and fades only the clipped side; a clipped tab is scrolled into view by
  tweening the bar's own `scrollLeft` (never `scrollIntoView`).
- **Count-up** — any `[data-count-up]` figure (`data-count-prefix/suffix/decimals`).
- **In-view triggers** use `IntersectionObserver` plus a rAF-throttled scroll check as a fallback
  (some embedded hosts never deliver IO entries). Each element fires once.

Two runtime files are shipped **verbatim** inside the pages that need them (they were framework-free already):
- `hi-3d-icons` (3D icon pages + overview) — defines `<hi-3d-icon>`; it loads three.js r150 on demand from
  `https://unpkg.com/three@0.150.1/build/three.min.js` (self-host it and change `THREE_URL` if you prefer).
  Each element's look is its attributes (`icon`, `glow`, `tex-*`, `rotate-speed`, `flow-speed`, `mouse-parallax`, `drag-rotate`…).
  The material/lighting config the 3D Icon Lab edits (`localStorage['hi3d:config']`) equals the renderer defaults, so nothing is baked.
- `hi-tilt` (pointer-tilt) — `data-hi-tilt` on a wrapper; injects its own small stylesheet `#hi-tilt-css`.
- Every three.js page also carries the **iOS glow fix** inline in `<head>`; it must run before three.js loads.

## Notes and deliberate differences

- **Cursor.** The design tool's Button and Menu Row use `cursor:none` because the live site draws a custom cursor.
  These sheets have no custom cursor, so buttons and rows use `cursor:pointer`.
- **Logo Sphere logo tint.** The design tints the grey parts of two marks with a CSS mask + `mix-blend-mode`.
  Masks on artwork can fail silently in a standalone file, so the tint is pre-baked: `images/logos/partners/fast-track-w-tinted.svg`
  and `xtremepush-w-tinted.svg` (same blend maths; white stays white).
- **Icons** are inline SVG in `currentColor` (no CSS masks); ui-* icons keep their 2.2 stroke.
- **Figure** — the design tool's droppable image slot is a plain `<img>` here.
- **Component files** open as the design tool previews them: Caption defaults to its dark mode (light text on white);
  Logo Sphere takes its 320px minimum height; Menu Panel is shown docked (undocked it is hidden until a header opens it).
- **Overview tiles** — the tiny drawings inside each tile stage keep their inline styles: they are one-off decorative art,
  not reusable UI. Everything structural is class-based.
- **Site Header / Site Footer** reuse the site chrome exactly as delivered in the page exports (`header_*`, `footer_*`,
  site button skins such as `button--outline-dark`), so the sections match the pages you already have.
- **Links outside the design system** (`site-navigation.html`, `news.html`, `crm-strategy.html`, `contact.html`,
  `partner-page.html?p=…`, `case-study.html`…) use the production page names from the page exports.
- Copy is verbatim from the design, including the Russian lines on the 3D Icon Lab.

## Images

`images/icons/` nav and value marks · `images/3d/` 3D badges · `images/logos/` partner, client and credit logos ·
`images/team/` portraits · `images/guide/` Image Guide examples · `images/figure/` figure sample.
