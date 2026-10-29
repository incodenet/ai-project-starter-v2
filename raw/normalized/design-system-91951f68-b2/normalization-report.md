# Normalization report: `design-system-91951f68-b2`

**Status: `READY_WITH_EXCEPTIONS`.** Every exception is listed under "Exceptions and deviations". None of them blocks a component.

| | |
|---|---|
| Prompt | `.prompts/normalize-design-export.md` |
| Mode | INITIAL |
| Date | 2026-10-28 |
| Source | `raw/extracted/design-system-91951f68-r2`, from `raw/exports/design-system.html` (SHA-256 `91951f68…7196`) |
| Output | `design-system/index.html`, `assets/`, `normalized-manifest.json` |
| Previous batch | `raw/normalized/design-system-91951f68-b1` (shell + Foundations), left unchanged |

## Scope

This snapshot is the complete design-system catalog: all **33 states** and all **7 dc components**.

Batch 1 (the catalog shell and the 6 foundation states) is carried forward unchanged, except for one extension of its copy module, described under "Conversions". This batch adds the remaining 27 states:

| Level | States |
|---|---|
| Atoms (4) | Buttons, Links & eyebrow, Form fields, Choice controls |
| Molecules (13) | Audience cards, Segmented tabs, Purchase actions, Section heading, Breadcrumb, Product & PDF cards, Tags & chips, Product gallery, Page contents, Auth actions, Status & feedback, Commerce controls, FAQ accordion |
| Organisms (8) | Header & footer, Mobile menu, Compare table, Checkout progress, Page loader, Home sections, Drawers & modals, Account navigation |
| Templates (2) | Home page, Tokens as code |

### Components

| Component | Classes | What the catalog shows |
|---|---|---|
| `Button.dc.html` | `.abq-btn` + variant and size modifiers | Full `variant="all"` library: 15 variants, sizes sm to xl, icon left and right, link and text, icon-only (tile, circle, badge), chip and dashed tile |
| `SectionHeading.dc.html` | `.abq-section-heading` | Left and center alignment |
| `Breadcrumb.dc.html` | `.abq-breadcrumb` | 2 levels and 3 levels (both `hasMid` branches) |
| `ProductCard.dc.html` | `.abq-product-card` | 3 sample products, with and without a tag |
| `PdfCard.dc.html` | `.abq-pdf-card` | 3 instances |
| `FormField.dc.html` | `.abq-field` | `kind="all"`: 9 samples covering input text, email, password, tel, date; select with and without a disabled prompt; textarea |
| `Choice.dc.html` | `.abq-choice`, `.abq-choice-card` | `kind="all"`: checkbox, radio and option card, each checked and unchecked, all interactive |

Inline catalog specimens keep the class their caption names, for example `abq-tag`, `abq-chip`, `abq-toc` and `abq-modal`. The full list is in `normalized-manifest.json` under `specimens`.

### Deferred previews

These are not normalization failures. They are listed under `deferredPreviews` in the manifest.

| State | Preview | Why it is deferred |
|---|---|---|
| `#components` | Header (`SiteHeader.dc.html`) | Not in this export. It exists in the Home export (`raw/extracted/home-8a594335`) and is normalized as part of `raw/normalized/home-8a594335-b1/pages/home.html` |
| `#components` | Footer (`SiteFooter.dc.html`) | In no supplied export. Home only has an inline footer, and equivalence is unverified |
| `#organisms` | 7 Home blocks: hero, trust-sec, cats, certs, cta-sec, guides-sec, brands | `index.html` is not in this export (same Home snapshot as above) |

Each deferred preview keeps the export's 240px frame and its head row (label, file, class), and carries a visible "Deferred" note. Nothing was substituted for the missing content.

`deferredPreviewContract` in the manifest records how the export's `fit()` scaling works, so the previews can be wired up later.

## Method

1. **Writing the markup.** Every state was written by hand from the extracted source: inline styles, `style-hover`, `style-focus`, `sc-if`/`sc-for` branches and the DCLogic data tables. Exact values were kept.
2. **Runtime-generated content.** This was computed from the DCLogic tables and then checked against the original. That covers:
   - Button sizes and arrow defaults
   - FormField and Choice samples
   - ProductCard samples
   - the handoff CSS and JSON
