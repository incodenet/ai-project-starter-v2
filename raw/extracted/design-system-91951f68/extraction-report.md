# Extraction report — `design-system-91951f68`

Mode: **INITIAL** (no earlier snapshot under `raw/extracted/`).
Prompt: `.prompts/unpack-design-export.md`.
Date: 2026-10-28.

## Input

| Field | Value |
|---|---|
| Path | `raw/exports/design-system.html` |
| SHA-256 | `91951f6819d709e2aadd273357a72b24ece91f610d7f32ced8b3b701653d7196` |
| Size | 7,170,359 bytes |
| Detected type | Claude Design bundled HTML (`claude-design-bundle`) |
| Role | Design system. Evidence: wrapper title "ABECQ Design System", sidebar label "Design System · v1.0 · source: Home", nav groups FOUNDATIONS / ATOMS / MOLECULES / ORGANISMS / TEMPLATES, a `:root` design-token block, 5 `data-ds-card` overview links |
| Bundler blocks | `__bundler/manifest` (63 entries), `__bundler/template`, `__bundler/ext_resources` (10), `__bundler/page_order` (present, **empty `[]`**) |

This file is byte-identical to `raw/design-system/design-system.html` as committed in `5589614`. The working tree moved it to `raw/exports/`.

### Manifest entries by MIME type

| MIME | Count | Notes |
|---|---|---|
| image/webp | 20 | |
| image/png | 18 | |
| image/svg+xml | 11 | gzip in bundle |
| text/html | 7 | the `.dc.html` component documents |
| text/javascript | 3 | dc-runtime, React 18.3.1 UMD, ReactDOM 18.3.1 UMD |
| font/woff2 | 2 | Outfit (latin, latin-ext) |
| text/css | 1 | Embedded Google Fonts CSS for Outfit |
| video/mp4 | 1 | `assets/media/heroPart-0.mp4` |

## Method

- A Node script found the raw-text `<script>` blocks the way an HTML tokenizer does: script content ends at the first `</script`, and comments are skipped. No `<!--` sequences appear inside any bundler block.
- The bundler JSON was read with `JSON.parse`. Each entry was base64-decoded and gunzipped only when `compressed: true`. Bytes were written unchanged.
- Nothing from the export was executed: no `eval`, no DOM, no Babel, React, DCLogic, wrapper loader or `postMessage` relay.
- Asset files are named `<sha256[0:16]>.<mime-ext>`. Byte-identical entries are stored once, and all of their UUIDs and logical paths are recorded in `manifest.json`.
- The script ran twice and produced identical output apart from `extractedAt`.

## Output

```text
raw/extracted/design-system-91951f68/
  manifest.json              # export, hashes, uuidMap, assets, ext_resources, unresolved refs, verification
  pages-manifest.json        # 33 DS viewer states
  components-manifest.json   # foundations, 7 dc components, 27 inline examples, 9 external previews
  extraction-report.md
  documents/
    design-system.html                       # template with UUIDs rewritten to ../assets/<hash>.<ext>
    _original/design-system.template.raw.html  # template exactly as stored (UUIDs intact)
    Button.dc.html  SectionHeading.dc.html  Breadcrumb.dc.html  ProductCard.dc.html
    PdfCard.dc.html  FormField.dc.html  Choice.dc.html          # copied byte-for-byte
  assets/                    # 50 files (from 56 non-document UUIDs)
```

The component documents sit next to `design-system.html` on purpose. `ext_resources` ids such as `./Button.dc.html` then resolve relative to the main document without being rewritten. Runtime syntax (`<x-dc>`, `<helmet>`, `<dc-import>`, `<sc-for>`, `<sc-if>`, `style-hover`, `{{ }}` bindings, the `text/x-dc` DCLogic script) is kept unchanged for the normalization step.

### Counts

| Item | Count |
|---|---|
| Manifest entries mapped | 63 / 63 |
| Documents recovered | 9: 1 main template, 1 raw template copy, 7 `.dc.html` |
| Asset files | 50 (56 UUIDs; 4 duplicate groups merged) |
| UUID references rewritten in template | 54 (53 distinct) |
| Screen registry (DS viewer states) | 33, all `confirmed` |
| DS dc components | 7 |
| DS inline examples | 27 |
| External previews (unresolved) | 9 |
| Design tokens in `:root` | 191 (color 68, font 22, fw 4, lh 20, ls 8, space 28, radius 13, shadow 28) |
| Icons in `ICONS` | 84 |

## Screen registry

The document is a single stateful DS viewer, not a set of site pages.

- State `page` is set from `location.hash` by `pageFromHash()`. It defaults to `overview` when the hash is missing or unknown. The `SUB` sub-state map is empty.
- Visibility comes from the CSS rule `main[data-r=main][data-page] > section { display:none }` plus one `display:flex` rule per id.

Every state has four matching pieces of evidence: a sidebar link, a `<section id>`, an entry in `IDS`, and a CSS visibility rule.

