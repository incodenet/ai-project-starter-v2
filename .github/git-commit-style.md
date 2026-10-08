# Git Commit Style Guide

This project follows **Conventional Commits 1.0.0**.

Reference: https://www.conventionalcommits.org/en/v1.0.0/

The goal is to keep Git history:

- readable for developers;
- easy to scan during code review;
- compatible with automated changelogs and release tooling;
- suitable for Semantic Versioning;
- consistent across the project.

---

## 1. Commit Message Format

Use the following structure:

```text
<type>[optional scope][optional !]: <description>

[optional body]

[optional footer(s)]
```

Examples:

```text
feat(auth): add OTP login
```

```text
fix(api): prevent duplicate requests
```

```text
refactor(session): simplify autosave flow
```

```text
feat(auth)!: replace password login with OTP

BREAKING CHANGE: password-based authentication is no longer supported.
```

---

## 2. Commit Types

Use lowercase commit types.

| Type | Use when |
| --- | --- |
| `feat` | Adding a new feature or user-visible capability |
| `fix` | Fixing a bug |
| `refactor` | Changing code structure without changing behavior |
| `perf` | Improving performance |
| `docs` | Documentation-only changes |
| `style` | Formatting, whitespace, lint fixes, etc. without logic changes |
| `test` | Adding or updating tests |
| `build` | Build system, bundler, dependencies, package configuration |
| `ci` | CI/CD configuration or scripts |
| `chore` | Maintenance work that does not fit another type |
| `revert` | Reverting a previous commit |

### `feat`

Use for new functionality.

```text
feat(calendar): add weekly schedule view
```

```text
feat(client): allow exporting client data
```

### `fix`

Use for bug fixes.

```text
fix(auth): prevent OTP form from submitting twice
```

```text
fix(ssr): avoid duplicate homepage API request
```

### `refactor`

Use when restructuring existing code without intentionally changing functionality.

```text
refactor(auth): move token handling to auth service
```

### `perf`

Use for measurable or intentional performance improvements.

```text
perf(homepage): cache product configuration during SSR
```

### `docs`

Use for documentation only.

```text
docs(readme): add local setup instructions
```

### `style`

Use for code-style-only changes.

Do not use `style` for CSS/UI feature changes.

```text
style(auth): apply prettier formatting
```

### `test`

```text
test(session): add autosave service unit tests
```

### `build`

Use for package dependencies, build configuration, bundlers, Docker build changes, etc.

```text
build: upgrade Angular to version 20
```

```text
build(docker): update Node base image
```

### `ci`

```text
ci: add production deployment workflow
```

### `chore`

Use sparingly for maintenance that does not fit a more precise type.

```text
chore: remove unused development files
```

### `revert`

```text
revert: remove experimental session autosave

Refs: a1b2c3d
```

---

## 3. Scope

A scope is optional and identifies the affected area of the codebase.

Format:

```text
type(scope): description
```

Good scopes are short nouns representing a module, feature, page, service, or technical area.

Examples:

```text
feat(auth): add resend OTP action
fix(calendar): correct timezone conversion
refactor(api): centralize error handling
perf(ssr): cache navigation response
docs(api): document authentication endpoints
```

Recommended project scopes may include:

```text
auth
api
client
session
calendar
dashboard
statistics
payments
settings
tools
ui
forms
router
ssr
seo
docker
db
deps
ci
```

Avoid overly broad or meaningless scopes:

```text
fix(app): ...
chore(stuff): ...
refactor(code): ...
```

Use no scope when the change affects the whole project:

```text
build: upgrade TypeScript
```

---

## 4. Description Rules

The description is the short summary after the colon.

```text
feat(auth): add OTP verification
```

### Recommended rules

- write in English;
- use lowercase after the colon;
- use the imperative style;
- keep it concise;
- describe what changed, not what you did;
- do not end with a period;
- avoid vague descriptions.

Good:

```text
fix(calendar): prevent duplicate session rendering
feat(settings): add notification preferences
refactor(api): extract request retry logic
```

