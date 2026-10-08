## Build Commands

- npm run build:css
- npm run build:js
- npm run build
- npm run serve

## SCSS Entry Points

- src/scss/main.scss → assets/css/main.css
- ...

## JavaScript Entry Points

- src/js/main.js → assets/js/main.js
- ...

## Template Rendering

Explain which PHP file renders templates/*.php and where the document shell lives.

## Page Asset Loading

Explain how a page requests page-specific CSS and JavaScript.

## Existing Shared UI

- header
- footer
- ...

## Validation

- build command;
- local URL;
- console-error requirement;
- relevant viewport widths.

# Project Overview

Stack

- HTML5
- SCSS
- Vanilla JavaScript
- PHP 8+

Build

sass
esbuild

SCSS

```
src/scss
    ↓
assets/css
```

JavaScript

```
src/js
    ↓
assets/js

```

Project folders

```
src/

    css/

    fonts/

    js/
        lib/(module).js
        shared/(module-for-page).js
        main.js

    scss/

        components/

        core/

        layouts/

        pages/

        utils/

        bottom.scss

        main.scss

        top.scss

```

raw/

```

assets/

```

templates/

Architecture

Each page should contain only markup.

Business logic belongs to Backend.

Behavior belongs to JavaScript.

Presentation belongs to SCSS.

Never mix responsibilities.

```

```
