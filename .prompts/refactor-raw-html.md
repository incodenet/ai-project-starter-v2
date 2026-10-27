## Input compatibility (Pure HTML and Claude Design bundles)

This prompt still expects a **standalone normalized HTML file** as its source under `raw/`; keep all existing architecture, markup, SCSS, JS and PHP constraints. If the input is a default bundled Claude Design export (`__bundler/*`), `.dc.html`, or a stateful multi-page `site.html`, DO NOT apply the `HTML Extraction` instructions directly to the wrapper. First run `.prompts/unpack-design-export.md` then `.prompts/normalize-design-export.md`; select **one logical template**, including the necessary variants, from the generated `raw/normalized/<snapshot>/pages/*.html`. If the input is already clean HTML/CSS/JS, continue directly as before. Treat extracted and normalized references as read-only. If the Design System exists, complete its INITIAL import first; reuse canonical examples from the inventory, and never overwrite production business logic with demo behavior.

## Proccess Order

0. Resolve task inputs and destination.
1. Read project instructions.
2. Inspect build and entry points.
3. Inspect raw page.
4. Inventory imported components and behavior.
5. Search project for existing equivalents.
6. Prepare migration map.
7. Migrate markup.
8. Migrate styles.
9. Migrate JavaScript.
10. Validate build and visual parity.
11. Report changes.

Before editing, create an internal migration map for:

- page sections;
- shared components;
- CSS tokens;
- responsive breakpoints;
- interactions;
- animations;
- assets;
- existing project equivalents;
- final destinations.

Do not start implementation until every imported concern has a destination.

# Refactor Raw HTML

