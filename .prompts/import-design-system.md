# Import Design System — INITIAL

## Input compatibility (Pure HTML and Claude Design bundles)

This task continues to accept the original approved standalone HTML/CSS/Vanilla JS export with no upstream processing. For a default Claude Design bundle (`design-system.html` with `__bundler/*` or `.dc.html`), **first** run `.prompts/unpack-design-export.md`, then `.prompts/normalize-design-export.md` in DS mode. Use its `raw/normalized/<snapshot>/design-system/index.html` plus real extracted assets as the reference input here. Do **not** import directly from an opaque bundle or interpret the wrapper as the design system. Treat extracted/normalized files as read-only reference artifacts during this task. The INITIAL implementation rules and production ownership below are unchanged.

## Goal

Perform the **initial integration** of an approved Design System exported as one or more standalone **HTML/CSS/Vanilla JavaScript** files under `raw/`.

The export follows `.design/HTML_EXPORT_ STYLE_GUIDE.md`. The export is a **visual and behavioral specification**, not a ready-made production architecture.

**This is not a page migration.** Establish reusable foundations and UI components *before* invoking `.prompts/refactor-raw-html.md` for individual pages.

## Required reading and precedence

Before editing, read:

1. `.claude/claude-instructions.md`
2. `.ai/CODEBASE.md`
3. `.ai/ARCHITECTURE.md`
4. `.ai/FRONTEND.md`
5. `.ai/DESIGN_IMPORT_RULES.md`
6. `.design/HTML_EXPORT_ STYLE_GUIDE.md`
7. `.ai/MIGRATION_PLAN.md` (general workflow guidance)
8. `.ai/BACKEND.md` only if PHP rendering is involved.

Inspect the **real** build configuration, entry points, current project structure, existing SCSS/JS, assets, and any previously implemented components. Explicit project conventions take precedence over illustrative paths in this prompt. Do not assume missing folders or tooling already exist.

Follow `.ai/DESIGN_IMPORT_RULES.md` strictly: **do not create production PHP partials, includes, template composition, PHP component APIs, or business logic** as part of this task. The documentation-only HTML catalog below is not a PHP component system. Component extraction in this phase means reusable SCSS, JavaScript, and documented HTML patterns, not PHP decomposition.

## Inputs

- Source: an explicit file or directory of Design System exports inside `raw/` supplied by the user/task. If no path is given, discover candidates and clearly identify the selected source; never silently import unrelated page exports.
- The exports may contain multiple variants and component examples spread across several standalone files.
- Preserve all source files and associated reference assets unchanged; **read-only `raw/`**.
- Do not assume `.dc.html`, React, a design editor, or any source framework exists.

## Core constraints

1. **Design fidelity:** preserve approved typography, spacing, colors, gradients, borders, shadows, responsive breakpoints, states, animations and interaction behavior. Do not redesign, approximate, or silently remove variants.
2. **Architecture:** the project uses PHP 8+ rendering, SCSS, Vanilla JS, Sass/esbuild, with **`src/` as source** and **`assets/` as compiled output**. Never hand-edit `assets/css` or `assets/js`.
3. **Maintainability:** use existing conventions; prefer extending existing modules rather than creating duplicates. Do not globally replace pre-existing tokens/classes without verifying consumers.
4. **Scope:** implement shared foundations and genuinely reusable UI only. Do not migrate ordinary page sections or full pages as a side effect.
5. **No premature PHP abstraction:** record possible future PHP include candidates, but do not implement them.
6. **Be conservative:** preserve structural hooks needed for CSS, stacking, clipping, accessibility and animations. Never optimize away approved visuals.

## Suggested ownership and file layout (adapt to actual codebase)

Do **not** create a parallel build system. Integrate with the existing entries and directories:

```text
src/
  scss/
    utils/             # canonical shared variables / mixins if existing
    core/              # shared reset, font faces, base typography
    components/        # reusable component SCSS
    layouts/           # truly global layout (only when applicable)
    design-system/     # OPTIONAL organizational layer, only if helpful
    main.scss          # existing compiled entry
  js/
    shared/            # reusable behaviors (where appropriate)
    main.js            # existing JS entry
assets/                # generated build artifacts; DO NOT edit directly
templates/             # NOT a target for PHP component decomposition
raw/                   # immutable reference exports
.ai/                   # project architectural references
```

