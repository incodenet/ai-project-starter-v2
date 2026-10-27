# Normalize Claude Design Export — INITIAL / SYNC

## Goal
Transform selected **extracted** Claude Design documents, states or Design System examples into **standalone, framework-free, semantic HTML/CSS/Vanilla JavaScript** meeting `.design/HTML_EXPORT_ STYLE_GUIDE.md`. The result must be usable by our existing `.prompts/import-design-system.md`, `.prompts/refactor-raw-html.md`, `.prompts/sync-design-system.md` and `.prompts/sync-design-update.md` without requiring those tasks to understand bundler/DC internals.

This is a pre-production source preparation task. **Do not edit** `src/`, `templates/`, compiled `assets/`, or the original export. Do not perform the project's refactor, PHP conversion or component implementation here.

## Inputs / ordering
- Read `.design/HTML_EXPORT_ STYLE_GUIDE.md` fully; it defines target quality. Preserve real source text/design, not examples from the guide.
- Read `raw/extracted/<snapshot>/manifest.json`, `pages-manifest.json`, `components-manifest.json` and the required recovered documents/assets. If a plain standalone export is already compliant, do not rewrite it unnecessarily; pass it along.
- Optional canonical production `.ai/DESIGN_SYSTEM_INVENTORY.md` and `design-system/components/*.html` are **reference** for naming/alignment only; do not copy their runtime implementation.
- If both design system and pages are supplied, normalize design system **first**, then pages. Pages should align tokens, classes and variations to the normalized DS where faithful.
- Process a selected logical page/template (plus declared variants) per invocation, or a small explicit batch; do not silently process an entire multi-screen site as one enormous page.

Modes:
- `INITIAL`: create the first normalized output.
- `SYNC`: re-normalize updated scoped documents/variants and output a comparable new snapshot; preserve stable logical `data-design-id` values where still applicable. Keep previous normalized snapshot as baseline and report deltas, not just raw textual diffs.

## Resolve scope before editing
Build a source-to-output map, recording stable page ID, actual selectors/state necessary for each view, shared layout, variants, conditional content, assets, typography, tokens, animations, runtime dependencies and interactive behavior. A section label does not necessarily equal a route. A route might contain several sections, tabs or state variants. Clearly distinguish confirmed extraction from inference.

## Conversion contract
1. **HTML:** output one meaningful standalone `<!DOCTYPE html>`, `<html lang>`, `<head><style>...</style></head>`, `<body>...<script>...</script></body></html>` per selected **logical template**; variants may be documented separately or rendered via explicit fixtures/controls. Use semantic landmarks, headings, labels/IDs, keyboard access and ARIA states. Preserve authentic copy and visual hierarchy.
2. **DC/runtime:** replace `<x-dc>`, `<helmet>`, `sc-if`, `{{ ... }}`, `style-hover`, `DCLogic` / custom event declarations, bundler iframe or opaque resource relay with standard HTML, CSS and Vanilla JS equivalents. Do not leave a dependency on `support.js` or opaque Claude runtime without flagging an unresolved blocker. Preserve all meaningful UI states and interactions. Do not execute source code directly without inspection.
3. **CSS:** move repeated inline styles and hover directives to readable named classes, maintain exact breakpoints, cascade, responsive variants, pseudo states, sizing, z-index, gradients, shadows and motion. Keep CSS within `<head>` per style guide. Extract/align tokens without fabricating a design system. Avoid unsolicited redesign or global refactoring.
4. **JS:** convert stateful behavior to small isolated Vanilla JS modules/IIFEs in an inline `<script>` before `</body>`. Bind via data attributes, handle null elements, clean up listeners/timers where relevant, support keyboard and focus interactions. Preserve tabs, accordions, carousels, sticky elements, conditional views and other original behavior. Avoid frameworks, runtime dependencies or fake backend handlers.
5. **Animations:** inventory every original keyframe, transition, scroll interaction, hover state, trigger, timing and dependency; implement faithful CSS/JS behavior where possible. Respect existing `.design/ANIMATION_PRESERVATION_PIPELINE.md` and `.design/REIMPLEMENT_ANIMATIONS.md.md` where applicable. Do not silently omit effects; document unsupported cases. Preserve `prefers-reduced-motion` where reasonable without erasing intended behavior in normal mode.
6. **Assets:** reference real extracted assets via working relative paths; never generate fake CDN links, base64 embeds, placeholders for available assets or arbitrary substitute images. Exception: intentional UI placeholder already present in source. If a truly single-file portable artifact conflicts with binary assets, keep HTML self-contained in **HTML/CSS/JS**, put binaries in adjacent asset folder and document the asset dependency transparently.
7. **Design System:** a DS is a catalog of reusable examples, not a page to split blindly into routes. Normalize foundations + component examples (including variants and interactive states) into a readable standalone DS reference/catalog. Maintain exact source values; later `import-design-system.md` creates production SCSS/JS/catalog.
8. **Content/application:** do not invent behavior or business logic for navigation, checkout, search, auth and forms. Preserve user-visible states as demo/client-side interaction, mark missing real integrations for the later refactor.

## Output
Use the existing `raw/` reference layout; create a new normalized snapshot, preferably:

```text
raw/normalized/<snapshot>/
  design-system/index.html       # only if a DS was supplied
  pages/home.html
  pages/category.html
  pages/product.html
  ...                           # selected page templates, not fabricated route counts
  assets/                       # copied or linked real extracted assets
  normalized-manifest.json      # provenance, stable IDs, variants, dependencies and status
  normalization-report.md       # browser checks, exceptions, unresolved behavior
```

`raw/normalized` is generated/reference-only and must never be loaded as production CSS/JS. Downstream prompts should use the selected **normalized file(s)** as their `raw` input, and continue treating them as read-only. Never modify original exports, extracted snapshots or old normalized snapshots when preparing a new one.

## Validation gates
- Check valid standalone HTML parsing, missing references, unconverted `{{...}}`, `sc-if`, `x-dc`, `style-hover`, `DCLogic`, opaque blob/UUID references and support.js dependencies. Any remaining construct is a documented blocking exception, not a silent pass.
- Use a browser if available to compare original visible states with normalized output at desktop/tablet/mobile and relevant original breakpoints; check keyboard behavior, animations and meaningful interactions. Never claim pixel parity or 100% animation coverage without actual tests.
- Verify complete state/variant checklist, not only the default route/screen. Record visual differences, unavailable source behavior and external dependencies.
- Do not mark `READY` when critical missing assets or interactions remain. Permit `READY_WITH_EXCEPTIONS` only when all exceptions are explicitly listed and accepted by task scope; otherwise `BLOCKED`.

## Definition of done
The selected DS or page template is a comprehensible standalone HTML/CSS/JS reference conforming to our existing Style Guide, with traceable extracted-source provenance and a candid validation report. Next step is `import-design-system.md` (INITIAL), `sync-design-system.md` (SYNC), `refactor-raw-html.md` (page INITIAL), or `sync-design-update.md` (page SYNC).
