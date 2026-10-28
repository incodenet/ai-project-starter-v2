# Extraction report: `design-system-91951f68-r2`

| | |
|---|---|
| Prompt | `.prompts/unpack-design-export.md` |
| Mode | Full re-extraction (INITIAL procedure) |
| Date | 2026-10-28 |
| Previous snapshot | `design-system-91951f68`, kept unchanged |

This pass covers every embedded document in the export. It also covers every iframe target and every `sc-if` / `sc-for` branch, and builds a full inventory of DS sections and components.

## Finding: the earlier extraction was not missing documents

This pass decoded the whole bundle again. The previous snapshot's 8 documents and 50 assets are byte-identical to this pass's output.

The "Foundation only" scope comes from the **normalization** batch, not from extraction. `raw/normalized/design-system-91951f68-b1` covers only the 6 foundation states.

What the previous snapshot did lack was detail:
- a document graph
- resolution of the iframe targets
- a record of each conditional branch
- examples broken down section by section

This snapshot adds all four.

## Input

| Field | Value |
|---|---|
| Path | `raw/exports/design-system.html` (unchanged) |
| SHA-256 | `91951f6819d709e2aadd273357a72b24ece91f610d7f32ced8b3b701653d7196` |
| Size | 7,170,359 bytes |
| Type | Claude Design bundle |

### Bundler blocks

| Block | Content |
|---|---|
| `__bundler/manifest` | 63 entries |
| `__bundler/template` | 225,115 chars |
| `__bundler/ext_resources` | 10 entries |
| `__bundler/page_order` | `[]` (empty) |

The wrapper also has one inline loader script.

### Linked export (used only to resolve iframe targets)

| Field | Value |
|---|---|
| Path | `raw/pages/index.html` |
| SHA-256 | `8a594335…` |

It was decoded fresh and compared with the files already in `raw/extracted/home-8a594335/`. The hashes match, and it was not re-extracted here.

## Method

The extractor runs in Node and executes nothing from the export:
- no `eval`
- no DOM
- no React, Babel or DCLogic
- no wrapper loader

It works in these steps:
1. Script blocks are found the way an HTML tokenizer finds them.
2. Each block is read with `JSON.parse`, base64-decoded, and gunzipped only when the entry has `compressed: true`.
3. A parse tree that keeps source positions is built for each of the 8 documents. All 8 parsed without stray, unclosed or implicitly closed tags.
4. The bundle is checked for nested bundles. The search covered:
   - `__bundler` blocks inside every decoded text entry
   - `srcdoc`
   - `about:blank#UUID`
   - Blob/`createObjectURL` HTML
   - `<template>`, `<frame>`, `<object>`, `<embed>`

   **None were found.** The only Blob is the `abecq-tokens.json` download button.
5. Two runs produced identical output except for `extractedAt`.

The extractor script lives outside the repo, in the session scratchpad: `C:\Users\Admin\AppData\Local\Temp\claude\c--xampp-htdocs-ai-project-starter-v2\a361af26-aaaf-4e30-94ca-18bcca5b96b9\scratchpad\extract.js`.

## Embedded documents: 8 found, 8 extracted

| # | Document | Source | Bytes | sc-if | sc-for | Path |
|---|---|---|---|---|---|---|
| 1 | design-system (root) | `__bundler/template` | 225,269 | 1 | 10 | `documents/design-system.html` |
| 2 | Button | manifest `3b8997e4…` | 74,561 | 47 | 8 | `documents/Button.dc.html` |
| 3 | SectionHeading | manifest `4672ff96…` | 10,302 | 0 | 0 | `documents/SectionHeading.dc.html` |
| 4 | Breadcrumb | manifest `1aa7391d…` | 10,679 | 1 | 0 | `documents/Breadcrumb.dc.html` |
| 5 | ProductCard | manifest `ee9ba3a2…` | 14,245 | 2 | 0 | `documents/ProductCard.dc.html` |
| 6 | PdfCard | manifest `e09429cb…` | 8,627 | 0 | 0 | `documents/PdfCard.dc.html` |
| 7 | FormField | manifest `6888fc32…` | 21,476 | 9 | 4 | `documents/FormField.dc.html` |
| 8 | Choice | manifest `944f35a2…` | 20,148 | 15 | 2 | `documents/Choice.dc.html` |

