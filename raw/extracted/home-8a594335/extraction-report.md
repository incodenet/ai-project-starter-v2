# Extraction report — `home-8a594335`

Mode: **INITIAL** for this export. No earlier Home snapshot exists. It is cross-referenced against `raw/extracted/design-system-91951f68` (see "Relation to the design-system snapshot").
Prompt: `.prompts/unpack-design-export.md`.
Date: 2026-10-28.

## Input

| Field | Value |
|---|---|
| Path | `raw/pages/index.html` (untracked in git) |
| SHA-256 | `8a594335c7332908a51486be098017feccff779ded9d7cb9d973a78e9d64f435` |
| Size | 7,148,805 bytes |
| Detected type | Claude Design bundled HTML (`claude-design-bundle`) |
| Wrapper title | "Bundled Page" (generic, not evidence of role) |
| Role | Home page. Evidence: section comments `HEADER`, `HERO`, `TRUST BAR`, `CATEGORIES`, `IN STOCK PRODUCTS`, `CALIBRATION CTA`, `KNOWLEDGE HUB`, `BRANDS`, `FOOTER`; all 7 `data-r` ids that the DS "Home sections" previews load from `index.html` are present; the DS breadcrumb uses `first-label="Home" first-href="index.html"` |
| Bundler blocks | `__bundler/manifest` (59 entries), `__bundler/template` (224,059 chars), `__bundler/ext_resources` (6), `__bundler/page_order` (present, **empty `[]`**) |

### Manifest entries by MIME type

| MIME | Count | Notes |
|---|---|---|
| image/webp | 20 | |
| image/png | 18 | |
| image/svg+xml | 11 | gzip in bundle |
| text/html | 3 | SiteHeader, SectionHeading, Button `.dc.html` (gzip) |
| text/javascript | 3 | dc-runtime, React 18.3.1 UMD, ReactDOM 18.3.1 UMD (gzip) |
| font/woff2 | 2 | Outfit (latin, latin-ext) |
| text/css | 1 | Embedded Google Fonts CSS for Outfit (gzip) |
| video/mp4 | 1 | `assets/media/heroPart-0.mp4` |

## Method

- A Node script found the raw-text `<script>` blocks the way an HTML tokenizer does: content ends at the first `</script`. The loader JS mentions `type="__bundler/template"` as a string, so a plain string search finds the wrong place; the scanner avoids that.
- The bundler JSON was read with `JSON.parse`. Each entry was base64-decoded and gunzipped only when `compressed: true`. Bytes were written unchanged.
- Nothing from the export was executed: no `eval`, no DOM, no Babel, React, DCLogic, wrapper loader or `postMessage` relay.
- Asset files are named `<sha256[0:16]>.<mime-ext>`, the same scheme as the DS snapshot. Byte-identical entries are stored once, and all of their UUIDs and logical paths are recorded.
- The `#__assets` alias block was parsed per tag with attribute order ignored (`data-alias` sits between `data-asset` and `src`).
- The extraction ran twice and produced identical output apart from `extractedAt`.
- The scripts are not part of the repo. They live in the session scratchpad (`tools/lib.js`, `extract.js`, `registries.js`).

## Output

```text
raw/extracted/home-8a594335/
  manifest.json              # export, hashes, documents, assets, uuidMap, references, relatesTo, verification
  pages-manifest.json        # 1 page (home) with 11 sections, variants, persistence, outbound routes
  components-manifest.json   # 3 dc components + mapping of the DS "Home sections" previews to Home sections
  extraction-report.md
  documents/
    index.html                                # template with UUIDs rewritten to ../assets/<hash>.<ext>
    _original/index.template.raw.html         # template exactly as stored (UUIDs intact)
    SiteHeader.dc.html  SectionHeading.dc.html  Button.dc.html   # copied byte-for-byte
  assets/                    # 50 files (from 56 non-document UUIDs)
```

The `.dc.html` documents sit next to `index.html`, so `<dc-import name="X">` and the `ext_resources` ids (`./X.dc.html`) still resolve relative to the main document. Runtime syntax (`<x-dc>`, `<helmet>`, `<dc-import>`, `<sc-for>`, `<sc-if>`, `{{ }}` bindings, the `text/x-dc` DCLogic script) is kept unchanged for normalization.

### Counts

