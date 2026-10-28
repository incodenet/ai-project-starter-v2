# Normalization report — `home-8a594335-b1`

**Status: `READY_WITH_EXCEPTIONS`.** Every exception is listed under "Exceptions and deviations".

| | |
|---|---|
| Prompt | `.prompts/normalize-design-export.md` |
| Mode | INITIAL (first normalized Home snapshot) |
| Date | 2026-10-28 |
| Source | `raw/extracted/home-8a594335`, from `raw/pages/index.html` (SHA-256 `8a594335…f435`) |
| Output | `pages/home.html` plus `assets/` (28 images, 1 video, 2 fonts) |
| Design-system baseline | `raw/normalized/design-system-91951f68-b1`. Its fonts and 191 tokens are reused verbatim. Its component batches have not been normalized yet, so there were no component classes to align with |

## Scope

This batch is one logical template, the Home page. It covers:

- **All 11 sections:** loader, header, hero, trust bar, categories, certification, in stock, calibration CTA, knowledge hub, brands and footer.
- **The shared components as Home uses them:** SiteHeader (including the mobile menu and the compare tooltip), SectionHeading ×5 and Button ×4.
- **Every user-visible state** reachable with the default props.

The stable ids (`data-design-id`) match `raw/extracted/home-8a594335/pages-manifest.json`. The full map is in `normalized-manifest.json` under `sections`.

**Not rendered:**

- **Authoring controls:** the `editMode=true` upload, fit, position and scale tools, which only exist for authoring in Claude Design.
- **Prop variants Home does not use by default:**
  - `catBlocks` / `guideBlocks` = "3 blocks"
  - `slidesPerView` = "4"
  - `show*` = false

## How it was built

1. **Source styles.** Each rendered element was matched to its template element through `data-dc-tpl`, which is its index inside `<x-dc>`; this matched 870 of 880 elements, and the other 10 are `dc-import` hosts.
   - Each element's style was taken from the **template source**. The live inline styles could not be used: React writes `var()` shorthands through the CSSOM, and the browser serializes them as empty longhands.
   - `{{ }}` bindings were resolved from the live default state (129 bindings).
   - The 39 nodes that React created at runtime (images, trust icons, the video) kept their rendered styles.
2. **Classes.** A hand-written naming map (`block`, `block_element`, `block--modifier`) assigned every styled element a class.
   - A builder running in sandboxed Chrome moved the declarations into 240 class rules.
   - Values that differ between list items became modifiers or custom properties: `--comet-delay` and `--guide-panel`.
3. **Source CSS.** The 250 live rules from the page sheet, the header sheet and the runtime `style-hover` sheet were retargeted to the classes of exactly the elements they matched. Each rewrite was re-checked against the transformed DOM.
   - `!important` was dropped. These rules now come after the base rules, which gives the same cascade.
   - Non-important declarations that the inline style had always beaten were removed. The full list is in the manifest (`deadSourceRules`).
4. **Hand-written parts:**
   - The loader markup and CSS (the loader only exists in the source while the page loads).
   - The JavaScript-driven state classes.
   - Nine vanilla JS modules. The DCLogic behaviour was ported line by line, including the hero video's frame capture and reverse playback.
5. Nothing from the export was executed in Node. Chrome ran with a throwaway profile and all network access blocked.

## Conversions from the Claude runtime

| Export construct | Normalized |
|---|---|
| `<x-dc>`, `<helmet>`, dc-runtime, React UMD, `dc-import` | One plain document; components inlined where they are used |
| Inline `style` | Named classes. The 254 remaining `style` attributes only set `--comet-delay` (×250) or `--guide-panel` (×4) |
| `[data-r]` and structural selectors, `!important` | Class selectors, each verified to match the same elements; ordered after the base rules |
| `style-hover` (runtime `.scpN` classes) | `:hover` rules |
| `sc-if` (mobile menu, tooltip, badges, burger icons, loader) | `hidden`, `aria-expanded` and state classes |
| `sc-for` | Static markup |
| Bound styles (dropdown, stock tabs) | `.is-open` and `.stock-tabs_tab--active` |
| `#__assets` alias shim | Removed; direct relative paths with readable file names |
| Google Fonts preconnect | Removed; fonts are local |