Notes on the documents:
- The byte count for the root is after its UUIDs were rewritten.
- `documents/_original/` holds the exact stored bytes of all 8 documents. The root has its UUIDs intact there.
- Each of the 7 component documents is an `<x-dc>` file with a `text/x-dc` DCLogic script and a `data-props` schema. None of them imports another dc component, so the library is one level deep.
- `page_order` is empty, so the bundle declares no further pages.

## Document graph

The full graph is in `documents-manifest.json` under `edges` and `iframeTargets`.

### dc-import edges (11, all resolved)

| Target | Usages | Sections |
|---|---|---|
| Button | 1 | `#buttons` |
| SectionHeading | 2 | `#heading` |
| Breadcrumb | 2 | `#crumbs` |
| ProductCard | 1 | `#cards` |
| PdfCard | 3 | `#cards` |
| FormField | 1 | `#forms` |
| Choice | 1 | `#choice` |

### Iframe edges (9 targets from 2 `sc-for` lists)

The DS finds each target with `doc.querySelector('[data-r="<key>"]') || doc.getElementById(key)`. The `abq-*` class next to each preview is only a caption label.

| List | Key | Target file | In this bundle | Status |
|---|---|---|---|---|
| `{{ components }}` (`#components`) | header | `SiteHeader.dc.html` | no | **Resolved across exports.** `home-8a594335/documents/SiteHeader.dc.html` (sha `5916297e…`) contains `[data-r="header"]` |
| `{{ components }}` | footer | `SiteFooter.dc.html` | no | **Unresolved.** See below |
| `{{ previews }}` (`#organisms`) | hero, trust-sec, cats, certs, cta-sec, guides-sec, brands | `index.html` | no | **Resolved across exports.** `home-8a594335/documents/index.html` contains every `[data-r]` (original template sha `ff22098f…`) |

### Other edges

- **Anchor:** `#templates` links to `index.html`, which resolves across exports. Breadcrumb's default `firstHref` is also `index.html`.
- **Scripts:**
  - The root loads the dc-runtime (`assets/8fe7df74405f3c55.js`), React and ReactDOM. All three resolve.
  - All 7 dc documents load `./support.js`, which is **unresolved**.

### dc components in both exports

- Button and SectionHeading are byte-identical in both exports.
- Breadcrumb, ProductCard, PdfCard, FormField and Choice exist only in the DS export.

## Conditional content

`conditionals-manifest.json` lists 99 conditionals. For each one it records:
- the expression
- the `hint-placeholder` value
- any parent conditionals
- the section it belongs to
- the **full branch markup** and its SHA-256

Nothing was evaluated or removed. 72 branches are hidden in the default preview (`hint-placeholder-val="{{ false }}"` or count `0`), and they are kept in full.

| Document | Conditionals | Hidden by default | Markup in branches | Notes |
|---|---|---|---|---|
| Button | 55 | 48 | 194 KB | `isAll` gallery. One `it.f_<variant>` branch for each of 15 variants: primary, glow, gradient, white, secondary, outline, link, text, tile, circle, shine, quiet, chip, dashed, badge. Plus size columns, modifier and single-button loops |
| Choice | 17 | 11 | 17 KB | `isCheckbox`, `isRadio`, `isCard`, `checked`, `hasPrice`, `hasLabel`, `hasCount`, `showText`, `isRowKind` |
| FormField | 13 | 9 | 13 KB | `isInput`, `isSelect`, `isTextarea`, `hasPrompt`. Loops over `f.opts`, `samples` and `single` |
| ProductCard | 2 | 2 | 0.5 KB | `p.tag`, `p.stock` |
| Breadcrumb | 1 | 1 | 0.3 KB | `hasMid` |
| Root | 11 | 1 | 7 KB | 10 data loops: colorGroups, g.items, typeScale, spacing, radii, shadows, icons, components, sampleProducts, previews. Plus the global `{{ toast }}` |

