# Synchronize Design System — SYNC

## Goal

Update an **already imported** production Design System from a newer approved standalone HTML/CSS/Vanilla JS export in `raw/`.

**This is not an initial import and not a page update.** Apply the smallest correct **Design System delta** to existing shared UI. Do not rebuild the Design System, overwrite architecture, or run `.prompts/sync-design-update.md` (that command targets an individual production page).

## Read first

1. `.claude/claude-instructions.md`
2. `.ai/CODEBASE.md`
3. `.ai/ARCHITECTURE.md`
4. `.ai/FRONTEND.md`
5. `.ai/DESIGN_IMPORT_RULES.md`
6. `.design/HTML_EXPORT_ STYLE_GUIDE.md`
7. `.ai/DESIGN_SYSTEM_INVENTORY.md` if present
8. `.prompts/import-design-system.md` (the INITIAL contract) if present
9. Existing `design-system/index.html`, `design-system/components/*.html`, and `design-system/foundations/*.html` canonical documentation if present
10. `.ai/BACKEND.md` only when PHP rendering actually matters.

Inspect the new source files, current canonical DS SCSS and JS, existing project assets, build entries, and representative pages using affected components. If the DS has never been imported, **do not run SYNC**; use the INITIAL import prompt instead.

## Two sources of truth

**New exported Design System is authoritative for approved design:** tokens, typography, component variants/states, visual changes, responsive intent, assets, animation/interaction intent.

**Existing production project is authoritative for implementation:** source layout (`src/scss`, `src/js`), module boundaries, build entries, stable contracts, PHP integration, existing consumers, accessibility behavior, application logic and unrelated customizations.

The new export is **not** a wholesale replacement for current production code. It may regenerate markup, selectors or algorithms without a meaningful design change. Compare **observable behavior and intended visual design**, not just literal code.

## Safety and scope

- Keep `raw/` and its reference assets untouched.
- Never edit generated `assets/css` or `assets/js` directly; edit `src/` and rebuild.
- Respect `.ai/DESIGN_IMPORT_RULES.md`: **no new PHP partials, includes, PHP component system or business logic**. Do not modify unrelated page layouts.
- Preserve existing canonical class names, `data-*` hooks, tokens and component APIs where possible. Rename only when genuinely necessary; identify and migrate all known consumers safely.
- Preserve intentional production features and fixes that are unrelated to the new design.
- Never remove a component, variant, variable or animation merely because it is absent from one new example. Only remove it when the **source explicitly deprecates it and usage analysis demonstrates safe removal**; otherwise record it as an unresolved deprecation candidate.
- Shared token and component changes can impact many pages. Do not silently break them to match a single export.
- Avoid unrelated cleanups, redesigns, massive formatting changes or introducing new infrastructure.

## Step 0 — Establish a comparable baseline

Resolve the precise updated export scope (files, components, versions if supplied). Inspect `.ai/DESIGN_SYSTEM_INVENTORY.md` and map updated components to their current production implementations. Prefer old raw references or a recorded previous export when available. If an old export is unavailable, compare new specification to existing production output and **record the baseline limitation** instead of pretending to know the historical delta.

## Step 1 — Build a delta report before editing

Create an internal or written migration plan with:

| Item | New design requirement | Current production behavior | Impacted consumers | Action | Risk |
| --- | --- | --- | --- | --- | --- |
| Token/component/animation | New observable specification | Current output/API | Pages/components | No change / update / add / investigate | Low/medium/high |

Classify each observed difference:

- **Design delta:** change requested by the new export → implement.
- **Export-only/code-generation difference:** same visual and interaction result → ignore.
- **Existing production fix/extension:** keep unless new approved design explicitly supersedes it.
- **Ambiguous or conflicting requirement:** prefer non-destructive behavior and document for review.

Check token consumers and style cascade before editing any global token or base selector. Do not treat omitted demo examples as removal requests.

## Step 2 — Apply the minimal update

### Foundations

Change only affected values/roles and references in the canonical existing token/font/typography files (normally `src/scss/utils`, `src/scss/core`, and/or an already established DS-specific layer). Avoid creating a second source of truth or overwriting locally necessary aliases. Preserve exact new breakpoints if changed intentionally.

### Components

Update the existing component module (normally `src/scss/components`) rather than creating a duplicate. Add missing new variants/states using existing naming conventions; retain documented backwards-compatible modifiers. Preserve accessible markup and interactions. Update the canonical HTML usage contract only when required.

### JavaScript / motion

Modify only affected `src/js` modules. Preserve initialized instance lifecycle, ARIA synchronization, keyboard interaction, reduced-motion safeguards and performance characteristics unless a specific design delta requires change. Reuse existing dependency choices; no inline JS and no unnecessary new libraries.

### Canonical HTML Component Library (required)

For each affected component, compare new exported markup with the canonical examples under `design-system/components/` and update only the examples that reflect **approved actual changes**:
- Keep copyable semantic HTML consistent with the real production SCSS class selectors, supported modifiers, `data-*` hooks and JavaScript expectations.
- Add new approved examples/variants; update changed markup, accessibility attributes, labels and states.
- **Never remove older variants or examples just because they are absent from the latest export.** Require explicit deprecation and evidence of consumer safety first.
- Keep catalog pages wired to the **actual compiled project CSS and JavaScript**. Do not paste implementation styles or behaviors into documentation pages.
- Keep the catalog navigation in `design-system/index.html` current and link each changed example from `.ai/DESIGN_SYSTEM_INVENTORY.md`.
- Treat the catalog as documentation only: do not add PHP component APIs, includes, PHP logic, or any page migration.
- If an approved change makes the existing catalog example misleading, updating it is part of the same SYNC task, not an optional follow-up.

### Assets

Update real assets and their source URLs through the project's conventions. Do not rename/delete older assets until usage analysis confirms safety. Report missing or unresolvable source assets rather than using fabricated alternatives.

### Page compatibility

Pages are consumers of the Design System. For a breaking API/class/token change, enumerate consumers and apply the minimum **required compatibility updates** only; do not otherwise migrate or redesign pages. If a page's own layout requires a design update, leave that to `.prompts/sync-design-update.md` and report the follow-up.

## Step 3 — Validate changes and regressions

Run applicable existing build commands and verify:

- compilation, correct CSS ordering and loaded JS modules;
- catalog HTML examples load real compiled assets and correctly demonstrate all changed/retained variants and behaviors;
- affected component states/variants, keyboard use, visual output, animations and responsive layouts against updated export;
- unaffected variants still work;
- representative pages using changed components show no unintended regression;
- no CSS/JS duplication, broken asset paths, console errors or double initialization.

If testing is limited (e.g. no browser), disclose what was not verified; never claim pixel parity without comparison.

## Step 4 — Update inventory and report

Update `.ai/DESIGN_SYSTEM_INVENTORY.md` with current tokens, components, variants, dependencies, canonical `design-system/components/*.html` links and verification status. Where useful, record the updated export filename/version and change log for a future sync.

Final report must list:

1. Source file(s) and baseline compared.
2. Actual design deltas vs ignored implementation-only differences.
3. Shared files changed, plus consumers/compatibility updates.
4. Added/changed/deprecated (not yet removed) variants and tokens.
5. Build and visual/interactive/regression verification results.
6. Outstanding conflicts, unverified cases and any page-update follow-up.

## Definition of done

The existing DS reflects approved differences in the new export with **minimal safe changes**, retains stable consumer contracts wherever feasible, and does not cause unrelated production regressions.

**Never rebuild from scratch, never touch `raw/`, and never use SYNC to migrate ordinary pages.**