**Semantics added:**

- `<main>` landmark.
- `<h3>` for category, certification, product and guide titles; `<h2>` for footer column titles.
- Accessibility attributes:
  - `aria-expanded` / `aria-controls` on the Products toggle and the burger;
  - `role="tablist"` / `role="tab"` / `aria-selected` on the stock tabs;
  - `aria-pressed` on compare;
  - `role="link"`, `tabindex` and Enter support on the search and compare shortcuts;
  - `alt` on every image (product name, brand logo, or empty when decorative);
  - `type` on every button;
  - Escape closes the Products menu.

## Validation

### Static and DOM checks: pass

- **Removed constructs:** none of these remain: `{{ }}`, `sc-*`, `x-dc`, `helmet`, `dc-import`, `style-hover`, DCLogic, React, `blob:`, `data:` URIs, bundle UUIDs, `support.js`, `data-r`, `data-dc-*`.
- **Structure:**
  - Exactly one `<style>` (in `<head>`) and one `<script>` (before `</body>`).
  - No inline handlers and no `!important`.
- **References:** all 33 local references resolve, and nothing loads from external URLs.
- **Markup:**
  - Ids are unique.
  - Every image has `alt`, and every button has a `type`.
  - There is one `h1`, and heading levels never skip.
- **Custom properties:** every `var()` resolves, and no CSS class lacks an element (the loader removes itself after load).
- **Console:** no errors.

### Computed styles, element by element (801 elements, 21 widths)

The widths tested were 1440, 1400, 1399, 1280, 1121, 1120, 1025, 1024, 901, 900, 861, 860, 800, 641, 640, 561, 560, 521, 520, 390 and 360, which bracket every breakpoint in the source.

- Page height and scroll width are equal to the original at **all 21 widths**.
- Every computed property and box matches, except these explained cases:
  - **Burger icons:** the comparison state injected a cloned menu icon into the original.
  - **"View all" link** (exception 1).
  - **Certification heading box** (deviation 2): its children sit in identical positions.
  - **`.hero` margin at 1400px:** the original reports 0 instead of 46px auto, while its box is identical.

### Pixel comparison (full page, animations frozen, media hidden)

| Width | 1440 | 1400 | 1280 | 1121 | 1120 | 1024 | 900 | 800 | 641 | 640 | 520 | 390 | 360 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Different px | 248 | 248 | 248 | 54 | 248 | 54 | 248 | 302 | 0 | 0 | 0 | 0 | 0 |

The only differing pixels are the "View all" link (exception 1).

The hero `<video>` and canvas were hidden for this comparison, because the playback frame depends on timing. Their behaviour was compared separately (see below). This is **not** a claim of pixel parity in other browsers.

### Interactions, run as the same script on both documents

All of these give identical results:

- **Loader:** shown on load, then removed.
- **Products dropdown:** hover opens it, leaving closes it, and a click toggles it.
- **Compare tooltip.**
- **14 hover states:** audience card, product card, category card, guide card, brand logo, footer link, slider arrow, CTA, add to cart, login, cart, search, "View all" and payment badge.
  - The add-to-cart `--mx` gradient was sampled mid-transition, so the values differ only by timing.
- **Stock tabs:** the tab styles and the product photo set switch (Professional shows the `productPro-*` images).
- **Slider arrows:** they scroll by 840px and back to 0.
- **Add to cart:** it writes to localStorage and the badge goes from 3 to 4.
- **Mobile menu at 800px:** the burger is visible, the menu opens with 10 links, and a link click closes it.
- **Product card click:** navigates to `site.html#product`.
- **Hero video:** the same timeline. It plays from 0.5s to the end, holds for 2s, plays backwards for about 4.5s on the canvas, then restarts.

**Keyboard** (normalized only):

- Enter opens the Products menu and Escape closes it, returning focus to the toggle.
- Enter on the search shortcut navigates.
- Space selects the Professional tab.

### Not verified

- Browsers other than Chrome.
- Screen-reader output.
- Real touch devices: only viewport widths were emulated.
- `prefers-reduced-motion`. The page keeps the export's behaviour: only the entrance animation honours it.

## Animation inventory