## Design System inventory (`components-manifest.json`)

The DS has 33 sections in 5 groups. The sidebar group of every section matches its eyebrow, and every section is `confirmed` on 4 pieces of evidence:
- a sidebar link
- a `<section id>`
- an entry in `IDS`
- a CSS visibility rule

The 75 examples break down by evidence type:

| Evidence type | Count | Confidence |
|---|---|---|
| `code-label` | 44 | confirmed |
| `dc-import` | 11 | confirmed |
| `sc-for-list` | 6 | confirmed |
| `ds-card` | 5 | confirmed |
| `iframe-list` | 2 | confirmed |
| `caption-row` | 5 | needs-review |
| `block` | 2 | needs-review |

Every top-level block of each section is also listed with its hash, so nothing is dropped.

### Foundations (6)

| Section | Examples |
|---|---|
| `#overview` | 5 nav cards (`data-ds-card`) |
| `#color` | `colorGroups` loop and `abecq-tokens.css` |
| `#type` | `typeScale` loop and 4 weights `--abq-fw-*` |
| `#space` | `spacing` loop (21) |
| `#radius` | `radii` (7) and `shadows` (5) loops |
| `#icons` | `icons` loop (84 icons) |

Other foundation data:
- **Tokens:** 191 in total: color 68, font 22, fw 4, lh 20, ls 8, space 28, radius 13, shadow 28.
- **Icon sources:** ABECQ Site 79, SiteHeader 3, ABECQ Home 1, PdfCard 1.
- **Fonts:** 2 Outfit woff2 files.

### Atoms (4)

| Section | Examples |
|---|---|
| `#buttons` | `abq-button` (live `Button.dc.html`, `variant=all`), `--primary`, `--gradient`, `--secondary`, `--outline`, `abq-icon-button` |
| `#links` | `abq-link--arrow · abq-lang`, `abq-eyebrow` |
| `#forms` | live `FormField.dc.html` (`kind=all`) |
| `#choice` | live `Choice.dc.html` (`kind=all`) |

### Molecules (13)

| Section | Examples |
|---|---|
| `#audience` | `abq-audience-card--dark · --glass` |
| `#tabs` | `abq-segmented`, `abq-tabs-underline` |
| `#purchase` | `abq-purchase` |
| `#heading` | `abq-section-head`, plus live SectionHeading with `align="left"` and with `align="center"` |
| `#crumbs` | `abq-breadcrumb`, 2 live Breadcrumbs (2 levels and 3 levels) |
| `#cards` | `abq-product-card` (live ProductCard × `sampleProducts` 3), `abq-pdf-card` (3 live) |
| `#chips` | `abq-tag`, `abq-chip` |
| `#gallery` | `abq-gallery` |
| `#toc` | `abq-toc` |
| `#auth` | `abq-auth-actions` |
| `#feedback` | stock status pulse, checkout step badge, success and error toasts, `abq-empty-state` |
| `#commerce` | quantity stepper h52 and h40, pagination, specification table |
| `#faq` | FAQ accordion (source: Calibration services) |

### Organisms (8)

| Section | Examples |
|---|---|
| `#components` | Header and Footer as iframes |
| `#mobilemenu` | `abq-mobile-menu` |
| `#compare` | `abq-compare` |
| `#checkoutbar` | `abq-checkout-steps` |
| `#loader` | `abq-loader` |
| `#organisms` | 7 Home sections as iframes: hero, trust-sec, cats, certs, cta-sec, guides-sec, brands |
| `#overlays` | `abq-modal`, `abq-sheet` |
| `#accnav` | account side navigation (source: Account) |

