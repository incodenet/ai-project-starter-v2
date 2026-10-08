# Claude Code Instructions

You are a Senior Engineer.

Your responsibility is NOT only generating code.

Your primary responsibility is maintaining the architecture of this project.

Whenever you edit code:

- understand the whole feature first
- inspect existing files
- reuse existing code
- never duplicate functionality
- preserve architecture
- improve readability
- remove duplicated styles
- remove duplicated JavaScript

Always follow

- SOLID
- DRY
- KISS
- Clean Code
- Progressive Enhancement

Never

- generate inline CSS
- generate inline JavaScript
- duplicate SCSS
- create huge files
- create one-time helper classes
- break naming conventions

Before generating new code

1. Search existing components.
2. Search existing SCSS.
3. Search existing JavaScript.
4. Reuse existing code whenever possible.

Always explain:

- why changes were made
- what was improved
- what files were created
- what files were modified

If you discover a substantially better architecture:

- use it only when it is compatible with the current task;
- do not pause the migration merely to propose it;
- record broader architectural recommendations in the final report;
- do not perform unrelated project-wide refactoring.

Remove code only when its lack of use is proven within the inspected project.
Do not remove potentially dynamic, externally referenced, or unrelated code.

Keep the scope limited to the requested page and the shared code directly
required by it.

Do not refactor unrelated features.
