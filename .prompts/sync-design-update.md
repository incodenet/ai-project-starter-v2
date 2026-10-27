# Synchronize Design Update

## Input compatibility (Pure HTML and Claude Design bundles)

For an updated bundled Claude Design export, run `.prompts/unpack-design-export.md` and `.prompts/normalize-design-export.md` in `SYNC` first, limited to affected logical templates and variants. The resulting normalized `raw/normalized/<snapshot>/pages/*.html` is the **new visual specification** used below. Compare it with the existing production implementation and, when available, the prior normalized snapshot. Do not treat bundle UUID churn, altered serialization or extracted HTML diffs alone as evidence of a visible design change. Existing business logic and production architecture remain authoritative. Plain updated HTML exports continue to enter directly; do not automatically normalize them. Never edit reference snapshots during production sync.

## Goal

Synchronize an existing production page with a newly exported HTML version from Claude Design.

This task is **NOT an initial migration**.

The production page already exists and is already integrated into the project architecture.

The new HTML file inside `raw/` represents an **updated visual specification**.

Your task is to:

1. analyze the new raw design;
2. compare it with the existing production implementation;
3. identify the actual design delta;
4. apply only the required changes;
5. preserve all unaffected production code and behavior.

Do **NOT** rebuild, regenerate, or re-import the entire page from scratch.

---

# Core Principle

There are two different sources of truth.

## New raw HTML

The new raw HTML is the source of truth for:

- visual design;
- layout changes;
- responsive behavior;
- breakpoint-specific design;
- typography;
- spacing;
- colors;
- assets;
- visual states;
- animation intent;
- interaction intent.

## Existing production implementation

The existing production code is the source of truth for:

- project architecture;
- template structure;
- PHP integration;
- backend integration;
- dynamic rendering;
- data flow;
- existing reusable components;
- SCSS organization;
- JavaScript organization;
- dependencies;
- application behavior;
- existing business logic.

The goal is to synchronize the **new visual design** with the **existing production architecture**.

---

# Critical Requirement

Do NOT treat the new raw HTML as a replacement for the production page.

Do NOT copy the entire raw implementation into production.

Do NOT restart the original migration process.

Instead:

```text
Existing Production
        +
New Visual Specification
        ↓
    Design Delta
        ↓
Minimal Production Update
```

Apply only the differences required by the updated design.

---

# Read First

Before making any changes, read:

- `.claude/claude-instructions.md`
- `.ai/CODEBASE.md`
- `.ai/ARCHITECTURE.md`
- `.ai/FRONTEND.md`
- `.ai/DESIGN_IMPORT_RULES.md`

Read `.ai/BACKEND.md` when PHP rendering, backend integration, dynamic data, or template behavior is involved.

Then inspect:

- the new HTML file inside `raw/`;
- the corresponding production template;
- relevant SCSS;
- relevant JavaScript;
- existing shared components;
- existing layout styles;
- relevant assets;
- build configuration and entry points when necessary.

Do not modify anything before understanding both implementations.

---

# Raw Source Is Read-Only

Files inside `raw/` are reference artifacts.

Do NOT:

- edit raw HTML;
- format raw HTML;
- rename raw source files;
- delete raw files;
- overwrite raw files;
- modify raw CSS;
- modify raw JavaScript merely to make comparison easier.

The new raw version must remain an unchanged visual baseline.

---

# Important: Raw Implementation Is Not Production Architecture

Claude Design may regenerate implementation details between exports.

The new raw HTML may contain:

- different class names;
- different wrapper elements;
- reordered CSS;
- different JavaScript structure;
- different generated selectors;
- equivalent markup implemented differently.

Do NOT treat such implementation differences as design changes by themselves.

For example:

```text
Old raw:
.hero-content

New raw:
.hero__content
```

This does NOT automatically mean the production class must be renamed.

The important question is:

> Did the rendered design or behavior change?

Class names and generated implementation details are secondary.

---

# Do Not Use Raw Code Diff as the Primary Source

A direct textual comparison such as:

```text
old raw HTML
vs
new raw HTML
```