### Templates (2)

| Section | Examples |
|---|---|
| `#templates` | Home page reference card linking to `index.html` |
| `#handoff` | tokens download and `{{ cssText }}` code block |

### dc component library (7)

| Component | Props and variants |
|---|---|
| Button | 14 props. `variant`: 16 options (`all` and 15 variants). `size`: sm, md, lg, xl. `iconLeft` and `iconRight`: 16 options each. `type`: button, submit |
| SectionHeading | `size`: md, sm. `align`: left, center |
| Breadcrumb | first, mid and current label/href |
| ProductCard | `p` (object) |
| PdfCard | title, size, href |
| FormField | `kind`: input, select, textarea, all. `type`: 6 options |
| Choice | `kind`: all, checkbox, radio, card |

### External components (9)

8 resolve across exports and 1 is unresolved (SiteFooter). See the Document graph section.

## Missing and unresolved

1. **`SiteFooter.dc.html` is missing from both exports.**
   - The `#components` Footer preview has no target file.
   - The home template has an inline `[data-r="footer"]` block. It is only recorded as a candidate: it is not a `SiteFooter.dc.html` document, and equivalence is unverified.
   - An export that bundles `SiteFooter.dc.html` is needed.
2. **`./support.js` is missing.**
   - All 7 dc documents load it, and it is in neither the manifest nor `ext_resources`.
   - The root uses the bundled dc-runtime (`assets/8fe7df74405f3c55.js`) instead. Nothing in the bundle confirms the two are the same.
3. **`SiteHeader.dc.html` and `index.html` are not in this bundle.**
   - They resolve only through `raw/extracted/home-8a594335/`.
   - They were not copied in, so this snapshot does not render those previews on its own.
4. **Previously known issues, unchanged:**
   - 15 assets have an extension that doesn't match their contents (`.png`/`.jpg` names hold WebP bytes). They are listed under `verification.info`.
   - 4 groups of duplicate bytes are stored once.
   - The Google Fonts CSS still embeds the fonts as `data:` URIs.
   - The runtime asset-alias shim still applies.
   - The dynamic `'assets/media/productInd-' + n + '.png'` paths depend on that shim.

## Output

```text
raw/extracted/design-system-91951f68-r2/
  manifest.json               # export and linked-export hashes, 63-entry uuidMap, 50 assets, verification
  documents-manifest.json     # 8 documents: scripts, styles, links, dc-imports, iframes, edges, iframeTargets
  conditionals-manifest.json  # 99 sc-if/sc-for with full branch markup
  components-manifest.json    # foundations, 33 sections, 75 examples, 7 dc components, 9 external
  pages-manifest.json         # 33 DS viewer states (all confirmed)
  extraction-report.md
  documents/                  # design-system.html (UUIDs rewritten) and 7 *.dc.html files
  documents/_original/        # 8 raw documents, stored bytes
  assets/                     # 50 files, named by content hash
```

## Verification

| Check | Result |
|---|---|
| Errors | 0 |
| Warnings | 0 |
| Manifest entries mapped | 63 / 63 |
| Decoded hashes matching the files on disk | all |
| Rewritten references in the root | 54, all targets exist |
| Template UUIDs missing from the manifest | 0 |
| `ext_resources` entries present in the manifest | all |
| Nested bundles | 0 |
| `page_order` | empty, 0 pages to check |

Nothing outside `raw/extracted/design-system-91951f68-r2/` was changed:
- the originals in `raw/exports/` and `raw/pages/`
- the previous snapshots
- production SCSS, JavaScript and PHP
- the canonical Design System

Nothing has been rendered or checked for fidelity.

**Next step:** run `normalize-design-export.md` on the atoms, molecules, organisms and templates in this snapshot, in batches. The normalization so far covers foundations only.
