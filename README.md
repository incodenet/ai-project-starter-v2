# AI Project Starter — PHP Frontend Template

Production-ready starter for integrating Claude Design exports into an existing PHP frontend architecture. It accepts **custom standalone HTML/CSS/JS exports** and **default bundled Claude Design HTML exports**. Both paths converge on the same approved design-system and page-migration workflow. The goal is to preserve design and behavior while creating maintainable, reusable code.

## How the workflow fits together

There are **two supported entry paths**, but only **one production integration pipeline**. Do not process the bundle wrapper as if it were already a standalone HTML page.

```text
                     CLAUDE DESIGN
                          │
               ┌──────────┴──────────┐
               ▼                     ▼
       CUSTOM HTML EXPORT       DEFAULT HTML EXPORT
       (per Style Guide)        (.dc.html, index.html,
                                site.html, DS bundle)
               │                     │
               │          unpack-design-export.md
               │                     │
               │          raw/extracted/<snapshot>/
               │                     │
               │        normalize-design-export.md
               │                     │
               │          raw/normalized/<snapshot>/
               │                     │
               └──────────┬──────────┘
                          ▼
                 STANDALONE HTML SOURCE
                          │
               ┌──────────┴──────────┐
               ▼                     ▼
          DESIGN SYSTEM             PAGES
        import (INITIAL)       refactor (INITIAL)
          sync (SYNC)           sync (UPDATE)
               │                     │
               ▼                     ▼
       Shared SCSS/JS +          PHP templates +
       HTML component catalog    page-specific code
               └──────────┬──────────┘
                          ▼
                 PRODUCTION PROJECT
```

**Recommended order:** when a Design System export is available, prepare and import/sync it **before pages**. Page migration must reuse canonical design-system components, tokens, and behavioral hooks.

The **`.design/HTML_EXPORT_ STYLE_GUIDE.md`** is the quality contract for normalized standalone output. The original custom-export workflow continues to work without Unpack/Normalize. Extraction and normalization never perform PHP integration.

## Stack

- PHP 8+, HTML5
- SCSS / Sass
- Vanilla JavaScript (ES6+)
- esbuild
- BrowserSync
- Prettier

No frontend framework is required.

## Project goals

- Preserve approved visuals, responsive behavior, animations, and interactions.
- Build reusable components without unnecessary abstraction.
- Separate shared design, page-specific styles, behavior, and PHP templates.
- Make both initial migration and future design updates safe for AI agents.
- Keep compiled assets and generated-export sources separate from editable application source.

## Directory structure

```text
ai-project-starter/
├── raw/
│   ├── design-system/        # Legacy/custom standalone DS exports; read-only
│   ├── pages/                # Legacy/custom standalone page exports; read-only
│   ├── exports/              # Optional unmodified bundled exports; read-only
│   │   ├── design-system.html
│   │   ├── index.html
│   │   └── site.html
│   ├── extracted/            # Generated, snapshot-scoped bundle extraction
│   │   └── <snapshot>/       # Assets, source documents, page manifest
│   └── normalized/           # Generated, snapshot-scoped standalone HTML
│       └── <snapshot>/       # Normalized DS and logical page sources
│
├── design-system/            # Local HTML Component Library / developer docs
│   ├── index.html
│   ├── components/
│   │   ├── buttons.html
│   │   └── ...
│   └── foundations/
│       ├── typography.html
│       └── colors.html
│
├── src/
│   ├── js/                  # Shared behavior and page-specific modules
│   └── scss/
│       ├── core/
│       ├── layouts/
│       ├── components/
│       ├── pages/
│       ├── utils/
│       ├── bottom.scss
│       ├── main.scss
│       └── top.scss
├── assets/
│   ├── css/                 # Compiled output
│   └── js/                  # Compiled output
├── templates/               # Refactored PHP templates
├── .ai/
│   └── DESIGN_SYSTEM_INVENTORY.md
├── .prompts/
│   ├── unpack-design-export.md        # NEW: default bundle extraction
│   ├── normalize-design-export.md     # NEW: standalone HTML normalization
│   ├── import-design-system.md
│   ├── sync-design-system.md
│   ├── refactor-raw-html.md
│   └── sync-design-update.md
├── .design/
│   ├── HTML_EXPORT_ STYLE_GUIDE.md
│   └── ...
└── .github/
```

This is a **target convention**, not permission to rearrange a live project. Agents should inspect existing paths before creating directories. The optional `raw/exports/` folder is a convenience for original bundle files; a bundle at another explicit user-selected path is equally valid.

## What each directory is for

### `raw/design-system/` and `raw/pages/` — custom standalone exports

Unmodified standalone HTML generated using the original custom Claude Design prompts. These remain valid direct inputs to import, refactor and sync. Treat them as **read-only design references**; never edit them as a side effect of production integration.

### `raw/exports/` — original default exports (optional)

