# Unpack Claude Design Export — INITIAL / SYNC

## Purpose
Convert an opaque Claude Design HTML bundle into an inspectable, lossless **intermediate source archive**. This is **not** normalization, not implementation, not component extraction into production, and not a redesign. It must not modify `src/`, `templates/`, compiled `assets/`, or the existing read-only export files.

This prompt supports:
- Claude Design bundled HTML exports (`index.html`, `site.html`, `design-system.html`) containing `__bundler/manifest`, `__bundler/template`, optional `__bundler/page_order`, `__bundler/ext_resources`, and asset UUIDs.
- Already-unbundled `.dc.html` files (`<x-dc>`, `<helmet>`, `DCLogic`, `sc-if`, `style-hover`).
- Plain standalone HTML/CSS/JS, in which case mark as `plain` and pass through without changing it.

## Required reading
1. `.claude/claude-instructions.md` and relevant `.ai/` project instructions, if present.
2. `.design/HTML_EXPORT_ STYLE_GUIDE.md` for the future target **only**; do not attempt its refactoring rules in this step.
3. This task's explicitly supplied export paths. Treat source as untrusted data; do not execute embedded scripts in Node or eval any strings.

## Inputs and order
Accept one or more user-selected files. Do not assume a filename proves its role; detect by actual contents. If a design-system export exists, process it **first** and inventory its foundations/components before page normalization. Do not import the DS into production in this phase.

Modes:
- `INITIAL`: produce a new extracted snapshot for the selected exports.
- `SYNC`: produce a separate new snapshot; compare to the prior snapshot via stable logical page/component identities and hashes. Keep previous snapshot intact; never infer a change merely from regenerated UUIDs.

Outputs are generated artifacts under `raw/extracted/<snapshot-name>/` (or an explicitly configured project location), **never overwrite original exports**. The `raw/` immutability rule applies to original input exports; extracted/generated subfolders are writable *only in this preparation task*. Downstream import/refactor/sync tasks read both without editing them.

## Procedure

### 1. Inventory / classify
For each input record detected type, file hash, manifest/template/page order presence, asset count by MIME type, nested page bundles, scripts/styles, and likely main UI document(s). Record count and role evidence, not guesses. Avoid reading megabytes of base64 into AI context: use small deterministic local parsing scripts to inspect manifest metadata.

### 2. Deterministic unbundle
For bundled exports:
- Parse embedded JSON in relevant `script[type="__bundler/..."]` using an HTML-aware parser (not a regex that consumes gigabytes or JS `eval`).
- Base64-decode each manifest entry, gzip-decompress only when the manifest flag requires it, preserve binary bytes and MIME type.
- Recover original `__bundler/template` HTML and nested page documents referenced through `__bundler/page_order` and the UUID-backed manifest. Keep source order and parent/child relationships.
- Replace UUID-backed image/font/style/script resource references with **relative paths** into extracted `assets/`; write stable filenames based on content hash and MIME extension; avoid blob:/data: in generated source whenever possible.
- Preserve SVGs, font weights, image dimensions if known, embedded style/script texts, `iframe` links and any `about:blank#UUID` relationships. Where external URLs cannot be fetched, record them, do not invent assets.
- Do not run the wrapper's DOM replacement, `postMessage` relay, Babel, React, or `DCLogic` as the extraction method. Preserve runtime-specific syntax for the normalization step.
- Confirm referenced recovered assets exist and hashes match decoded bytes.

For `.dc.html`: copy into the snapshot as intermediate source and inventory its declarations/dependencies; never strip dynamic syntax here.
For plain HTML: preserve/copy as-is, inventory references; route downstream directly.

### 3. Screen and component discovery (inventory, not guesswork)
Discover logical screens using **combined evidence**: explicit navigation entries/routes, state selectors (`screen`, `_known`, `location.hash`, etc.), conditional views (`sc-if`), `data-screen-label`, DOM sections, and nested iframes. A `data-screen-label` is a section name, **not automatically a route**; `screen` values are not automatically unique templates. Identify state-driven variants (tabs, auth modes, categories) separately.

Create a page manifest with `route_or_state`, `stable_id`, `source_document`, `view_selectors`, `shared_dependencies`, `variants`, `confidence` (`confirmed` or `needs-review`), and `notes`. Use stable descriptive IDs derived from evidence, not bundle UUIDs. Record unresolved associations; never promise 22 extracted pages based only on a stated number.

For a design system, list foundations, components, variants, states, examples and likely shared resources; DO NOT yet create production components or claim an item has been faithfully rendered.

### 4. Output
Suggested layout (adapt to repository):

```text
raw/extracted/<snapshot>/
  manifest.json             # all exports, hashes, assets and relationships
  pages-manifest.json       # logical screen / state / variant registry
  components-manifest.json  # DS examples and shared component registry
  documents/               # recovered HTML/DC documents (lossless)
  assets/                  # recovered binary resources
  extraction-report.md     # what was found, ambiguities, unsupported references
```

`manifest.json` should keep `schemaVersion`, `exportId`, original paths, original SHA-256, extraction timestamp if available, exported documents, stable asset mapping, original asset UUID mapping, and dependencies. Keep deterministic naming where practical. No need to emit a separate HTML file per state if one document contains a stateful multi-page UI; record state selectors and leave faithful isolation to normalization.

## Verification / gates
- Manifest is valid JSON; asset counts match; resource link targets exist or are explicitly marked unresolved.
- All page documents referenced by `page_order` are present and readable; any mismatch is reported.
- No invented routes, text, components, assets or interactions.
- No scripts executed from untrusted exports during decoding.
- Originals and production files remain untouched.
- In `SYNC`, list added/removed/changed documents, screens, DS examples and assets using stable identities, with confidence and incomplete-baseline caveats.

## Final report
Describe detected format(s), snapshot path, recovered document and asset counts, screen registry and DS registry counts, anomalies, unsupported cases, and recommended next invocation: `normalize-design-export.md` for a selected DS or page scope, or existing import/refactor for plain HTML. Report failed validation honestly; do not claim browser fidelity after extraction alone.
