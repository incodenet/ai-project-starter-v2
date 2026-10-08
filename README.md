# AI Project Starter — PHP Frontend Template

Production-ready starter for integrating AI-generated, standalone HTML/CSS/JavaScript into an existing PHP frontend architecture. The goal is to preserve approved design and behavior while creating maintainable, reusable code.

## How the workflow fits together

All design exports follow `HTML_EXPORT_STYLE_GUIDE.md`. They are **pure, self-contained HTML/CSS/JS** — no `.dc.html`, React, JSX, or template framework is imported.

```text
Claude Design
  ├── ANIMATION_PRESERVATION_PIPELINE.md
  ├── REIMPLEMENT_ANIMATIONS.md
  └── HTML_EXPORT_STYLE_GUIDE.md
                │
                ▼
       Standalone HTML exports
                │
       ┌────────┴────────┐
       ▼                 ▼
raw/design-system/    raw/pages/
       │                 │
       ├─ First import    ├─ First migration
       │  import-design-  │  refactor-raw-
       │  system.md       │  html.md
       │                 │
       └─ Later updates   └─ Later updates
          sync-design-      sync-design-
          system.md         update.md
       │                 │
       ▼                 ▼
  Shared UI layer     PHP page templates
  + HTML catalog      + page-specific code
       └────────┬────────┘
                ▼
      Production project
```

**Recommended order:** import the Design System first, validate the component catalog, then migrate individual pages. Page migration should reuse the canonical components before introducing new markup or styles.

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
│   ├── design-system/         # Original DS standalone HTML exports; input only
│   └── pages/                 # Original standalone HTML page exports; input only
│
├── design-system/             # Local HTML Component Library / developer docs
│   ├── index.html             # Component and foundation navigation
│   ├── components/
│   │   ├── buttons.html       # Canonical copyable HTML examples
│   │   ├── accordions.html
│   │   └── ...
│   └── foundations/
│       ├── typography.html
│       └── colors.html
│
├── src/
│   ├── js/
│   │   ├── main.js
│   │   └── ...                # Shared behavior and page-specific modules
│   └── scss/
│       ├── core/              # Global foundations
│       ├── layouts/           # Layout, grid, structural rules
│       ├── components/        # Shared UI components (including imported DS)
│       ├── pages/             # Page-specific styling
│       ├── utils/             # Variables, mixins, functions
│       ├── bottom.scss
│       ├── main.scss
│       └── top.scss
│
├── assets/
│   ├── css/                  # Compiled output
│   └── js/                   # Compiled output
├── templates/                # Refactored PHP page templates
├── .ai/                      # Architecture, standards and DS inventory
│   └── DESIGN_SYSTEM_INVENTORY.md  # Created/updated by DS prompts
├── .prompts/                 # AI agent task instructions
│   ├── import-design-system.md
│   ├── sync-design-system.md
│   ├── refactor-raw-html.md
│   └── sync-design-update.md
└── .github/
```

This layout is a **target convention**, not permission for an agent to reorganize unrelated existing files. The import prompts must inspect the current project before adding folders or files. The Design System implementation normally belongs in existing `src/scss/core`, `src/scss/components`, `src/js` locations, not an automatically imposed parallel layer.

## What each directory is for

### `raw/design-system/` — exported Design System source

Place all original standalone Design System HTML exports here. Each file may include CSS in `<style>` and JS in `<script>` as defined by the export guide. These files are **read-only references** during import and sync; they are not production files, not the canonical component library, and should not be edited by agents.

### `raw/pages/` — exported page source

Place exported pages such as `home.html` or `about.html` here. They are visual and functional specifications for page migration. They are not shipped to production and must not be treated as page templates.

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
| First Design System import | `raw/design-system/` | `.prompts/import-design-system.md` | Shared SCSS/JS, HTML Component Library, inventory |
| Updated Design System export | `raw/design-system/` | `.prompts/sync-design-system.md` | Targeted non-breaking updates to shared code, catalog and inventory |
| First page migration | `raw/pages/<page>.html` | `.prompts/refactor-raw-html.md` | PHP template and page-specific code using existing DS |
| Updated page export | `raw/pages/<page>.html` | `.prompts/sync-design-update.md` | Targeted update to an existing page while preserving DS contracts |

**Important:** The Design System SYNC task does not automatically migrate or rewrite every page. If a change affects existing consumers, the agent must report and validate the impact rather than silently breaking existing templates.

### First-time setup: INITIAL

1. Export the Design System using `HTML_EXPORT_STYLE_GUIDE.md` and place its standalone files in `raw/design-system/`.
2. Run `.prompts/import-design-system.md` with the selected source files.
3. Review its inventory of tokens, components, variants, states, dependencies and source/target paths.
4. Validate actual built styles and behavior using `design-system/index.html` and linked component examples, including responsive, hover, focus, keyboard and animations.
5. Only after the shared UI layer is approved, start importing pages from `raw/pages/`.

### Later Design System revisions: SYNC

1. Replace or add the **new exported source files** in `raw/design-system/` (without modifying canonical implementation files yourself).
2. Run `.prompts/sync-design-system.md` and identify the changed source components.
3. Review the change/diff report: added/changed/deprecated variants, tokens, JS behavior and potential effects on existing templates.
4. Update the canonical HTML examples and `.ai/DESIGN_SYSTEM_INVENTORY.md` alongside the approved implementation changes.
5. Build, verify examples, and regression-check affected pages. **Do not remove a variant just because it is missing from a partial export.**

### Page migration: INITIAL and UPDATE

1. Put page HTML in `raw/pages/`.
2. For a new page use `refactor-raw-html.md`; for an existing page's new design use `sync-design-update.md`.
3. The agent reads `.ai/DESIGN_SYSTEM_INVENTORY.md` and relevant examples in `design-system/components/` before creating any new component markup, styles or behaviors.
4. Reuse canonical classes, modifiers and interaction hooks; create unique page code only where genuinely necessary.
5. Compare the result with the original standalone page: visual, responsive, accessibility, animations and interactions.

**Path compatibility note:** if an existing prompt still refers generally to `raw/`, interpret the page source as `raw/pages/` and the Design System source as `raw/design-system/`. Update the prompt's source-path references when migrating to this convention; don't require agents to guess which files are intended.

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
npx prettier --write .
```

## License

Private project.
