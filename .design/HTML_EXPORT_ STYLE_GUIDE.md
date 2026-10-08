# Claude Design HTML Export Style Guide

> **Purpose**
>
> This document defines the official standards for exporting production-ready HTML from Claude Design. The generated output should require minimal manual cleanup and be optimized for migration into existing projects using GitHub Copilot, Claude Code, or similar AI-assisted development tools.

---

# 1. Philosophy

Every generated page should follow these principles:

- Produce **production-quality code**, not prototypes.
- Prioritize readability over cleverness.
- Keep the entire page self-contained.
- Optimize for future maintenance.
- Minimize migration effort.
- Prefer consistency over personal coding style.
- The output should be understandable by both developers and AI tools.

The goal is to create HTML that can be integrated into a production project with almost no manual refactoring.

VERY IMPORTANT: Export as framework-free HTML. Do not use any React concepts internally. Do not rely on Framer Motion, React state, hooks, CSS-in-JS, or runtime libraries. Every animation must be implemented using only vanilla CSS animations/transitions or vanilla JavaScript. The page must work correctly when opened as a standalone HTML file.
If an effect cannot be reproduced without React, replace it with the closest CSS/JavaScript implementation instead of omitting it.

## Animations

Do not omit any animation.

Every animation from the specification MUST exist in the exported page.

If the original animation relied on React, Framer Motion, Motion Values, hooks or runtime state, recreate it using:

• CSS
• Vanilla JavaScript
• Motion One
• GSAP

Choose the closest equivalent.

Animation Coverage Verification

Before returning the HTML, compare the exported page against the Animation Specification.

Every animation listed in the specification must exist in the exported page.

If any animation is missing, regenerate only that animation until the exported page reaches 100% animation coverage.

Do not finish until every interaction from the original design has been preserved or faithfully recreated.

## Accessibility

Add:

alt
aria-label
aria-expanded
aria-hidden
keyboard accessibility

## Performance

Avoid unnecessary DOM nodes.

Avoid duplicate CSS.

Prefer CSS over JS.

Prefer transform instead of top/left animations.

Keep bundle lightweight.

## Browser Support

Use modern evergreen browser features.

Do not support legacy browsers unless requested.

# 2. HTML Structure

# Analyze Design

Layout hierarchy

Components

Spacing system

Typography scale

Grid

Animation map

Responsive behavior

Interactive states

---

Each export **must** consist of a single HTML file.

Structure:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Meta -->

    <!-- Fonts -->

    <style>
      /* CSS */
    </style>
  </head>

  <body>
    <!-- HTML -->

    <script>
      // JavaScript
    </script>
  </body>
</html>
```

Rules:

- Single HTML file only
- CSS inside `<head>`
- JavaScript before `</body>`
- No external CSS files
- No external JavaScript files
- No frameworks
- No build tools
- Semantic HTML only

Use semantic tags whenever possible:

- `<main>`
- `<section>`
- `<header>`
- `<footer>`
- `<nav>`
- `<article>`
- `<aside>`
- `<figure>`

Always use proper heading hierarchy.

## Images

Use placeholder image paths.

Example:

images/hero.jpg

Do not:

- embed base64
- use blob urls
- generate fake CDN links

Prefer inline SVG only when required.
Otherwise use image placeholders.

## Forms

Every input must have label
Every input must have id
Every input should have placeholder
Submit button uses type="submit"
Other buttons use type="button"

---

# 3. CSS Organization

CSS should be divided into clearly separated sections.

Example:

```css
/* =========================================================
   DESIGN TOKENS
========================================================= */

/* =========================================================
   RESET
========================================================= */

/* =========================================================
   LAYOUT
========================================================= */

/* =========================================================
   TYPOGRAPHY
========================================================= */

/* =========================================================
   BUTTONS
========================================================= */

/* =========================================================
   COMPONENTS
========================================================= */

/* =========================================================
   ANIMATIONS
========================================================= */

/* =========================================================
   RESPONSIVE
========================================================= */
```

Rules:

- Every section starts with a visible comment.
- Related styles stay together.
- Avoid duplicated styles.
- Use CSS variables whenever appropriate.
- Keep styles modular.

---

# 4. Naming Convention

Use OOCSS and Atomic CSS / Utility-First principles.

Good:

```text
hero
hero_content
hero_title
hero_buttons

card
card_icon
card_title