3. **Rendering the original.** The original was rendered offline in **headless Edge (Chromium 156)**:
   - a throwaway profile
   - all http, https, ws and wss requests blocked
   - no export code run in Node

   The handoff `cssText` and `abecq-tokens.json` were captured from that render. The JSON was captured by intercepting its Blob.
4. **Assembly.** A build script outside the repo assembled b1 plus the 27 fragments. It:
   - copies every SVG verbatim from the source (`sc-camel-view-box` becomes `viewBox`)
   - moves each SVG's `style` into named classes
   - refuses to build if any SVG keeps an inner style other than a zero margin or padding no-op

## Conversions from the Claude runtime

| Export construct | Normalized |
|---|---|
| `<dc-import name="Button" variant="all">` + `SIZES` / `ARROW_DEFAULT` | Static library. One class per variant, with sizes as per-variant custom properties (`--btn-h`, `--btn-px`, `--btn-r`, `--btn-fs`, `--btn-gap`) |
| 47 `sc-if it.f_<variant>` branches | Every variant rendered at least once |
| `sc-if` / `sc-for` in FormField, Choice, ProductCard, Breadcrumb | All branches present, as static markup or as CSS states (`:checked`, `:has()`, `:focus`) |
| `style-hover` / `style-focus` (runtime `.scpN:hover` rules with `!important`) | Plain `:hover` and `:focus` rules |
| Choice `onClick` toggles and `onPick` (React state) | Native, visually hidden checkbox and radio inputs. The drawn control follows `:checked`. **No JavaScript** |
| FormField controlled `value` + `onChange` | Native control state |
| ProductCard `onAdd` / `onCompare` (only `preventDefault`) | `type="button"` buttons outside the link |
| FormField helmet CSS: select chevron, date icon, hidden picker indicator, no number spinners | Scoped to `.abq-field_control`. The two `data:` URI icons became `assets/images/field-*.svg` |
| Handoff `copyCss` / `downloadJson` | See below |
| `@property --mx` (Button and ProductCard helmets) | `@property --mx` in the CATALOG EXAMPLES section |
| `[data-r=g2]` single column under 960px | `.ds-grid` rule in the existing 960px block |
| `#__assets` alias shim, product image paths | Direct relative paths (`assets/images/product-individual-*`) |

**Handoff actions.**
- **Copy CSS variables:** b1's copy module now also accepts `data-copy-target="#id"`, so the button copies the text of the `<pre>`.
- **Button label:** a small module switches it to "Copied" for 1400 ms.
- **Download tokens.json:** a `TOKENS` constant reproduces the export's `abecq-tokens.json` byte for byte.

**JavaScript added in this batch.** Only the handoff module. Everything else is HTML and CSS. The catalog still has exactly one `<style>` and one `<script>`.

**The global `a:hover` trap.** The export's `a:hover { color: #1F95F9 }` lost to inline colours. Every anchor component that sets its own colour therefore also sets it on `:hover`, so hovering keeps the original colour.

## Validation

### Static and DOM checks: pass

- **Runtime constructs:** none remain. That covers `{{ }}`, `sc-*`, `x-dc`, `helmet`, `dc-import`, `style-hover`, `style-focus`, `DCLogic`, React, `blob:`, `data:` URIs, bundle UUIDs and `support.js`.
- **Code hygiene:**
  - no inline event handlers
  - no external URLs
  - 1 `<style>` and 1 `<script>`
  - 161 `style` attributes, all of them custom properties only (all from batch 1)
- **Accessibility and semantics:**
  - unique ids, one `h1`, no heading-level skips
  - every image has `alt` and loads
  - every button has a `type`, and every icon-only button has an accessible name
  - every form control has an `id` and a label
- **CSS integrity:**
  - every class used in the markup is defined
  - every custom property resolves
  - every local reference resolves
- **Runtime:** no console errors.
- **Unused classes:** 6 are defined but not rendered. They are documented component API states: `.abq-btn--full`, `.abq-section-heading--sm`, `.abq-field--full`, `.abq-choice--top`, `.abq-choice--radio` and `.abq-choice_count`.