If adding `src/scss/design-system/`, make its responsibility explicit: e.g. canonical tokens, typography, component variants and documented DS-specific style rules. **Do not duplicate components simultaneously in `design-system/` and `components/`.** Existing `.ai/ARCHITECTURE.md` says shared components belong in `src/scss/components/`, variables in `src/scss/utils/_variables`, and base styles in `src/scss/core`; honor that by default. Import files into the existing `main.scss`/other approved entries using the project's established module style. Avoid duplicate global resets and competing CSS-variable definitions.

Use `data-*` hooks for JS per `.ai/FRONTEND.md`, and keep component init safe when the component is absent. Do not hard-code initialization into sample-page markup.

## Phase 0 — Inspect and inventory (before implementation)

Identify and document:

- Exact source files and which examples/components each contains.
- Foundations: CSS custom properties, typography/font files and weights, color roles, spacing, radii, shadows, gradients, z-index, breakpoints, motion/easing.
- Components: name, canonical CSS selectors, markup contract, variants, sizes, states, responsive rules, nested dependencies, assets and interactive behavior.
- Effects: triggers, timing, intersection/scroll behavior, reduced-motion treatment, cleanup requirements.
- External dependencies (if any), unresolved asset paths and export-only/demo code.
- Existing project equivalents, collisions and required adjustments to build entries.

Create/update `.ai/DESIGN_SYSTEM_INVENTORY.md` with a concise table: `Component | Source | Variants/states | Reuse/extend/create | Source file(s) | Dependencies | Status` and a token/asset overview. Do not mark an item COMPLETE until verified.

**Required gate:** complete an explicit migration map for every selected design-system concern: `reuse`, `extend`, `create`, `keep demo-only`, or `unresolved`. If a design choice or dependency is ambiguous, use the safest faithful representation and report it; do not invent tokens or behavior.

## Phase 1 — Foundations

- Extract source CSS from the export's `<style>` into valid SCSS source files, aligned to existing folders.
- Integrate actual token values and semantic roles with existing variables and CSS custom properties; document naming/aliases where necessary.
- Integrate font-face declarations, typography scales, reset/base defaults **only when they do not conflict with the existing site shell**.
- Preserve deliberate responsive breakpoint values exactly; do not normalize them to generic breakpoints.
- Resolve image/font/icon URLs using existing public asset conventions and report unavailable files; never fabricate missing files.
- Avoid global selectors that accidentally style unrelated legacy components; scope DS rules where needed without changing output.

## Phase 2 — Components

For each approved component:

1. Decide whether an existing component already implements its visual/behavioral contract.
2. Reuse or extend it safely; otherwise create the minimal new SCSS module in the established shared component location.
3. Capture canonical HTML usage, class names, allowed modifiers and `data-*` hooks in the inventory/docs.
4. Preserve all supported variants, states (hover, focus-visible, active, disabled, open, error, etc.), desktop/mobile layouts and inter-component dependencies.
5. Put canonical example markup in the mandatory `design-system/` documentation catalog, never in production page templates. Do not create PHP components, includes, or PHP APIs.
6. Avoid duplicated declarations; if two exports define the same component differently, compare the intended variants and record conflicts rather than arbitrarily overriding one.

Do not introduce a generic component framework, Storybook, JavaScript runtime, CSS utility framework or extra tooling unless the current project already depends on it and the task truly requires it.

## Phase 3 — JavaScript and motion

- Extract `<script>` behavior into `src/js` using small reusable ES modules or the project's module conventions, wired through the existing JS entry.
- Maintain original behavior and initialization order; initialize only when matching elements exist. Avoid repeated listeners and duplicate init on multiple instances.
- Use stable `data-*` hooks, accessible keyboard controls, synchronized ARIA state, and cleanup where appropriate.
- Prefer CSS for simple transitions. Preserve required advanced effects and existing approved libraries where present; do not casually replace animations with cheaper-looking effects.
- Respect `prefers-reduced-motion` for nonessential motion and ensure content remains usable.
- Avoid always-on animation loops, unnecessary layout thrashing and background work when offscreen, unless indispensable to faithful behavior; justify exceptions.

## Phase 4 — Integration and reference