may contain large amounts of irrelevant implementation noise.

Prefer reasoning about:

```text
existing rendered production
vs
new rendered raw design
```

Use HTML, CSS, and JavaScript differences only to understand how the new design works.

Do not blindly reproduce generated implementation changes.

---

# Scope Discipline

Modify only code related to the updated design.

Do NOT perform unrelated refactoring.

Do NOT:

- rewrite unrelated components;
- clean up unrelated legacy code;
- reorganize the whole SCSS architecture;
- rename unrelated classes;
- rewrite global JavaScript without necessity;
- remove code merely because it appears unused in this page;
- redesign unaffected sections.

If a broader architectural improvement is discovered, report it separately.

Do not expand the scope of the design synchronization task unless required for correctness.

---

# Step 1 — Resolve the Update Target

Identify:

- new raw HTML source;
- corresponding production template;
- page-specific SCSS;
- shared SCSS used by the page;
- page-specific JavaScript;
- shared JavaScript used by the page;
- relevant assets;
- relevant dependencies.

Example:

```text
raw/home.html
        ↓
templates/home.php

src/scss/pages/home.scss
src/scss/components/*
src/scss/layouts/*

src/js/*
```

Do not assume paths when the project already defines another structure.

Inspect the existing project first.

---

# Step 2 — Analyze the New Design

Before comparing implementations, understand the new design itself.

Create an internal inventory.

## Structure

Identify:

- header;
- navigation;
- hero;
- sections;
- cards;
- forms;
- buttons;
- sliders;
- tabs;
- accordions;
- modals;
- footer;
- other components.

## Visual Properties

Analyze:

- layout;
- widths;
- heights;
- spacing;
- margins;
- paddings;
- gaps;
- typography;
- colors;
- backgrounds;
- gradients;
- shadows;
- border radius;
- borders;
- alignment;
- positioning;
- z-index behavior;
- overflow behavior.

## Responsive Behavior

Identify:

- every media query;
- every breakpoint;
- layout changes;
- hidden elements;
- reordered content;
- mobile-only elements;
- desktop-only elements;
- size changes;
- spacing changes;
- typography changes;
- navigation changes;
- interaction changes.

Do not normalize breakpoints.

Preserve intentional custom breakpoints.

## Interactions

Identify:

- navigation behavior;
- hover states;
- focus states;
- active states;
- accordions;
- tabs;
- sliders;
- modals;
- mobile menus;
- sticky elements;
- cursor interactions;
- forms;
- buttons;
- scroll behavior.

## Animations

Identify:

- page-load animations;
- scroll animations;
- hover transitions;
- reveal effects;
- stagger effects;
- timelines;
- parallax;
- SVG animations;
- text animations;
- image animations;
- mobile-specific animations.

## Assets

Inventory:

- images;
- icons;
- SVG;
- fonts;
- videos;
- backgrounds;
- other referenced files.

---

# Step 3 — Analyze Existing Production

Inspect how the current production page is implemented.

Understand:

- template structure;
- dynamic PHP markup;
- backend-generated content;
- existing reusable components;
- existing SCSS;
- design tokens;
- shared layout styles;
- breakpoint architecture;
- JavaScript modules;
- application state;
- animation implementation;
- third-party dependencies;
- asset locations.

Do not assume the raw implementation should replace any existing production implementation.

---

# Step 4 — Search Existing Code Before Editing

Before creating new code, search the project for existing equivalents.

Search:

- components;
- selectors;
- SCSS;
- design tokens;
- mixins;
- breakpoints;
- JavaScript modules;
- animations;
- utilities;
- icons;
- assets.

For every required design change determine whether production already contains:

- the exact implementation;
- a reusable implementation;
- a component that should be extended;
- a utility that can be reused;
- a similar interaction;
- an existing animation system.

Prefer:

```text
reuse
    ↓
extend
    ↓
modify
    ↓
create new
```

Do not create duplicates.

---

# Step 5 — Determine the Design Delta

Compare the new design with the existing production page.

Create an internal **Design Delta**.