### Pixel comparison against the original

Method:
- headless Edge (Chromium 156), 1x, full-page captures
- the original export and the normalized catalog are opened at the same hash
- Web Animations are paused at t=0 in both before capture
- exact RGB match, with no threshold

**Result:** 108 captures. **108 have the same page size as the original**, and **93 are pixel-identical.**

The table lists only the states that differ. Each value is the % of differing pixels. "max Δ" is the largest per-channel difference, out of 255.

| State | 1440 | 961 | 960 | 390 | Cause |
|---|---|---|---|---|---|
| `#heading` | 0 | 0 | 0 | 0.0083% (max Δ 2) | Corner anti-aliasing only; identical geometry |
| `#components` | 0.3657% | 0.5552% | 0.5486% | 1.3681% | Deferred previews: visible "Deferred" note in place of failed iframes (intended) |
| `#cards` | 0.4196% (max Δ 11) | 0.1902% (max Δ 9) | 0 | 0 | Anti-aliasing at card edges/corners; identical geometry to 0.001px (ProductCard restructure changes compositing) |
| `#organisms` | 0.6297% | 0.9418% | 0.9796% | 2.4568% | Deferred previews: visible "Deferred" note in place of failed iframes (intended) |
| `#forms` | 0.0441% | 0.0384% | 0.0277% | 0.0456% | Select chevron and date icon rendered; the export's data: URIs fail to load (intended, see Exceptions) |

All other 22 new states are pixel-identical at all four widths. Batch 1's 6 foundation states are unchanged from b1, whose report has their comparison. This is visual equivalence in Chromium at the tested widths, **not** a claim of pixel parity in every browser.

### Interaction parity: pass

The same real CDP input was sent to both documents, and the resulting computed styles were compared.

| Check | Result |
|---|---|
| Hover end-states (transform, box-shadow, background, colour, border, opacity) | **35/35 identical**: all 21 Button-library items plus 14 specimens and cards. 30 have a visible hover change; the other 5 (Button text, both circles, chip, dashed) have no hover in the source either |
| `--mx` shine sweep (`@property` transition) | Identical `background-image` after hover (specimens, library, ProductCard) |
| FormField focus | Border `rgb(226, 231, 242)` to `rgb(31, 149, 249)` in both |
| Choice | 5 states identical (initial, then 4 clicks: checkbox on, checkbox off, radio switch, option-card switch) |
| Copy CSS variables | Clipboard text identical (7570 chars). Button label "Copied", reverting to "Copy CSS variables". Toast text identical |
| Download tokens.json | Same file name; Blob identical (16784 bytes) |
| Console errors | 0 |

Batch 1's navigation, group collapse, swatch copy and toast code is carried over unchanged. b1's interaction run tested it, and that run was not repeated here. What was checked here is that no `data-ds-pending` link remains, and that every sidebar link and overview card resolves to one of the 33 sections.

### Not verified

- Browsers other than Chromium (Edge 156).
- A real clipboard write (the harness stubbed it) and a real file download (the Blob was intercepted).
- Screen-reader output.
- The FormField date picker opening from the custom icon.

## Animation inventory

| Target | Effect | Status |
|---|---|---|
| `@keyframes stockPulse` (stock dot) | 7px ring, 1.8s ease-out, infinite | Preserved (deferred in b1) |
| `--mx` radial highlight (shine, Add to cart specimens, ProductCard) | Registered `<percentage>`, 0% to 70% over .95s cubic-bezier(.4,0,.2,1) | Preserved |
| Button lifts (primary, glow, gradient, white) | `translateY` −2 or −3px; transform/shadow over .15–.25s | Preserved |
| Colour and background hovers (secondary, outline, tile, quiet, circle, specimens) | .15–.22s | Preserved |
| Link nudge (arrow link, Button link) | `translateX(2px)` .25s | Preserved |
| Audience cards | `translateY(-3px)` .15s | Preserved |
| ProductCard lift / compare / PDF card background | −4px + card-hover shadow .15s / .2s / .2s | Preserved |
| Button badge inside a Home brand card | Background .2s, `[data-r="brand-card"]:hover` | Preserved (the card itself is Home content) |
| Segmented option | `transition: all .18s` (no state change in the source) | Preserved |
| FAQ chevron | `transform .2s`; open item rotated 180° | Preserved (static; the source has no toggle) |
| Page loader fill and fade | Described in its caption, but this export only draws a static 64% frame | Not in source. Deferred to Home normalization |
| Preview iframe fade-in | `opacity .3s` after `fit()` | Deferred with the previews |
| `prefers-reduced-motion` | Not in the export | **Added** for the infinite stock pulse only |