- Integrate shared styles and scripts into the **existing** build/entry point strategy. Preserve CSS ordering so base → tokens → components → page overrides remains deterministic according to existing project conventions.
- Ensure existing pages do not regress; avoid leaking global element selectors into unrelated pages.
- Create/update the **mandatory HTML Component Library** as defined in Phase 4A. The inventory links each component to its concrete HTML example.
- Ensure every example loads the actual compiled project stylesheet and JavaScript. Do not copy component CSS or behavior into the catalog.
- Do not change ordinary page templates except where unavoidable to wire genuinely global assets; explain each such change.

## Phase 4A — Mandatory HTML Component Library (canonical markup reference)

Create a small **development/documentation-only** catalog rooted at `design-system/`, without introducing Storybook, a new build system, PHP includes, template composition, or reusable PHP component functions.

Recommended layout (adapt existing catalog locations if present):

```text
design-system/
  index.html                     # navigation to component and foundation examples
  components/
    buttons.html                 # canonical markup: all approved variants and states
    forms.html
    accordions.html
    cards.html
    ...
  foundations/
    typography.html
    colors.html
```

Use **plain `.html` demonstration documents** (not new production `templates/*.php`). This intentionally respects the project's rule against PHP decomposition. If the project already has a documentation-only `index.php` or `buttons.php`, those files may remain, but they must contain static HTML and must not use PHP includes, logic or component APIs. The catalog is not part of production page routing.

For EVERY imported component:
1. Save actual copyable HTML markup for each supported variant/size/state, using the same canonical classes and `data-*` hooks production pages will use.
2. Use proper semantic elements and accessible attributes; show required DOM structure, not just visual screenshots or descriptions.
3. Provide an interactive working example where behavior exists (e.g. accordion open/close, tabs keyboard interaction), and static HTML examples for meaningful non-interactive states.
4. Load **the actual project-built CSS and JS outputs** using correct relative/root URLs. Do not embed duplicate implementation styles, JS initialization code or copied component implementations into demo pages. Catalog-only framing/layout CSS must be strictly namespaced (e.g. `.ds-docs-*`) so it does not influence component rendering.
5. Preserve canonical class names and variant modifiers. Record any deliberate difference between raw-export markup and final canonical markup.
6. Document usage, permitted variants, accessibility requirements, dependencies and link to the real SCSS/JS implementation in `.ai/DESIGN_SYSTEM_INVENTORY.md`.
7. Mark source assets or missing behavior as unresolved when necessary; no fake assets or invented interactions.
8. Make the catalog navigable from `design-system/index.html`, and verify links, loaded assets and working interactive components.

**Single-source-of-truth contract:** `src/scss` and `src/js` own styles and behavior; `design-system/components/*.html` owns canonical example markup; `.ai/DESIGN_SYSTEM_INVENTORY.md` is the map connecting them. The catalog is documentation, not a runtime dependency. A page-migration agent should consult these HTML patterns before inventing markup.

## Phase 5 — Validation

Use the actual documented build commands (`npm run build:css`, `npm run build:js`, `npm run build`, as applicable). Validate:

- successful compilation; no missing imports or unresolved assets;
- no browser console exceptions, missing assets or repeated initialization;
- catalog pages load compiled production CSS/JS without inline duplicates, navigation links work, and every inventory entry has a working canonical HTML example;
- component variants, interactive states, keyboard and accessible names;
- exact breakpoint behavior and visual parity against the source exports at relevant widths;
- animations and reduced-motion behavior;
- no unexpected changes in representative existing pages;
- no duplicate token authorities or component styles.

If browser-based visual comparison is unavailable, state this explicitly; do **not** claim pixel-perfect verification. Never mark untested components as verified.

## Final report

Report: selected source files, foundation/component inventory, decisions (`reuse/extend/create`), actual files created/modified, build integration, resolved/unresolved assets, validation performed/results, deviations from the approved design, remaining tasks and future PHP partial candidates (reported only). Update each inventory status accurately.

## Definition of done

The selected exported Design System is available as a coherent, reusable SCSS/Vanilla JS/UI layer **with a navigable, working HTML Component Library and an inventory linking each example to production sources** for subsequent **page migration**, preserves its approved visual and interactive behavior, and does not require importing standalone source files into production or recreating components on every page.

**Never migrate an entire page in this task. Never modify `raw/`. Never generate PHP component partials.**