Keep original `design-system.html`, `index.html`, `site.html` or `.dc.html` here **without modifying them**. A default `site.html` may contain many screens, states or logical templates; do not infer page count from the number of `section` elements.

### `raw/extracted/<snapshot>/` — unbundle output

Generated by `.prompts/unpack-design-export.md`: unpacked HTML, associated media/fonts and a **page/screen/route/state manifest**. The snapshot is immutable once produced; preserve provenance and stable source IDs. This is a technical intermediate, **not** production markup, nor a direct refactor input.

### `raw/normalized/<snapshot>/` — clean standalone HTML

Generated by `.prompts/normalize-design-export.md` using `.design/HTML_EXPORT_ STYLE_GUIDE.md`. Contains independent, semantic, framework-free HTML documents with CSS and JS within each document as required by the guide. This is the **default-export path's input** for the existing design-system and page prompts. Normalize a selected logical page/template or small batch after inspecting the extraction manifest; do not assume every screen state must become a distinct production template.

**Source selection rule:** downstream prompts accept **either** legacy `raw/design-system/` or `raw/pages/` standalone files **or** normalized files from `raw/normalized/<snapshot>/`. Never feed the bundled wrapper or raw extracted internals directly to `refactor-raw-html.md`.

### `design-system/` — canonical HTML examples

A navigable, **developer-only HTML Component Library**. For example, `design-system/components/buttons.html` shows the approved HTML markup for Button variants/states, while `design-system/foundations/typography.html` demonstrates text styles.

- Examples use canonical CSS classes, semantic elements, accessibility attributes, and `data-*` hooks.
- Catalog pages load the **same built CSS and JS** as the real project. Do not copy component styles/behavior into example files.
- Documentation-only wrappers and navigation must not leak into page markup or production CSS.
- These HTML examples are a **markup reference**, not reusable PHP partials or a separate implementation of components.
- Keep the catalog accessible only as development documentation; do not add it to production routing/deploy output unless explicitly requested.

**Three connected sources of truth:** `src/scss/` and `src/js/` implement styling and behavior; `design-system/components/*.html` demonstrates canonical HTML structure; `.ai/DESIGN_SYSTEM_INVENTORY.md` connects variants, dependencies, implementation paths and usage examples.

### `src/scss/` — editable styling source

- `core/`: global reset, typography and foundations.
- `layouts/`: grid, containers and other structural layout rules.
- `components/`: reusable buttons, cards, forms, accordions and other shared styles.
- `pages/`: unique, page-specific styles; do not duplicate component implementations here.
- `utils/`: shared variables, mixins and functions.

### `src/js/` — editable JavaScript source

Shared component interactions and page behavior. Prefer modular code with stable `data-*` selectors and appropriate lifecycle/initialization, without duplicating event listeners or relying on inline scripts.

### `templates/` — page output

PHP templates created or updated by page migration. Respect the existing PHP rendering conventions. **Do not** introduce PHP includes, partials or component APIs merely to migrate the Design System; follow `.ai/DESIGN_IMPORT_RULES.md`.

### `assets/` — compiled files

Built CSS and JS. **Never edit compiled files manually.** Use npm build/watch scripts.

### `.ai/` versus `.prompts/`

- `.ai/` contains persistent codebase policies: architecture, frontend, backend, design-import, visual integrity and other coding standards; it also contains `DESIGN_SYSTEM_INVENTORY.md` after DS import.
- `.prompts/` contains **tasks to run** with an AI coding agent. Read applicable `.ai/` instructions before every task.

## Which AI prompt should I run?

| Task | Input | Prompt | Expected outcome |
| --- | --- | --- | --- |
| Unpack a default export | `design-system.html`, `index.html`, `site.html` or `.dc.html` bundle | `.prompts/unpack-design-export.md` | Extracted source, assets, provenance and screen/page manifest |
| Normalize a default export | Selected `raw/extracted/<snapshot>/` source(s) | `.prompts/normalize-design-export.md` | Standalone HTML complying with `HTML_EXPORT_ STYLE_GUIDE.md`, validation report |
| First Design System import | Standalone DS export or normalized DS | `.prompts/import-design-system.md` | Canonical SCSS/JS, HTML component catalog and inventory |
| Updated Design System | New standalone DS or normalized DS snapshot | `.prompts/sync-design-system.md` | Targeted non-breaking updates to shared code, catalog and inventory |
| First page migration | Standalone page or normalized page | `.prompts/refactor-raw-html.md` | PHP page template, reuse of DS, page-specific code |
| Updated page design | New standalone page or normalized page snapshot | `.prompts/sync-design-update.md` | Targeted template update preserving existing DS contracts |

**Important:** Unpack and Normalize prepare design references only. They must not create or modify `templates/`, production `src/` components, or application state. The Design System SYNC task does not automatically rewrite every page.

### Scenario A — original custom HTML export

