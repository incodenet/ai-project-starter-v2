# Normalization report — `design-system-91951f68-b1`

**Status: `READY_WITH_EXCEPTIONS`.** The exceptions come from batch scope and are listed below.

| | |
|---|---|
| Prompt | `.prompts/normalize-design-export.md` |
| Mode | INITIAL (no earlier normalized snapshot) |
| Date | 2026-10-28 |
| Source | `raw/extracted/design-system-91951f68`, from `raw/exports/design-system.html` (SHA-256 `91951f68…7196`) |
| Output | `design-system/index.html` plus `assets/` (logo and two Outfit woff2 files) |

## Scope of this batch

The design system is one catalog document with 33 hash-selected states and 7 runtime components. The prompt asks for one template or a small explicit batch per run, so batch 1 covers:

- **Catalog shell.**
  - Sticky sidebar with five collapsible `<details>` groups.
  - Hash-based state switching, with the active link highlighted.
  - The copy-to-clipboard toast.
  - The 960px breakpoint.
- **Foundations (6 states).**
  - Overview (`#overview`)
  - Colour (`#color`): 9 groups, 68 swatches
  - Typography (`#type`): 20 rows, 4 weights
  - Spacing (`#space`): 28 steps
  - Radius & elevation (`#radius`): 13 radii, 28 shadows
  - Icon library (`#icons`): 84 icons

**Not in this batch:** 27 states (4 atoms, 13 molecules, 8 organisms, 2 templates) and all 7 `.dc.html` components. Their sidebar and overview links are kept, marked `data-ds-pending`, and fall back to `#overview`. That is the same fallback the export uses for unknown ids. The full list is in `normalized-manifest.json` under `pendingStates`.

## How it was built

1. The list content (swatches, type rows, spacing, radii, shadows, icons) was read from the **original rendered in headless Chrome**, after its runtime had filled the `sc-for` lists. The export shows live values read from `:root` (`tv()`), so this captures exactly what users see, rather than the slightly different literals in `DCLogic`.
2. Chrome ran with a throwaway profile and all network access blocked. Nothing from the export was run in Node.
3. The shell, the overview, the CSS and the JS were written by hand. A small build script generated the six long lists into readable, indented static markup. It checked every assumption against the rendered data, for example that each spacing bar width equals its label and that only the eyebrow sample is uppercase and blue.
4. The 191 product tokens and the `@font-face` rules were copied verbatim from the export.

## Conversions from the Claude runtime

| Export construct | Normalized |
|---|---|
| `<x-dc>`, `<helmet>`, dc-runtime, React UMD | Plain document; `<title>` and the one `<style>` in `<head>` |
| `<sc-for>` lists | Static markup |
| `{{ }}` bindings and live `tv()` reads | Static text. Visual values come from tokens through per-element custom properties: `--swatch`, `--type-size`, `--type-lh`, `--type-ls`, `--weight`, `--bar-width`, `--radius`, `--shadow` |
| `data-page="{{ page }}"` plus 99 per-id rules | `hidden` on sections and `aria-current="page"` on the active link |
| `style-hover` | `:hover` rules |
| Copy handler and `sc-if` toast | `data-copy` buttons and a `role="status"` toast that hides itself when empty |
| `#__assets` alias shim (MutationObserver plus `img.src` override) | Removed; direct relative paths instead |
| Google Fonts preconnect hints | Removed; fonts are local |

Inline `style` attributes appear 161 times, and **all of them only set a custom property** (one data value per item). No inline CSS properties remain.

## Validation

### Static and DOM checks: pass

- **Removed constructs:** none of the following remain: `{{ }}`, `sc-*`, `x-dc`, `helmet`, `dc-import`, `style-hover`, `DCLogic`, React, `blob:`, `data:`, bundle UUIDs, `support.js`.
- **References:** every local path resolves, and nothing is loaded from external URLs.
- **Structure:**
  - Exactly one `<style>` (in `<head>`) and one `<script>` (before `</body>`).
  - No inline event handlers.
- **Markup:**
  - Ids are unique.
  - Every image has `alt`, and every button has a `type`.
  - There is one `h1`, and heading levels never skip.
- **Custom properties:** every `--abq-*`, `--ds-*` and per-element custom property resolves.
- **Fonts:** Outfit loads from the local file. The latin-ext subset only downloads when needed.

### Pixel comparison against the original (headless Chrome, 1x, full page)