## Exceptions and deviations

### 1. Deferred previews

The 9 previews are deferred, as listed above. These two states therefore differ visibly from the export, whose iframes fail and leave empty grey frames.

### 2. FormField select chevron and date icon

The export does not render them, but the normalized catalog does.

- **Evidence:** the export's own CSS specifies both icons with `!important`. Its `data:` URIs fail to load in Chromium, both inside the bundle and in a clean page. The same SVG loads when re-encoded, as base64, or as a file.
- **Effect in the export:** selects lose their native arrow (`appearance: none`) and get no chevron.
- **Decision:** I followed the source CSS and used valid asset files. This is the one place where the catalog intentionally looks different from the rendered export. **Reverse it if you want the export's visible state instead.**

### 3. Two versions of each button

The `#buttons` specimens keep the export's literal values, and these differ from `Button.dc.html`.

| Specimen | Specimen value | `Button.dc.html` value |
|---|---|---|
| Calibration CTA | padding 14px 24px | primary is h50 |
| Add to cart | 16px, radius 11 | shine is 15px |
| Cart | `#E6EEFA` hover | secondary uses `line-soft` |

ProductCard's own Add to cart (15px, radius 10) differs from both. All three are kept, as `.abq-btn--*` for the component and `.abq-button--*` / `.abq-icon-button--*` for the specimens. **Reconciling them is a decision for `import-design-system.md`.**

### 4. Semantic restructuring (renders identically)

- **ProductCard:** the source wraps buttons inside `<a href="#product">`, which is invalid. It is now an `<article>` whose name link stretches over the card. The click target and hover are the same.
- **Choice and FormField:** they use native inputs, every control has an `id`, and Choice gains a `:focus-visible` ring. The source rows could not be reached by keyboard.
- **Button library:** items without an href are `<button type="button">` (the source used `<a role="button" tabindex="0">`).
- **Specification table:** `<dl>`.
- **Headings:**
  - Live-frame titles are `<h3>`, library titles `<h4>`, and the Button "Links & icons" heading `<h5>`.
  - SectionHeading and `abq-section-head` keep their `<h2>`, because that is the component contract.

### 5. Home links

The export links `index.html`, meaning the Home page, from the Breadcrumb "Home" link and the Home page template card. Because `design-system/index.html` is the catalog itself, those links now point at `../../home-8a594335-b1/pages/home.html`. The original value is kept in `data-ds-source-href`.

### 6. Static specimens

The following are drawn exactly as in the source, with no behaviour, because the export has none: segmented tabs, gallery arrows, page contents scroll-spy, auth actions, mobile menu toggle, compare remove and cart, checkout steps, quantity steppers, pagination, overlays, FAQ toggle and account navigation.

I added no behaviour. In particular, the FAQ has no answers for its closed items, so a toggle would need invented content.

### 7. Source placeholders kept

The following placeholders are the source's own: "main image", "illustration 182×116", and the grey field blocks in the modal and the sheet.

### 8. Not shown by the catalog

Component API states that the catalog does not render are styled and listed in `normalized-manifest.json` under `components[].apiStatesNotRendered`. They include Button full, disabled and submit, the legacy aliases, SectionHeading `sm`, FormField `full`, and Choice `top` and count.

## Next steps

1. **Run the Components phases of `import-design-system.md`** with `raw/normalized/design-system-91951f68-b2/design-system/index.html` as the read-only input. The Foundations phase can keep using b1 or switch to b2, since both are identical there.
2. **Resolve the Header and 7 Home previews** from `raw/normalized/home-8a594335-b1/pages/home.html`, using `deferredPreviewContract`.
3. **Get the footer.** `SiteFooter.dc.html` needs an export that bundles it.
