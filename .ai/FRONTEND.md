# HTML Guidelines

Always

- semantic HTML5
- accessible markup
- correct heading hierarchy
- proper labels
- alt attributes
- ARIA only when necessary

Avoid

- div soup
- unnecessary wrappers
- inline styles
- inline scripts

Use

header

main

section

article

aside

footer

nav

button instead of clickable div

Prefer data-attributes instead of JavaScript classes.

Use data attributes as stable JavaScript hooks.

Do not bind behavior to purely presentational class names.

Use state classes such as .is-open only when CSS needs a state selector,
and keep the corresponding ARIA state synchronized.

# SCSS Guidelines

Use SCSS only.
CSS extracted from raw HTML must be converted to valid SCSS and placed in
source files. Never edit generated files in assets/css directly.

Never write plain CSS files.

Component styles

src/scss/components

Page styles

src/scss/pages
For pages do not start filename with underscore.

Media styles

If there are global media styles, use divided files for it: by the media type move it into src/scss/mobile.scss or src/scss/tablet.scss, for pages create new file (e.g. src/scss/pages/page-name.mobile.scss)

Rules

- nesting max 3 levels
- avoid !important
- use variables
- use mixins
- atomic css naming

Never duplicate styles.

If styles are reusable,
move them into components.

NEVER use pt, pc, in, cm, ch, ex, mm points for CSS measurement units.

# JavaScript Guidelines

Use modern ES6+

Prefer

const or let

Use const by default. Use let only when reassignment is required.

Avoid var

Rules

- no jQuery
- no inline handlers
- no global variables
- modular functions
- early return

Use event delegation for repeated or dynamically inserted elements.
Use direct listeners for isolated stable elements.

Never

onclick

Use

addEventListener()

Store selectors once.

Separate logic from DOM manipulation.

# Animations Accessibility

Preserve the approved animations by default.

Add a prefers-reduced-motion fallback when animation is non-essential or may
cause discomfort. Do not remove functional state changes.

Ensure content remains visible and usable when animations are reduced.