section
section--purple
section--light
```

Avoid:

```text
box1
block2
x
content123
wrapper-wrapper
```

Rules:

- Meaningful names only
- Predictable naming
- No autogenerated names
- No Tailwind-like utility naming
- No hashed classes

---

# 5. Code Formatting

Code should be easy to read.

Rules:

- Consistent indentation (2 or 4 spaces)
- One property per line
- Blank lines between logical groups
- Related properties stay together
- No minified output
- No compressed formatting

Readable code is preferred over shorter code.

---

# 6. Comment Style

Large sections should always have visual separators.

Example HTML:

```html
<!-- ========================= HERO ========================= -->
```

Example CSS:

```css
/* =========================================================
   HERO
========================================================= */
```

Example JavaScript:

```javascript
/* =========================================================
   Sticky Header
========================================================= */
```

Comments should describe **sections**, not every individual line.

---

# 7. Design Accuracy

Claude Design should reproduce the original design as accurately as possible.

Requirements:

- Match spacing
- Match typography
- Match colors
- Match shadows
- Match gradients
- Match border radius
- Match layout proportions
- Match animations
- Match transitions

Do **not** simplify complex layouts.

Do **not** replace custom components with generic ones.

Pixel-perfect implementation is preferred.

---

# 8. Component Guidelines

Every major block should behave like an independent component.

Example:

```
Hero

Features

About

Testimonials

Pricing

FAQ

Footer
```

Each section should contain:

```
section

container

content
```

Avoid mixing unrelated components.

Keep components isolated.

---

# 9. JavaScript Organization

JavaScript should be split into logical blocks.

Example:

```javascript
/* =========================================================
   Sticky Header
========================================================= */

(function () {})();

/* =========================================================
   Testimonials
========================================================= */

(function () {})();
```

Rules:

- One feature per block
- Avoid global variables
- Keep functions small
- Keep logic modular
- Separate UI behaviors

---

# 10. Responsive Rules

Responsive behavior should be consistent.

Preserve all existing responsive breakpoints defined in the design. Do not simplify, merge, remove, or replace custom breakpoints with standard ones. If the design contains additional breakpoint-specific adjustments for certain sections or components, keep them exactly as they are, as they are intentional design decisions.
Keep all existing responsive breakpoints exactly as defined in the design. Do not remove or consolidate custom breakpoints used for specific layout or design adjustments.

Choose one strategy:

- Desktop First
- Mobile First

Do not mix both.

Recommended breakpoints:

```
980px

640px
```

Avoid random breakpoints.

Maintain visual consistency across screen sizes.

---

# 11. AI-Friendly Output

The HTML should be optimized for AI-assisted migration.

Requirements:

- Predictable structure
- Stable class names
- Reusable components
- Clean DOM
- Minimal nesting
- No duplicated markup
- No duplicated CSS
- Easy to parse
- Easy to refactor

The output should be understandable by both humans and AI.

---

# 12. Migration Compatibility

This export is intended to be migrated into an existing project using GitHub Copilot or Claude Code.

Therefore:

Generate only:

- Pure HTML
- Pure CSS (modern)
- Pure JavaScript (modern, ES6)

Do **not** generate:

- PHP
- Blade
- Twig
- JSX
- React
- Vue
- Angular
- Svelte
- Template syntax
- Backend logic

The HTML should be easy to move into:

```
templates/home.php
```

or another template file later.

Do not make assumptions about the backend architecture.

If the page has no interactions,
do not generate unnecessary JavaScript.

---

# 13. Things to Avoid

Never generate:

- Random class names
- Inline CSS
- Inline JavaScript handlers
- jQuery
- Bootstrap
- Tailwind
- Multiple CSS files
- Multiple JS files
- Placeholder content
- Lorem Ipsum
- Hidden dependencies
- Minified code
- Generated IDs
- Deep unnecessary nesting
- Redundant wrappers
- Duplicate styles
- Duplicate HTML

Keep the output clean and intentional.
Avoid magic numbers.
Avoid placeholder content.
Avoid fake data unless explicitly requested.
Avoid inline styles unless they are required for unique decorative elements or design-specific positioning.

---

# 14. Output Checklist

Before finishing, verify the following:

- ✅ Single HTML file
- ✅ CSS inside `<head>`
- ✅ JavaScript before `</body>`
- ✅ Semantic HTML
- ✅ Responsive layout
- ✅ OOCSS Atomic CSS / Utility-First naming
- ✅ Design Tokens
- ✅ Organized CSS sections
- ✅ Organized JavaScript sections
- ✅ Component-based structure
- ✅ Section comments
- ✅ No external dependencies
- ✅ No framework-specific code
- ✅ No backend/template syntax
- ✅ AI-friendly structure
- ✅ Migration-ready
- ✅ Pixel-accurate implementation
- ✅ Production-quality output
- ✅ Clean, readable code

---

# Final Goal

The generated HTML should look as if it were written by a senior frontend developer preparing a production-ready template for integration into a real-world project.

The code should require little to no manual cleanup before migration into an existing codebase using GitHub Copilot, Claude Code, or other AI-assisted development tools.