| Target | Effect | Status |
|---|---|---|
| Page loader | Counter eases to 90%, then to 100% once load and fonts are ready (4s cap); clip-path fill; fades out over .45s | Preserved (JS + CSS) |
| Page entrance | Each block fades in from translateY(16px), 420ms; skipped under reduced motion | Preserved (WAAPI, as in the export) |
| Hero band and stock band comet trails | `cometHero` 6.3s and `cometMove` 18s on 50-segment paths, with a staggered delay per segment | Preserved (`--comet-delay`) |
| Hero title rule shine | `heroGap` 3.2s | Preserved |
| Footer comet line | `footerComet` | Preserved |
| Hero video | Forward play, 2s hold, reverse canvas playback, restart | Preserved (JS port) |
| Products dropdown | Opacity, transform and visibility, .18s | Preserved |
| Card, button, link and logo hovers | Transforms, shadows, filters and colours | Preserved (14 checked) |
| Add-to-cart hover | Registered `@property --mx` transitioning to 70% | Preserved |
| `abq-p1`–`abq-p3`, `floaty` | Defined in the export but used by no element (hero layer `anim: "none"`) | Not emitted (no reference) |

## Exceptions and deviations

1. **"View all" link (1px).** The Button runtime host wrapper was unwrapped, so the link is now a flex item of its flex container. The container is 1px shorter and the link sits 0.5px higher, which accounts for all the pixel differences above.
   - Keeping a redundant wrapper would restore parity. That is a choice for the refactor step.
2. **Certification heading spacing.** Below 1024px, `[data-r=certs] > div > div` gave padding and a minimum height to the SectionHeading runtime host.
   - The host is gone, so the same declarations now sit on `.certifications .section-heading`: a manual rewrite with identical geometry.
   - The companion `… > div:first-of-type` rule now targets `.cert-card_code` only. On the heading it was a no-op.
3. **Removed invisible nodes:**
   - the hero deco rings, orbit and ring, and the duplicate "plain" trust grid (all `display:none` at every width, with no rule that shows them);
   - edit-mode tools and upload outlines;
   - the logo placeholder text.
4. **Compare toggle.** In the export it flips state, but no style is bound to that state. It now toggles `aria-pressed` only, so there is still no visual change.
5. **Compare tooltip.** It is shown with CSS (`:hover`, `:focus-visible`) instead of a JS mouse-enter state. The result is the same, plus keyboard focus.
6. **`a:hover` is written as `a:where(:hover)`.** In the export, every link that sets its own colour does so inline, and inline styles always beat `a:hover`. The `:where()` form keeps that true once those colours live in classes.
7. **Preserved but redundant.** Several rules keep the source's shorthand-then-longhand pairs (for example `padding` followed by `padding-top`), so the output stays faithful. Collapsing them is a refactor-step clean-up.
8. **Value literals.** Where the builder read a live value, the source literal was restored: tab colours, guide gradients, the slide flex basis, the video mask and the header border.

## Integrations still missing (for the refactor)

- **Cart, compare and the add-to-cart button** work on demo data in localStorage (`abecq-cart-v3`, `abecq-compare-v4`), seeded with the export's sample items.
- **Navigation:** search, compare, cart, the product cards, login and the language link (`#`) only navigate to `site.html#…` targets. None of these pages are part of this export.
- **The products dropdown and mobile menu links** point at `site.html#…` category anchors.

## Source anomalies kept as-is

- **Misleading source comment.** The comment "IN STOCK PRODUCTS" sits above the certification section, and the DS labels that preview "In stock products". The real in-stock slider is `home.in-stock`. This is still a DS-side review item.
- **Footer.** The footer is inline on Home. `SiteFooter.dc.html`, which the DS expects, is not part of any export so far.
- **`support.js`.** The components reference it, but it is missing from the export. It is not needed: the page no longer depends on any Claude runtime.

## Next step

Run `.prompts/refactor-raw-html.md` (page INITIAL) with `raw/normalized/home-8a594335-b1/pages/home.html` as its read-only raw input.

The SiteHeader, SectionHeading and Button markup here is how Home uses them. If the components should come from the design system, normalize DS batch 2 (atoms, including Button) first, then align them.
