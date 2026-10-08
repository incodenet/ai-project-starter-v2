# Animation Reimplementation Prompt

## Goal

Your task is to analyze the exported HTML page and recreate every missing interaction and animation that existed in the original Claude Design preview.

The final page must visually behave as close as possible to the original design while remaining framework-free.

---

# General Rules

- Do not use React.
- Do not use Vue.
- Do not use Angular.
- Do not use JSX.
- Do not use TypeScript.
- Do not introduce any build tools.

The final result must work by simply opening the HTML file in the browser.

Only the following technologies are allowed:

- HTML
- CSS
- Vanilla JavaScript
- GSAP (for complex animations)
- Motion One (for simple timeline animations)

Do not use any other animation libraries unless absolutely necessary.

---

# Step 1 — Analyze the page

Before writing code, inspect the page and identify every interaction.

Create an internal list containing:

- page load animations
- scroll animations
- hover animations
- click animations
- cursor interactions
- parallax
- sticky effects
- stagger animations
- counters
- sliders
- reveal effects
- SVG animations
- text animations
- image animations
- background animations

Determine which animations are currently missing compared to the original design.

Never create duplicated wrappers.

Never create anonymous containers.

Prefer shallow DOM.

Keep hierarchy stable.

---

# Step 2 — Choose the implementation

Use the following decision tree.

## Pure CSS

Use CSS only for:

- hover effects
- fade
- opacity
- scale
- rotate
- translate
- simple reveal
- transitions
- keyframes
- pulse
- floating
- loading effects

Never use JavaScript when CSS alone can reproduce the effect.

---

## Vanilla JavaScript

Use Vanilla JavaScript for:

- accordions
- tabs
- navigation
- modal windows
- counters
- carousels
- scroll detection
- IntersectionObserver
- ResizeObserver
- requestAnimationFrame loops

---

## GSAP

Use GSAP only for:

- hero animations
- timeline animations
- complex sequences
- parallax
- cursor effects
- SVG animation
- morphing
- text reveal
- synchronized animations
- ScrollTrigger animations

---

## Motion One

Use Motion One for:

- simple timeline animations
- fade in
- slide in
- stagger
- small component animations

Do not use Motion One for complex scroll scenes.

---

# Step 3 — Performance

Animations must:

- use transform instead of top/left
- animate opacity whenever possible
- avoid layout thrashing
- avoid unnecessary repainting
- use requestAnimationFrame when needed
- lazy initialize scroll animations
- use IntersectionObserver instead of scroll listeners whenever possible

---

# Step 4 — Preserve the Design

Do NOT redesign anything.

Do NOT simplify animations.

Do NOT remove animations because they seem unnecessary.

Do NOT replace animations with different ones.

Your goal is to recreate the original Claude Design preview as accurately as possible.

---

# Step 5 — Preserve Existing Code

Do not modify:

- HTML structure
- CSS architecture
- class names
- responsive breakpoints
- spacing
- typography
- layout

Only add the minimum amount of code necessary to restore the intended behavior.

---

# Step 6 — Deliverables

Return:

1. Updated HTML (only if required)
2. Updated CSS
3. Updated JavaScript
4. List of restored animations
5. Short explanation for every added library (if any)

---

# Quality Checklist

Before finishing, verify:

✓ All original interactions work.

✓ Hover effects work.

✓ Scroll animations work.

✓ Timeline animations work.

✓ Mobile animations work.

✓ No React remains.

✓ No framework remains.

✓ No broken animations.

✓ No console errors.

✓ Animations remain smooth (60 FPS where possible).

✓ The visual result matches the Claude Design preview as closely as possible.