Classify every meaningful difference.

Use the following categories.

## UNCHANGED

No meaningful visual or behavioral difference.

Action:

```text
DO NOTHING
```

Do not refactor unchanged sections.

---

## VISUAL

Examples:

- color;
- typography;
- spacing;
- width;
- height;
- border;
- radius;
- shadow;
- gradient;
- alignment.

Primary destination:

```text
SCSS
```

Avoid markup or JavaScript changes unless genuinely required.

---

## RESPONSIVE

Examples:

- new mobile layout;
- changed tablet layout;
- new breakpoint;
- changed spacing at specific viewport;
- changed mobile typography;
- desktop/mobile visibility;
- mobile menu changes.

Primary destination:

```text
SCSS
```

plus markup or JavaScript only when responsive behavior requires it.

---

## STRUCTURAL

Examples:

- new element;
- removed element;
- new wrapper required by layout;
- changed semantic structure;
- changed card hierarchy;
- new mobile control;
- changed navigation structure.

Possible destinations:

```text
template
SCSS
JavaScript
```

Preserve existing dynamic rendering and backend integration.

---

## BEHAVIORAL

Examples:

- new slider behavior;
- changed accordion behavior;
- mobile menu interaction;
- sticky behavior;
- click behavior;
- navigation behavior.

Primary destination:

```text
JavaScript
```

plus markup or styles where necessary.

---

## ANIMATION

Examples:

- new reveal;
- changed duration;
- changed easing;
- changed stagger;
- changed trigger;
- changed parallax;
- new mobile animation.

Possible destinations:

```text
SCSS
JavaScript
existing animation library
```

Reuse the existing project's animation strategy.

---

## ASSET

Examples:

- new image;
- new icon;
- changed SVG;
- changed background;
- changed media file.

Update the corresponding production asset references.

---

## CONTENT

Examples:

- changed heading;
- changed button label;
- changed paragraph;
- changed card content.

Before changing production markup, determine the content source.

Content may come from:

- PHP;
- CMS;
- API;
- localization;
- configuration;
- database.

Do not replace dynamic content with static text copied from raw HTML.

---

# Step 6 — Create an Internal Update Map

Before editing code, map every relevant design delta to the production implementation.

For each change determine:

```text
Change
↓
Affected component
↓
Existing implementation
↓
Required modification
↓
Affected files
↓
Affected viewport
↓
Regression risk
```

Example:

```text
Mobile hero becomes stacked
↓
Hero component
↓
Existing desktop flex layout
↓
Add mobile layout at 640px
↓
src/scss/pages/home.scss
↓
<= 640px
↓
Low
```

Another example:

```text
Mobile navigation becomes drawer
↓
Header navigation
↓
Existing navigation module
↓
Extend mobile state
↓
header template
header.scss
navigation.js
↓
<= 980px
↓
Medium
```

Do not start implementation until every meaningful design change has a clear destination.

---

# Responsive Synchronization

Responsive updates require special care.

The new raw design may be created after the desktop version has already been integrated.

For example:

```text
Production:

Desktop ✓
Tablet ✓
Mobile old

New design:

Desktop unchanged
Tablet slightly changed
Mobile completely redesigned
```

In this case:

**Do not rework desktop implementation.**

Only synchronize affected viewport ranges.

---

# Preserve Unaffected Viewports

If a design update affects only mobile:

- preserve desktop layout;
- preserve desktop styles;
- preserve desktop animations;
- preserve desktop interactions;
- preserve desktop component structure unless a shared structural change is necessary.

Likewise, if only desktop changed, preserve established mobile behavior.

Do not refactor unaffected viewport ranges merely for stylistic consistency.

---

# Breakpoint Comparison

Inspect:

1. breakpoints used by the new raw design;
2. breakpoints affecting the existing production implementation.

Classify breakpoints as:

```text
unchanged
modified
added
superseded
```

Preserve the exact breakpoint values required by the design.

Do NOT automatically replace custom breakpoints with standard breakpoints.

Do NOT merge nearby breakpoints merely to simplify code.