| Width | overview | color | type | space | radius | icons |
|---|---|---|---|---|---|---|
| 1440 | 0 | 0 | 0 | 0 | 0.011% | 0.014% |
| 1024 | 0 | 0 | 0 | 0 | 0.005% | 0.007% |
| 961 | 0 | 0 | 0 | 0 | 0.005% | 0.006% |
| 960 (sidebar hidden) | 0 | 0 | 0 | 0 | 0.007% | 0.023% |
| 390 | 0 | 0 | 0 | 0 | 0.009% | 0.019% |

- All 30 captures have the same page size as the original.
- The small residue in radius and icons is glyph anti-aliasing inside labels like `4px · Tag / badge` and `25× · ABECQ Site`. Crops confirm the same layout, wrapping and colours.
- **Likely cause:** the export renders these labels as several text nodes, while the normalized page uses one.
- This is **not** pixel parity. It is visually equivalent at the tested widths, in Chrome only.

### Interactions, run as the same script on both documents

All of these behave the same as the export:

- Initial state.
- Clicking a sidebar link: the state switches, the active link changes, the hash updates through `replaceState`, no history entry is added, and the page scrolls to the top.
- Clicking an overview card.
- Collapsing and expanding a group, including the chevron rotating 180°.
- Sidebar link hover and active colours.
- Swatch hover border and shadow.
- Swatch click: the clipboard receives `var(--abq-color-…)`, and the toast text, position and style match. The toast is gone after 1400ms.
- Card hover: shadow, `translateY(-2px)`, and the text colour stays ink.
- Keyboard: Enter on a sidebar link and Space on a group summary.
- Neither document logs console errors.

The only difference is the expected one: links to pending states show the overview.

### Not verified

- A real clipboard write (the test harness stubbed it).
- Browsers other than Chrome.
- Screen-reader output.

## Animation inventory

| Target | Effect | Status |
|---|---|---|
| Sidebar link | `color .15s` on hover | Preserved |
| Group chevron | `transform .2s`, rotated 180° when collapsed | Preserved |
| Overview card | `box-shadow` and `transform .2s ease` (lift 2px) | Preserved |
| Colour swatch | `border-color` and `box-shadow .15s ease` | Preserved |
| Page | `scroll-behavior: smooth`, scroll to top on navigation | Preserved |
| `@keyframes stockPulse` | Global in the export; no in-scope state uses it | Deferred to the batch that uses it |
| `prefers-reduced-motion` | Not in the export | Not added |

## Exceptions and deviations

1. **Batch scope.** 27 states and the 7 dc components are not normalized yet. Their links fall back to the overview.
2. **Deferred CSS.** The `[data-r=g2]` single-column rule under 960px is only used by Buttons and Links, so it moves to batch 2 with them. The 960px breakpoint itself is kept.
3. **Semantic markup:**
   - Swatch internals are `<span>`, because a `<button>` may only contain phrasing content.
   - Navigation uses `<ul>`/`<li>`.
   - Group, card and "Font weights" titles are `<h3>`.
   - Decorative previews and icons are `aria-hidden`.
   - All of these render pixel-identically.
4. **Organisms illustration.** The right-hand push moved from the first link to the logo (`margin-right: auto`); the layout is identical.
5. **Load scroll.** On load the page is scrolled back to the top, because the hash selects a page rather than a scroll target. The export behaves the same way implicitly.
6. **No `hashchange` handling.** Like the export, editing the hash in the address bar on an already-open page does nothing until reload. Adding it would be a small, possible enhancement, but it was left out to stay faithful.
7. **Catalog-only colours.** Six viewer-only colours have no product token. They are declared as `--ds-*`, not invented `--abq-*` tokens.

## Source anomalies kept as-is

- **Spacing overflows at 390px.** The page scrolls sideways to 476px because the row uses fixed 120/56/72px columns plus a 160px bar. The export does the same.
- **No navigation below 960px.** The sidebar is hidden, so the overview cards are the only way to move between states.
- **Unresolved items from extraction.** `support.js` and the `SiteHeader`, `SiteFooter` and `index.html` iframe previews are still unresolved. They only affect later batches.

## Next steps

- **Batch 2 (Atoms: buttons, links, forms, choice).** Create it as a new snapshot, `design-system-91951f68-b2`, that carries batch 1 forward. Do not modify this one.
- **Or start the import now.** `.prompts/import-design-system.md` **Phase 1 (Foundations)** can use `raw/normalized/design-system-91951f68-b1/design-system/index.html` as its read-only input, because tokens, fonts and the foundation catalog are complete here. Components should wait for the batches that normalize them.