1. Export pure HTML/CSS/JS using `.design/HTML_EXPORT_ STYLE_GUIDE.md` and the applicable animation guides.
2. Put original DS HTML in `raw/design-system/`, pages in `raw/pages/`.
3. If a DS exists, run `import-design-system.md` (INITIAL) or `sync-design-system.md` (SYNC) first.
4. Run `refactor-raw-html.md` for new pages or `sync-design-update.md` for changed pages.
5. Validate rendered visuals, responsiveness, keyboard behavior and animations.

**No Unpack/Normalize step is needed** when the source already meets the standalone export standard.

### Scenario B — default Claude Design bundle export

1. Place the original default export(s) in `raw/exports/` or supply their explicit file paths; keep them unmodified.
2. Run `unpack-design-export.md` for the selected export(s); inspect `raw/extracted/<snapshot>/` and its page/screen/state manifest.
3. If a DS export exists, **process it first**: normalize its source, then run `import-design-system.md` (INITIAL) or `sync-design-system.md` (SYNC). Check the component catalog and `.ai/DESIGN_SYSTEM_INVENTORY.md`.
4. Normalize the homepage and selected logical page templates from the extracted site, usually **one page or a small batch at a time**.
5. Feed the normalized standalone file to `refactor-raw-html.md` (INITIAL) or `sync-design-update.md` (UPDATE).
6. Validate visual fidelity, breakpoints, assets, all relevant states and interactions against the original rendered design. Record unresolved differences explicitly.

For example, `site.html` can contain multiple screen states under one application shell. A screen, state, section, route and reusable template **are not necessarily the same thing**. Do not fabricate exactly 22 production templates solely because the design project describes 22 screens. Preserve variant coverage in the extraction manifest.

### Initial import (INITIAL) versus later revisions (SYNC)

| Lifecycle | Design System | Page templates |
| --- | --- | --- |
| INITIAL | Import canonical tokens/components, create developer HTML examples and inventory | Refactor selected normalized or original standalone page |
| SYNC | Compare new DS against prior snapshot and update affected canonical contracts | Compare new page design against existing template, update only approved differences |

For a default-export re-export, **unpack and normalize the new snapshot before SYNC**. Keep the previous source/snapshot and stable logical IDs for comparison. A partial export does not imply deleted components or routes. Do not silently overwrite prior snapshots or remove existing component variants.

### Validation and failure handling

- Verify that all declared assets and required source documents were extracted without silent omissions.
- Require a standalone normalized document before running migration prompts; it must not rely on the bundler runtime, `DCLogic`, proprietary directives, or unavailable `support.js` behavior.
- Preserve animations and interactions; if exact parity cannot be established, report missing information or exceptions, rather than fabricating behavior.
- Prefer responsive and visual comparison at representative desktop, tablet and mobile viewports, including open/selected/hover/focus states.
- Track `READY`, `READY_WITH_EXCEPTIONS` or `BLOCKED` status for page/DS normalization; treat the latter as not ready for production migration.
- If parsing rules depend on a changing undocumented export format, fail clearly and report what needs review.
- Never change compiled `assets/` directly, nor mutate approved design originals.

**Compatibility:** any old instructions that mention `raw/pages/` or `raw/design-system/` as their only source refer to the standalone source role. When using default exports, select the relevant **normalized snapshot** instead; do not copy normalized files into legacy folders merely to satisfy old wording.

## Development & build

Install dependencies:

```bash
npm install
```

Development (SCSS and JavaScript watchers + BrowserSync):

```bash
npm run dev
```

Production compilation:

```bash
npm run build
```

Available individual commands:

```bash
npm run build:css
npm run watch:css
npm run build:js
npm run watch:js
npm run serve
```

The current documented BrowserSync page preview URL is:

```text
http://localhost:3000/hybrid/?p=page-name
```

Existing watched output paths include `assets/**/*` and `templates/**/*`. For a local Design System catalog, verify that its URL and reload behavior are supported by the actual server configuration; add development-only serving/watch configuration if needed, rather than assuming `design-system/index.html` is automatically exposed.

## Coding standards

Always use semantic HTML, modular SCSS/JavaScript, accessibility best practices, and existing project conventions. Preserve approved typography, colors, spacing, breakpoints, transitions, animations, keyboard behavior and interactions. Reuse before creating; avoid duplicate CSS/JS and unnecessary wrappers.

Do not introduce new PHP includes merely because an element appears in the HTML catalog. The project's existing design import rules take precedence. Avoid inline implementation styles and event handlers in production.

## Architecture priorities

1. Visual consistency and behavior preservation
2. Reuse existing code and canonical DS markup
3. Clean architecture and separation of concerns
4. Maintainability
5. Performance
6. Accessibility

## Formatting

Before committing, format relevant files with Prettier as appropriate for the repository:

```bash
npx prettier --write <changed-files>
```

## License

Private project.