Design-specific breakpoints are intentional unless proven otherwise.

---

# Never Remove Breakpoints Blindly

Do not remove an existing breakpoint merely because the new raw export does not contain it.

Existing breakpoints may support:

- other components;
- global layout;
- header behavior;
- CMS content;
- legacy edge cases;
- another page;
- intermediate viewport behavior.

Modify or remove an existing responsive rule only when you can verify that the new design explicitly supersedes it for the same component and viewport range.

---

# Preserve Responsive Cascade

When adding new responsive styles:

- understand the existing cascade;
- understand source order;
- understand selector specificity;
- avoid unnecessary overrides;
- avoid `!important`;
- avoid duplicating complete component styles inside media queries.

Prefer changing only properties that actually differ.

Bad:

```scss
@media (...) {
  .card {
    // duplicate entire card implementation
  }
}
```

Prefer:

```scss
@media (...) {
  .card {
    grid-template-columns: 1fr;
    gap: ...;
  }
}
```

when only those properties changed.

---

# Preserve Production Data Flow

Static markup inside raw HTML represents a visual example.

It does NOT override production data architecture.

For example, raw may contain:

```html
<div class="card">Item 1</div>
<div class="card">Item 2</div>
<div class="card">Item 3</div>
```

while production may render those cards dynamically.

Do NOT replace:

- PHP loops;
- API rendering;
- CMS content;
- localization;
- conditions;
- configuration;
- backend-generated markup;

with static raw content.

Adapt the existing dynamic template to reproduce the new visual structure.

---

# Preserve PHP Logic

When the production template already contains PHP:

Do NOT remove or rewrite PHP business logic merely because raw HTML is static.

Preserve:

- variables;
- conditions;
- loops;
- data binding;
- translations;
- configuration;
- routes;
- backend integration.

Change markup around the existing logic only when required by the updated design.

Do not introduce new PHP logic unless required by the actual update.

---

# Preserve Existing Components

If production already uses reusable components, do not replace them with raw markup.

Instead:

1. understand the design change;
2. locate the existing component;
3. determine whether the change is:

   - global;
   - variant-specific;
   - page-specific;
   - responsive-only;

4. update the component at the correct level.

Do not modify a shared component globally if the design change applies only to one page.

Prefer an existing variant mechanism where available.

Avoid one-time hacks.

---

# HTML Update Rules

When markup changes are required:

- preserve semantic HTML;
- preserve accessibility;
- preserve dynamic rendering;
- preserve production architecture;
- preserve existing reusable structures;
- make the smallest structural change capable of reproducing the new design.

Do NOT copy:

- `<html>`;
- `<head>`;
- `<meta>`;
- `<title>`;
- raw `<style>`;
- raw `<script>`;
- standalone document shell.

The existing project layout remains authoritative.

---

# Conservative DOM Policy

Default to preserving the existing production DOM.

Change DOM structure only when required by the new design or interaction.

Before removing or moving wrappers, verify effects on:

- CSS selectors;
- JavaScript selectors;
- `:nth-child`;
- child selectors;
- sibling selectors;
- animation targets;
- GSAP timelines;
- stagger order;
- containing blocks;
- absolute positioning;
- stacking contexts;
- z-index;
- overflow clipping;
- flex behavior;
- grid behavior;
- responsive behavior.

Do not perform aggressive DOM cleanup during a design synchronization task.

---

# CSS / SCSS Update Rules

Raw CSS describes the desired visual result.

Do NOT copy raw CSS blindly.

Translate only required changes into the existing SCSS architecture.

Reuse:

- variables;
- design tokens;
- mixins;
- existing component styles;
- existing utilities.

Place styles according to project architecture.

Typically:

```text
Shared component styles
→ src/scss/components/

Layout styles
→ src/scss/layouts/

Page-specific styles
→ src/scss/pages/
```

Use actual project conventions when they differ.

Never edit compiled `assets/css` files directly unless the project explicitly defines them as source files.

Generated CSS must be produced by the existing build process.

---

# Do Not Duplicate Styles