Your task is to integrate an HTML page from the **raw/** directory into this project.

Treat the HTML in raw/ as the visual specification (source of truth). The implementation may change, but the rendered result must not.

The project already provides the global HTML document structure.

Do not recreate the document shell.

Assume that the template will be rendered inside an existing layout.

## Design System compatibility gate (mandatory)

Before creating or modifying page markup, styles, or JavaScript:

1. Read `.ai/DESIGN_SYSTEM_INVENTORY.md`, when present.
2. Inspect `design-system/components/*.html` and `design-system/foundations/*.html` for canonical examples relevant to the imported page.
3. Locate actual implementation in `src/scss/` and `src/js/` and validate classes, modifiers, `data-*` hooks and required DOM structure.
4. Map every page element to: **reuse existing DS component**, **supported variant/extension**, or **page-specific implementation**. If the catalog or inventory does not exist, document that limitation and follow existing architecture.
5. Prefer canonical HTML patterns for existing components rather than preserving different generated markup that duplicates them, provided visual appearance and interaction stay equivalent.
6. Do not duplicate DS styles or component JS inside page-specific files or override global tokens to match one page. For genuine new variants, record the gap and implement an additive, compatible extension only if within the page task's scope.
7. Do not modify the canonical catalog solely to hide a mismatch. Report conflicting exported requirements and what changed.
8. Leave `raw/` untouched. Preserve `.ai/DESIGN_IMPORT_RULES.md` restrictions against PHP components/partials and maintain visual parity.

**A copied HTML example is a markup contract, not an instruction to copy demo wrappers, catalog navigation, demo content or catalog-only styling into production pages.**

Read first

- CODEBASE.md
- ARCHITECTURE.md
- FRONTEND.md

The raw source is read-only.

Do not edit, format, rename, delete, or overwrite the source HTML or its
reference assets during migration.

Process

## HTML Extraction

The HTML file inside `raw/` is only the source of the page content.

Only extract the markup inside the `<body>` element.

Do NOT copy:

- <!DOCTYPE html>
- <html>
- <head>
- <meta>
- <title>
- <link>
- <style>
  
  
  

- <script> (move JavaScript into src/js instead)
  
  


The resulting template should contain only the page markup that belongs inside `<body>`.

Example

```
raw/home.html

<html>
<head>
    ...
</head>

<body>

    <!-- THIS CONTENT -->

</body>

</html>
```

↓

```
templates/home.php

<!-- ONLY THIS CONTENT -->
```

## Step 1

Review the HTML.

Find

- duplicated markup
- bad semantics
- accessibility issues
- inline CSS
- inline JavaScript
- unnecessary wrappers
- repeated elements

Explain findings.

---

## Step 2

Refactor HTML.

Requirements

- semantic HTML
- preserve visual appearance
- preserve behavior
- improve readability

---

## Step 3

Move styles.

Extract all CSS into SCSS.

Extract header and footer specific styles into separated scss files in src/layouts.
If header and footer are already exists, compare design and styles, and migrate missed or new parts, without breaking already exists markup.

Rules

Shared UI →

src/scss/components

Page-specific →

src/scss/pages
and then include it into new created php template from assets/css/pages

Reuse existing SCSS whenever possible.

Never duplicate styles.

---

## Step 4

Move JavaScript.

Extract all scripts into

src/js/main.js

Requirements

- modular code
- event listeners
- no inline JS

Reuse existing functions if available.

Do not automatically place every script in src/js/main.js.

Inspect the current JavaScript entry points and esbuild configuration.

Placement rules:

- shared behavior → existing common entry/module;
- page-only behavior → existing page-specific entry or a new page module;
- third-party libraries → existing lib directory;
- do not change the build topology unless required.

---

## Step 5

Compare with project.

Search for

- existing components
- existing SCSS
- existing JS

Reuse them whenever possible.

Never create duplicates.

---

## Step 6

Final review.

Report

- architecture improvements
- duplicated code removed
- styles extracted
- JavaScript extracted
- reusable blocks found
- possible PHP includes
- remaining technical debt

NEVER change visual appearance.

Always prioritize consistency with the project architecture over preserving the original generated structure.

## Asset Migration

1. Inventory every referenced image, icon, font, video, and SVG.
2. Resolve the actual source file before changing its path.
3. Copy assets to the appropriate public directory.
4. Preserve meaningful filenames.
5. Prevent filename collisions.
6. Update references in both markup and SCSS.
7. Do not invent missing files or silently replace them.
8. Report unresolved assets.
9. Preserve inline SVG when its internal paths are animated or styled.
10. Do not convert assets merely for stylistic consistency.

# Local assets

For linked images with src, use **assets/img** path.
For linked icons with src or **icon** prefix name, use **assets/icons** path.

## Imported Dependencies

Before changing animation code:

- identify every runtime dependency used by the raw export;
- check package.json and existing vendor files;
- reuse the project's installed version where available;
- do not add a second animation library for an effect already supported;
- do not use CDN imports unless the project explicitly uses CDN dependencies;
- register required plugins explicitly;
- preserve initialization order;
- document any dependency added or removed.

## Output

The `raw/` directory is temporary.

Never treat files inside `raw/` as production files.

The refactored page must be moved into the project structure.

Destination

- If a corresponding template already exists, update it.
- Otherwise create a new template.

Examples

```
raw/home.html
    →

templates/home.php
```

```
raw/about.html
    →

templates/about.php
```

```
raw/services.html
    →

templates/services.php
```

The generated PHP template should contain only page markup.

Business logic should remain outside the template.

The final production page must never remain inside the `raw/` directory.

## Critical requirement

The visual appearance of the page is considered APPROVED.

Your task is NOT to redesign the page.

Your task is ONLY to refactor the implementation.

The resulting page must be visually indistinguishable from the original.

Think of this task as moving the implementation into the project's architecture while preserving a pixel-equivalent result.

## Final validation

Before finishing, verify:

✓ Visual appearance preserved

✓ Responsive behavior preserved

✓ Animations preserved

✓ Interactions preserved

✓ Hover states preserved

✓ Focus states preserved

✓ Accessibility improved where possible

✓ SCSS extracted

✓ JavaScript extracted

✓ Existing project architecture respected

✓ Existing components reused

✓ No duplicated styles

✓ No duplicated JavaScript

✓ No unnecessary wrappers introduced

✓ Final page renders the same as the original

Validation must include:

1. Run the CSS build.
2. Run the JavaScript build.
3. Check for build errors.
4. Open both raw and integrated pages.
5. Compare at required viewport widths.
6. Test interactive states.
7. Check the browser console.
8. Check missing network assets.
9. Verify keyboard navigation.
10. Report anything that could not be verified.

Do not claim visual parity unless both pages were rendered and compared.

If browser rendering or screenshot comparison is unavailable, state that
visual parity remains unverified.

Use the raw page as the visual baseline.

Compare the baseline and integrated page at:

- the original design width;
- every preserved custom breakpoint;
- one width immediately above and below each major breakpoint.

Fix migration-caused differences before finishing.
Do not modify the raw baseline.
