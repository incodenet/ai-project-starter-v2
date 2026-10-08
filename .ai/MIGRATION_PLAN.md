Phase 0 — Context

Read:
- .claude/claude-instructions.md
- .ai/CODEBASE.md
- .ai/ARCHITECTURE.md
- .ai/FRONTEND.md
- .ai/DESIGN_IMPORT_RULES.md
- .ai/BACKEND.md only when PHP behavior is relevant

Phase 1 — Discovery

- identify raw source;
- resolve destination template;
- inspect build entries;
- inspect layout shell;
- inspect existing shared components;
- inspect existing SCSS/JS;
- inventory page assets, breakpoints, animations and interactions.

Phase 2 — Migration Map

For each concern:
- reuse;
- extend;
- create;
- preserve locally;
- report for later PHP decomposition.

Phase 3 — Markup Migration

- extract body only;
- preserve DOM conservatively;
- improve semantics safely;
- no PHP logic;
- no partial extraction in this phase.

Phase 4 — Style Migration

- extract CSS;
- preserve exact breakpoints;
- reuse tokens/components;
- page styles to correct source entry;
- do not touch generated CSS manually.

Phase 5 — Behavior Migration

- extract scripts;
- preserve initialization order;
- reuse dependencies/modules;
- keep page-specific code out of global entry where possible.

Phase 6 — Asset Migration

- copy and resolve assets;
- update markup and SCSS URLs;
- report unresolved references.

Phase 7 — Validation

- build;
- console;
- network assets;
- interactions;
- accessibility;
- responsive comparison;
- visual baseline comparison.

Phase 8 — Report

- created/modified files;
- reused components;
- deviations;
- unverified items;
- future PHP component candidates;
- remaining technical debt.