Before adding a rule:

1. search existing SCSS;
2. determine whether the same value or component already exists;
3. reuse or extend existing styles where appropriate.

Avoid:

- copied component definitions;
- duplicate media queries;
- duplicate animation keyframes;
- duplicate utility classes;
- duplicate design tokens.

However, do not over-generalize a unique design rule just to achieve DRY.

Visual correctness remains the priority.

---

# JavaScript Update Rules

Raw JavaScript expresses **interaction intent**.

It is not automatically production-ready application logic.

Never replace existing production behavior simply because the raw page contains standalone JavaScript.

Example:

```text
Raw:
simple mobile menu demo

Production:
existing navigation controller
```

Correct action:

```text
Understand new menu behavior
↓
Extend existing navigation controller
```

Incorrect action:

```text
Delete production navigation
↓
Copy raw JavaScript
```

---

# JavaScript Placement

Do not automatically put all new code into `src/js/main.js`.

Inspect existing JavaScript architecture and build entry points.

Prefer:

```text
existing shared behavior
→ existing shared module

page-specific behavior
→ existing page module or existing page entry

third-party library code
→ existing project dependency/vendor mechanism
```

Do not create new build topology unless required.

---

# JavaScript Hooks

Prefer stable `data-*` attributes for behavior hooks.

Example:

```html
<button data-menu-toggle></button>
```

Avoid coupling application behavior to purely presentational classes when possible.

State classes such as:

```text
.is-open
.is-active
.is-visible
```

may be used when CSS requires explicit state selectors.

Keep accessibility state synchronized where applicable:

- `aria-expanded`;
- `aria-hidden`;
- `aria-selected`;
- etc.

---

# Animation Synchronization

Animations are part of the approved visual design.

Do not silently remove or simplify them.

For changed animations compare:

- trigger;
- duration;
- delay;
- easing;
- stagger;
- opacity;
- transform;
- scale;
- rotation;
- origin;
- scroll position;
- scrub behavior;
- timeline order;
- responsive behavior.

Determine whether the production animation already implements the same behavior.

If yes:

```text
DO NOT REIMPLEMENT
```

If only parameters changed:

```text
UPDATE PARAMETERS ONLY
```

If behavior changed:

```text
EXTEND OR MODIFY EXISTING IMPLEMENTATION
```

Create a new animation implementation only when necessary.

---

# Animation Technology Priority

Use the project's existing animation architecture first.

When a new implementation is required, prefer:

```text
CSS
↓
Vanilla JavaScript
↓
Existing animation library
↓
New dependency only when genuinely necessary
```

Do not introduce another animation library when the project already has one capable of reproducing the design.

---

# Imported Dependencies

When the new raw design uses a runtime dependency:

1. identify the dependency;
2. check project dependencies;
3. check existing vendor files;
4. check existing implementation;
5. reuse the installed project version where possible.

Do not:

- load duplicate versions;
- use arbitrary CDN scripts;
- introduce new animation libraries unnecessarily;
- silently remove required plugins.

For GSAP or similar libraries:

- preserve required plugins;
- preserve initialization order;
- preserve registration;
- reuse existing project configuration.

Report newly introduced dependencies.

---

# Reduced Motion

Preserve the approved animation for normal users.

When appropriate, support:

```css
@media (prefers-reduced-motion: reduce);
```

Ensure reduced motion does not:

- hide content;
- prevent interaction;
- break state transitions;
- make components unusable.

Do not disable functional behavior.

---

# Asset Synchronization

Inventory every changed or newly introduced:

- image;
- icon;
- SVG;
- background;
- font;
- video;
- media asset.

Determine whether the asset already exists in production.

Reuse existing assets when identical.

For new assets, use the project's established destination.

Typical project destinations:

```text
images
→ assets/img/

icons
→ assets/icons/
```

Follow actual project structure when different.

---

# Asset Safety

Do NOT:

- invent missing files;
- generate fake paths;
- silently replace an unavailable asset;
- overwrite unrelated assets;
- create filename collisions;
- replace animated inline SVG with `<img>` if internal SVG elements are animation targets.