Avoid:

```text
fix: fixed bug
update code
changes
some fixes
feat: added new feature.
WIP
```

Prefer:

```text
fix(auth): prevent expired OTP submission
```

instead of:

```text
fix(auth): fixed OTP issue
```

---

## 5. Imperative Style

Write the description as if completing this sentence:

> This commit will ...

Examples:

```text
feat(client): add archive action
fix(form): prevent invalid phone submission
refactor(auth): simplify token refresh logic
```

Avoid past tense:

```text
feat(client): added archive action
fix(form): fixed phone validation
```

---

## 6. Commit Body

The body is optional.

Use it when the short description is not enough to explain:

- why the change was necessary;
- important implementation decisions;
- behavior before and after;
- non-obvious trade-offs;
- migration details.

Leave one blank line between the description and body.

Example:

```text
fix(session): prevent autosave requests from overlapping

Queue field updates until the previous PATCH request completes.
This prevents older responses from overwriting newer values.
```

Do not use the body to repeat the title.

---

## 7. Footers

Footers are optional and appear after a blank line following the body.

Common examples:

```text
Refs: #123
```

```text
Closes: #123
```

```text
Reviewed-by: John Doe
```

Example:

```text
fix(auth): reject expired verification codes

Validate the OTP expiration timestamp before authentication.

Closes: #418
```

Footer tokens containing multiple words should use `-`:

```text
Reviewed-by: John Doe
Signed-off-by: Jane Doe
```

`BREAKING CHANGE` is the notable exception and may contain a space.

---

## 8. Breaking Changes

A breaking change modifies public behavior or an API in an incompatible way.

There are two supported forms.

### Option A — `!`

```text
feat(api)!: change session response structure
```

### Option B — `BREAKING CHANGE` footer

```text
feat(api): change session response structure

BREAKING CHANGE: session endpoints now return `data` instead of `result`.
```

Both may be used together:

```text
feat(api)!: replace legacy session response

BREAKING CHANGE: consumers must read session data from the `data` property.
```

Breaking changes can use **any commit type**.

```text
refactor(api)!: remove deprecated endpoint
```

---

## 9. Semantic Versioning Mapping

When automated release tooling is used:

| Commit | Typical SemVer effect |
| --- | --- |
| `fix` | PATCH: `1.2.0 -> 1.2.1` |
| `feat` | MINOR: `1.2.0 -> 1.3.0` |
| `BREAKING CHANGE` | MAJOR: `1.2.0 -> 2.0.0` |

Other types normally do not imply a release level unless project tooling explicitly configures them.

---

## 10. One Logical Change Per Commit

Each commit should represent one logical change whenever practical.

Good history:

```text
feat(auth): add OTP resend endpoint
feat(auth): add resend button
test(auth): add OTP resend tests
```

Avoid combining unrelated work:

```text
feat: add OTP resend, change dashboard styles, fix calendar bug
```

If a commit naturally fits multiple unrelated types, consider splitting it into multiple commits.

---

## 11. Examples

### Feature

```text
feat(settings): add language preference
```

### Bug fix

```text
fix(calendar): correct session end time
```

### Refactor

```text
refactor(session): extract autosave service
```

### Performance

```text
perf(ssr): reuse transferred homepage state
```

### Documentation

```text
docs: add commit message conventions
```

### Dependency update

```text
build(deps): update rxjs to latest compatible version
```

### CI

```text
ci: run tests before production build
```

### UI change

If the UI change adds or changes functionality:

```text
feat(settings): add account preferences panel
```

If it only fixes a visual defect:

```text
fix(settings): align action buttons on mobile
```

Do **not** automatically use `style` for UI/CSS work. `style` is intended for changes that do not alter application behavior, such as formatting or lint fixes.

### Breaking API change

```text
feat(api)!: require locale for homepage requests

BREAKING CHANGE: homepage requests without a locale are no longer accepted.
```

### Commit with issue reference

```text
fix(auth): prevent duplicate OTP requests

Disable the resend action while a verification request is in progress.

Closes: #231
```