| Item | Count |
|---|---|
| Manifest entries mapped | 59 / 59 |
| Documents recovered | 5: 1 main template, 1 raw template copy, 3 `.dc.html` |
| Asset files | 50 (56 UUIDs; 4 duplicate groups merged) |
| UUID references rewritten in template | 62 (53 distinct) |
| Pages | 1 (`home`) |
| Sections | 11 (10 `confirmed`, 1 `needs-review`) |
| dc components | 3 |
| Outbound `site.html#…` targets | 22 from Home, plus 9 from SiteHeader (all unresolved) |

## Page and section registry

The document is one DC page, not a routed app. It never reads `location.hash`. Links and the `goCart`, `goSearch`, `goCompare` and `goProduct` handlers leave the page for `site.html#<id>`.

| Section (`stable_id`) | Selector | Heading | Gate / variants |
|---|---|---|---|
| `home.loader` | `[data-r="ldr-o"]` | — | `sc-if loaderOn`; fades out after load, fonts and header are ready |
| `home.header` | `dc-import[name="SiteHeader"]` | — | SiteHeader states `menuOpen`, `prodOpen`, `cartN` |
| `home.hero` | `section[data-r="hero"]` | (h1) | props `heroBlend`, `heroPlay`, `heroLoop`, `heroLoopPause`, `heroVideo`, `heroPoster`; `#hero-band-bg` and `#hero-band-line` carry `data-screen-label` |
| `home.trust-sec` | `section[data-r="trust-sec"]` | — | `sc-if showTrustBar` |
| `home.cats` | `section[data-r="cats"]` | Browse by product type | `catBlocks`: 3 or 4 blocks (default 4) |
| `home.certs` | `section[data-r="certs"]` | Standards you can rely on | — |
| `home.in-stock` **needs-review** | `[data-r="band"] > section` | In stock now | `state.stockTab` individual or professional; `slidesPerView` 3 or 4 (default 3) |
| `home.cta-sec` | `section[data-r="cta-sec"]` | Keep every device certified & compliant | — |
| `home.guides-sec` | `section[data-r="guides-sec"]` | Guides & road-safety data | `sc-if showKnowledgeHub`; `guideBlocks`: 3 or 4 (default 4) |
| `home.brands` | `section[data-r="brands"]` | Trusted manufacturers | `sc-if showBrandStrip` |
| `home.footer` | `footer[data-r="footer"]` | — | inline, not a dc-import |

`editMode` is a page-wide variant (default `false`). It shows upload, fit, position and scale controls and sets card `href`s to `null`. `data-screen-label` appears only on the two decorative hero-band layers. Neither is a route.

Persistence used by DCLogic: `localStorage` keys `abecq-cart-v3`, `abecq-cat-fits`, `abecq-cat-pos`, `abecq-cat-scale`, `abecq-div`, `abecq-trust-icon`, `abecq-trust-tile`, `abecq-fits-<ns>`, and IndexedDB `abecq-media` (v1) for uploaded media.

## Component registry

| Component | Props | Uses in Home | vs DS snapshot |
|---|---|---|---|
| SiteHeader | `divider`, `spacer`, `loginHref`, `loginLabel` | 1 (header) | **new**: not in the DS bundle. Resolves DS `preview.header` |
| SectionHeading | `eyebrow`, `title`, `size`, `align`, `marginTop`, `marginBottom` | 5 | byte-identical |
| Button | 14 props (16 `variant`s) | 4 (`link`, `text` ×2, `primary`) | byte-identical |

## Relation to the design-system snapshot

- **Assets:** all 50 are byte-identical to the DS snapshot's, with the same hash filenames, logical paths and aliases. This export adds no assets.
- **Documents:** `Button.dc.html` and `SectionHeading.dc.html` are identical. `SiteHeader.dc.html` is new.
- **DS previews resolved by this export** (`components-manifest.json → homeSectionsAsDesignSystemPreviews`):
  - `preview.header` resolves to `SiteHeader.dc.html`.
  - `hero`, `trust-sec`, `cats`, `cta-sec`, `guides-sec` and `brands` resolve to the Home sections with the same `data-r`.
  - `certs` is **resolved, needs review**. See anomaly 1.
  - `preview.footer` is still **unresolved**. See anomaly 2.