| Group | States |
|---|---|
| foundations (6) | overview, color, type, space, radius, icons |
| atoms (4) | buttons, links, forms, choice |
| molecules (13) | audience, tabs, purchase, heading, crumbs, cards, chips, gallery, toc, auth, feedback, commerce, faq |
| organisms (8) | components, mobilemenu, compare, checkoutbar, loader, organisms, overlays, accnav |
| templates (2) | templates, handoff |

No separate HTML file was created for each state; isolating states is the normalization step's job. **This export contains no site pages**: `page_order` is empty, and `index.html` is referenced but not bundled.

## DS registry

- **dc components (7):** Button, SectionHeading, Breadcrumb, ProductCard, PdfCard, FormField, Choice. Each entry lists its prop schema from `data-props`, enum options (for example, Button has 16 `variant`s and 4 `size`s), dependencies and its `<dc-import>` usages in the DS.
- **Inline examples (27):** every non-foundation section. Component boundaries are not established yet. The 2 sections that rely on iframes (`#components`, `#organisms`) are marked `needs-review`.
- **External previews (9), all unresolved:**
  - Header and Footer come from `SiteHeader.dc.html` and `SiteFooter.dc.html`.
  - Seven Home sections come from `index.html`: hero, trust-sec, cats, certs, cta-sec, guides-sec, brands.
- **Foundations:** the token block, 84 icons (sources: ABECQ Site, ABECQ Home, SiteHeader, PdfCard) and 2 Outfit woff2 fonts.

Nothing has been rendered or checked for fidelity, and nothing has been imported into production.

## Anomalies and unresolved references

1. **`./support.js` is missing.** All 7 `.dc.html` documents load `<script src="./support.js">`, and it is in neither the manifest nor `ext_resources`.
   - The main template instead loads a bundled script that starts with `// GENERATED from dc-runtime/src/*.ts`: `assets/8fe7df74405f3c55.js`.
   - That script may be what `support.js` refers to, but nothing in the bundle confirms it, so it is left unresolved.
2. **Iframe preview targets are missing.** `SiteHeader.dc.html`, `SiteFooter.dc.html` and `index.html` are not bundled, so the `#components` and `#organisms` previews (and the `#templates` link to `index.html`) cannot render from this snapshot. A Home or site export is needed.
3. **File extensions don't match contents (15 assets).** Logical names such as `assets/media/cat-0.png` and `assets/media/guide-0.jpg` contain WebP bytes. In every case the `data-alias` (`.webp`) matches the real format. Each is listed under `verification.info` in `manifest.json` with `extensionMismatch: true`.
4. **Duplicate bytes under different names (4 groups).**
   - `product-0` = `productInd-0` = `productPro-3`
   - `product-2` = `productInd-4` = `productPro-1`
   - `product-1` = `productInd-1`
   - `product-3` = `productPro-2`
5. **Fonts are embedded twice.** The embedded Google Fonts CSS (`assets/28d684a1bde40714.css`) contains `data:` woff2 URIs that are byte-identical to the two woff2 assets. The CSS was kept unchanged, so it still has `data:` URIs. The template's own `@font-face` now points to `../assets/*.woff2`.
6. **The asset alias shim still runs at runtime.** The template's inline shim maps `assets/...` paths to the `src` attributes inside `#__assets`, using a MutationObserver and an `HTMLImageElement.src` override. Those `src` attributes are now relative files. Dynamic paths in DCLogic, such as `'assets/media/productInd-' + n + '.png'`, still depend on that shim.
7. **Runtime gaps.** Without the wrapper loader, `window.__resources` is not injected. Whether the dc-runtime falls back to fetching `./X.dc.html` relative to the document has not been verified.
8. `crossorigin=""` on the `fonts.gstatic.com` preconnect was kept. The loader would have stripped it.
9. External URLs were not fetched: `https://fonts.googleapis.com` and `https://fonts.gstatic.com` (preconnect hints only). The Google Fonts stylesheet and React UMD are embedded in the bundle.

## Verification

| Check | Result |
|---|---|
| All 3 JSON manifests parse | pass |
| Every asset file's SHA-256 matches its decoded bytes | pass (50/50) |
| Every manifest UUID is mapped | pass (63/63) |
| No UUIDs left in the rewritten template | pass |
| Every `../assets/` link in the rewritten template exists | pass |
| Every `ext_resources` entry recovered | pass (10/10) |
| Magic bytes match the declared MIME type | pass |
| `page_order` documents present | n/a (empty) |
| Sidebar links, `IDS` entries and sections agree | pass (33/33/33) |
| Original export unchanged (SHA-256 re-checked) | pass |
| `src/`, `templates/`, `assets/` untouched | pass |
| Opened in a browser | **not done.** No fidelity claim is made |

## Recommended next step

- **`.prompts/normalize-design-export.md`**, scoped to `raw/extracted/design-system-91951f68/` and starting with foundations (the token block plus fonts), then atoms.
- Before normalizing `#components` and `#organisms`, unpack a Home or site export that contains `index.html`, `SiteHeader.dc.html` and `SiteFooter.dc.html`, and ideally `support.js`.