When SVG paths or groups are individually animated or styled, preserve the required inline structure.

Update references in:

- templates;
- SCSS;
- JavaScript;

where required.

Report unresolved assets.

---

# Content Synchronization

A text difference in raw HTML does not automatically mean the template should be edited.

First identify the production source.

Possible sources:

```text
static template
PHP
CMS
API
localization
configuration
database
```

If production content is dynamic:

Do NOT hardcode raw design content.

Preserve the data source.

Only update content source when the synchronization task explicitly requires content changes.

---

# Accessibility

Design updates must not reduce existing accessibility.

Preserve or improve:

- semantic elements;
- labels;
- alt attributes;
- keyboard accessibility;
- focus states;
- ARIA relationships;
- navigation semantics;
- button semantics.

Do not convert accessible production controls into generic raw `<div>` elements merely because Claude Design exported them that way.

Production semantics have priority when visual output can remain identical.

---

# Header and Footer Safety

Header and footer are often shared globally.

If the new design changes them:

1. determine whether the change is global or page-specific;
2. inspect existing layout implementation;
3. inspect impact on other pages.

Do not globally modify shared header/footer behavior when the design update applies only to one page.

If the design requires a page-specific variant, use or extend the project's variant mechanism.

Avoid duplicating the entire header/footer for one page.

---

# Shared Component Safety

Before modifying shared styles or JavaScript, identify all known consumers.

A new page-specific design difference should not regress other pages.

When possible:

```text
global design change
→ update shared component

page-specific design change
→ use existing modifier/variant

responsive component change
→ update relevant breakpoint behavior
```

Avoid excessive page-specific overrides, but prefer them over breaking unrelated pages when the design is intentionally different.

---

# Do Not Redesign

The new Claude Design export is considered approved.

Do not:

- modernize the design;
- simplify it;
- replace unusual layout decisions;
- normalize custom breakpoints;
- remove animation because it seems excessive;
- change spacing because another value looks cleaner;
- replace custom UI with generic components.

This is a synchronization task.

Not a redesign task.

---

# Visual Priority

When architecture and visual accuracy appear to conflict:

1. first look for an implementation compatible with both;
2. reuse existing architecture where possible;
3. avoid unnecessary structural changes.

Do not knowingly introduce visual regressions simply to make implementation more elegant.

Do not knowingly break architecture merely to copy raw code.

The intended target is:

```text
New visual result
+
Existing production architecture
```

---

# Regression Protection

Every modification must consider unaffected behavior.

Check whether changes could affect:

- other breakpoints;
- other states;
- other pages;
- shared components;
- shared SCSS;
- shared JavaScript;
- dynamic data;
- PHP rendering;
- animation timing;
- layout shifts;
- accessibility;
- browser behavior.

Prefer the smallest safe change.

---

# Validation

Validation is required before finishing.

Do not simply assume that the update is correct.

---

## Build Validation

Run the project's existing build commands.

Verify:

- SCSS compilation;
- JavaScript build;
- no syntax errors;
- no missing modules;
- no dependency errors.

Do not manually modify generated files to bypass build failures.

---

## Browser Validation

When browser rendering is available, test the integrated production page.

Check:

- browser console;
- missing assets;
- network errors;
- JavaScript errors;
- layout shifts;
- broken interactions.

---

# Visual Comparison

The new raw page is the updated visual baseline.

Compare:

```text
new raw design
vs
updated production page
```

Do NOT compare only source code.

Visual behavior is authoritative.

---

# Responsive Validation

Test at:

- design desktop width;
- tablet widths;
- mobile widths;
- every changed breakpoint;
- every newly introduced breakpoint.

When useful, also test:

```text
breakpoint - 1px
breakpoint
breakpoint + 1px
```

to detect cascade errors.

Example:

```text
979px
980px
981px
```

---

# Preserve Unchanged Ranges

When an update is mobile-only, also verify at least one unaffected desktop width.

When an update is desktop-only, verify mobile behavior has not regressed.

When changing a shared component, verify all relevant viewport ranges.