- The DS snapshot was left as it was. Its iframes point at `index.html` relative to its own `documents/` folder, so they still find nothing there. Linking the two snapshots belongs to normalization, not extraction.

## Anomalies and unresolved references

1. **The "In stock" label is misplaced.** Two source comments sit back to back with no element between them: `CERTIFICATION`, then `IN STOCK PRODUCTS`. The next element is `section[data-r="certs"]`, which holds certification standards (OIML R 126, EN 15964, EN 16280). The DS labels its `certs` preview "In stock products" with class `abq-product-grid`, which matches the comment, not the content. The real in-stock slider is the next section, which has no `data-r` of its own and is wrapped in `data-r="band"` and `data-r="stock-in"`. It is registered as `home.in-stock` (`needs-review`).
2. **There is no `SiteFooter.dc.html`.** The DS expects one. Home inlines `<footer data-r="footer">` instead. Whether the two are the same component has not been confirmed.
3. **`./support.js` is still missing.** All 3 `.dc.html` files load it, and it is in neither the manifest nor `ext_resources`. This is the same gap as the DS snapshot. The main template loads the dc-runtime bundle (`assets/8fe7df74405f3c55.js`) instead.
4. **`site.html` is not bundled.** 22 distinct `site.html#…` targets come from Home, including the dynamic `site.html#guide-breath/<sec>`, and 9 come from SiteHeader. All are unresolved.
5. **File extensions don't match contents (15 assets).** For example, `assets/media/cat-0.png` and `assets/media/guide-0.jpg` contain WebP bytes. In every case the `data-alias` (`.webp`) matches the real format. The same 15 appear in the DS snapshot.
6. **Duplicate bytes under different names (4 groups)**, the same as the DS snapshot:
   - `product-0` = `productInd-0` = `productPro-3`
   - `product-2` = `productInd-4` = `productPro-1`
   - `product-1` = `productInd-1`
   - `product-3` = `productPro-2`
7. **Dynamic asset paths in DCLogic** (brand logos, `cat-3` and `cat-4`, the product images, `heroPart-0.mp4`) all match known logical paths. They still rely on the inline `#__assets` alias shim at runtime (MutationObserver and an `HTMLImageElement.src` override).
8. **Fonts are embedded twice.** The Google Fonts CSS (`assets/28d684a1bde40714.css`) still has `data:` woff2 URIs that are byte-identical to the 2 woff2 files. It was kept unchanged.
9. **External URLs were not fetched.** `fonts.googleapis.com` and `fonts.gstatic.com` are preconnect hints only (`crossorigin` kept). The stylesheet and the React UMD scripts are embedded.
10. **Runtime gaps.** Without the wrapper loader, `window.__resources` is not injected. Whether dc-runtime falls back to fetching `./X.dc.html` relative to the document has not been verified.
11. **Unusual input location.** The input sits in `raw/pages/`, not `raw/exports/`. It was treated as a read-only original either way.

## Verification

| Check | Result |
|---|---|
| All 3 JSON manifests parse | pass |
| Every asset file's SHA-256 matches its decoded bytes | pass (50/50) |
| Every manifest UUID is mapped | pass (59/59) |
| No UUIDs left in the rewritten template | pass |
| Every rewritten `../assets/` and `./*.dc.html` link exists | pass (47/47) |
| Every `ext_resources` entry recovered | pass (6/6) |
| Magic bytes match the declared MIME type | pass |
| `page_order` documents present | n/a (empty) |
| Every static `assets/…` path in markup and DCLogic resolves to a known name | pass (32/32) |
| Two runs produce identical output (except `extractedAt`) | pass |
| Original export unchanged (SHA-256 re-checked) | pass |
| `src/`, `templates/`, `assets/` and the DS snapshot untouched | pass |
| Opened in a browser | **not done.** No fidelity claim is made |

## Recommended next step

- **`.prompts/normalize-design-export.md`**, scoped to `raw/extracted/home-8a594335/`. Start with `SiteHeader.dc.html` and the shared Button and SectionHeading, then the Home sections in DOM order. Use `raw/extracted/design-system-91951f68/` for tokens and foundations.
- Before normalizing, settle anomaly 1 (which section is the DS "In stock products" preview) and anomaly 2 (inline footer versus `SiteFooter.dc.html`).
- A `site.html` export would resolve the outbound routes and might also supply `support.js` and `SiteFooter.dc.html`.