### Revert

```text
revert: remove request caching experiment

Refs: 2f42ca1
```

---

## 12. Bad vs Good Commits

### Too vague

Bad:

```text
fix: bug fixes
```

Good:

```text
fix(auth): prevent login after expired OTP
```

### Missing type

Bad:

```text
update user settings
```

Good:

```text
feat(settings): add timezone preference
```

### Past tense

Bad:

```text
feat(calendar): added month view
```

Good:

```text
feat(calendar): add month view
```

### Too much information in subject

Bad:

```text
fix(auth): fix the issue where when the user clicks the resend button multiple requests are created and sometimes an old OTP remains active
```

Good:

```text
fix(auth): prevent duplicate OTP resend requests
```

Add implementation details in the body if necessary.

### Unrelated changes

Bad:

```text
feat: add settings page and fix calendar and upgrade dependencies
```

Prefer separate commits:

```text
feat(settings): add settings page
fix(calendar): correct session positioning
build(deps): update dependencies
```

---

## 13. Recommended Subject Length

There is no strict Conventional Commits limit, but for project consistency:

- target **50–72 characters** when practical;
- keep the first line easy to scan;
- move detailed explanations to the body.

Do not sacrifice clarity only to satisfy a character count.

---

## 14. Merge and Squash Commits

When using squash merging, the final squash commit should follow this convention even if individual development commits do not.

Example PR title / squash commit:

```text
feat(calendar): add recurring sessions
```

This keeps the main branch history clean and allows release tooling to understand changes.

---

## 15. Suggested Git Workflow

Before committing:

```bash
git status
git diff
git add <files>
git commit
```

Simple commit:

```bash
git commit -m "feat(settings): add notification preferences"
```

For commits with a body, prefer opening the Git editor:

```bash
git commit
```

Example:

```text
fix(session): prevent overlapping autosave requests

Wait for the active PATCH request to complete before sending
the next queued field update.

Refs: #342
```

---

## 16. Optional Commit Validation

For JavaScript/TypeScript projects, commit messages can be enforced with tools such as:

- `commitlint`
- `@commitlint/config-conventional`
- Husky
- CI validation

Example expected format:

```text
type(scope): description
```

A typical allowed type list:

```text
feat
fix
refactor
perf
docs
style
test
build
ci
chore
revert
```

The project's validation configuration should be treated as the final authority if it defines stricter rules.

---

## 17. Quick Reference

### Standard

```text
type(scope): description
```

### Feature

```text
feat(auth): add OTP verification
```

### Fix

```text
fix(api): handle empty response
```

### Refactor

```text
refactor(forms): extract validation helpers
```

### Breaking change

```text
feat(api)!: change authentication response
```

### With body

```text
fix(calendar): prevent duplicated sessions

Ignore duplicated records returned during calendar refresh.
```

### With footer

```text
fix(auth): prevent expired OTP login

Closes: #123
```

### Full example

```text
feat(session)!: replace legacy session status values

Use the new normalized status model across the session API and UI.

BREAKING CHANGE: `pending` and `done` are replaced by
`scheduled` and `completed`.

Refs: #524
```

---

## 18. Final Checklist

Before committing, check:

- [ ] Commit starts with a valid type.
- [ ] Scope is included when it adds useful context.
- [ ] Description is concise and specific.
- [ ] Description uses imperative wording.
- [ ] Description does not end with a period.
- [ ] Commit contains one logical change.
- [ ] A body explains non-obvious decisions when necessary.
- [ ] Breaking changes use `!` and/or `BREAKING CHANGE:`.
- [ ] Related issue/task is referenced when applicable.
- [ ] No temporary messages such as `WIP`, `changes`, or `fix stuff` remain.

---

## Recommended Default

For most commits, use:

```text
<type>(<scope>): <imperative description>
```

For example:

```text
feat(settings): add account preferences
fix(auth): prevent duplicate OTP requests
refactor(api): centralize error handling
perf(ssr): cache navigation response
docs(readme): document local setup
```