---

# Interaction Validation

Test affected:

- navigation;
- buttons;
- menus;
- sliders;
- accordions;
- tabs;
- hover states;
- active states;
- focus states;
- sticky behavior;
- scroll behavior;
- forms.

Do not claim interaction parity without testing when testing tools are available.

---

# Animation Validation

Verify:

- animations trigger;
- animation order;
- timing;
- easing;
- scroll triggers;
- responsive animation behavior;
- mobile animations;
- no duplicated initialization;
- no console errors;
- no obvious animation-induced layout shifts.

---

# Asset Validation

Verify:

- images load;
- icons load;
- backgrounds load;
- SVG references work;
- fonts remain available;
- CSS `url()` paths resolve.

Report unresolved references.

---

# Visual Parity Claims

Do not claim:

```text
pixel perfect
100% identical
fully visually verified
```

unless the raw and production versions were actually rendered and compared.

If full visual comparison is unavailable, state:

```text
Implementation synchronized based on source inspection.
Final visual parity requires browser comparison.
```

Never fabricate validation.

---

# Final Review

Before finishing verify:

- [ ] new raw source was not modified;
- [ ] existing production architecture was preserved;
- [ ] design delta was identified before implementation;
- [ ] unchanged sections were not unnecessarily refactored;
- [ ] unaffected viewport ranges were preserved;
- [ ] custom breakpoints were preserved;
- [ ] new breakpoints were added only when required;
- [ ] existing breakpoints were not removed blindly;
- [ ] dynamic PHP/content rendering was preserved;
- [ ] shared components were reused where appropriate;
- [ ] no duplicated SCSS was introduced;
- [ ] no duplicated JavaScript was introduced;
- [ ] raw JavaScript did not replace production logic blindly;
- [ ] changed assets were migrated correctly;
- [ ] animations were preserved or updated correctly;
- [ ] accessibility was not reduced;
- [ ] SCSS build succeeds;
- [ ] JavaScript build succeeds;
- [ ] changed interactions were tested when possible;
- [ ] responsive states were tested when possible;
- [ ] unresolved differences were documented.

---

# Final Report

At the end, provide a concise synchronization report.

Use this structure.

## Detected Design Changes

List only meaningful design changes.

Example:

```text
- Mobile hero layout changed from horizontal to stacked.
- Navigation switches to drawer below 980px.
- Card gap changed from 24px to 16px below 640px.
- New mobile menu icon added.
- Hero reveal animation duration changed.
```

## Files Modified

List each modified file and why.

## Files Created

List newly created files.

## Reused Existing Implementation

Report reused:

- components;
- SCSS;
- JavaScript;
- utilities;
- assets;
- dependencies.

## Responsive Changes

Report:

- breakpoints added;
- breakpoints modified;
- affected viewport ranges.

## Interaction Changes

Report changed behavior.

## Animation Changes

Report changed animation implementation or parameters.

## Asset Changes

Report assets added, replaced, or reused.

## Preserved Production Behavior

Mention important existing behavior intentionally left untouched.

## Unresolved Differences

List anything that could not be safely synchronized or verified.

## Validation Performed

State exactly what was actually validated.

Do not report checks that were not performed.

---

# Success Criteria

The synchronization is successful when:

1. the updated production page matches the new approved design;
2. unrelated production implementation remains unchanged;
3. existing project architecture remains intact;
4. dynamic data and PHP integration continue to work;
5. responsive behavior matches the updated design;
6. unaffected viewport ranges do not regress;
7. interactions remain functional;
8. animations match the updated design;
9. no unnecessary duplication is introduced;
10. the project builds successfully;
11. raw source remains an untouched visual reference.

---

# Final Principle

Think of this task as applying a **design patch**, not performing another migration.

The correct mental model is:

```text
New Claude Design
        ↓
Detect visual and behavioral delta
        ↓
Map delta to existing production architecture
        ↓
Apply the smallest safe production changes
        ↓
Validate
```

Never replace a stable production implementation when a smaller targeted update can reproduce the new approved design.
