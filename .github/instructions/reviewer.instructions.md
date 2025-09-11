---
applyTo: "**/*.{ts,html,scss,css,md}"
---

# Reviewer Instructions – Angular 17 + PrimeNG 17

## Mission

Produce a **clear, actionable** review that:

- Confirms whether the source **matches the original design/spec**.
- Confirms compliance with **Angular 17 + PrimeNG 17** conventions set by the project.
- Outputs a **Markdown report** into `docs/reviews/` using the naming convention below.

## Naming Convention for Review Reports

- Folder: `docs/reviews/`
- File name format: `YYYY-MM-DD__<taskSlug>__v<major.minor>.md`
- `YYYY-MM-DD` = review date (local, Asia/Ho_Chi_Minh)
- `<taskSlug>` = short kebab-case identifier of the task (e.g., `idle-list-resource`, `login-screen`)
- `v<major.minor>` = review version (start at `v1.0`, then `v1.1`, `v2.0`, …)

**Examples**

- `docs/reviews/2025-08-26__idle-list-resource__v1.0.md`
- `docs/reviews/2025-08-26__login-screen__v1.1.md`

## What to Check

### A) Design/Spec Parity (from `docs\analyzer\<screen>.md`)

- **Layout & Components**: PrimeNG components, props, states, and placement match spec.
- **Data Models**: Interfaces/types align with spec (names, fields, types).
- **Interactions & Validations**: Events, navigation, and validation rules implemented as described.
- **A11y & Responsiveness**: Labels/ARIA, keyboard flow, breakpoints, pagination placement, etc.

### B) Angular/PrimeNG Conventions (from project standards)

- **Architecture**: Feature NgModules, lazy loading, DI via constructors.
- **Naming & Structure**:
- Services files: `feature.service.ts` (e.g., `auth.service.ts`)
- Components files: **camelCase** (`userProfile.component.ts|html|scss`)
- Classes/Interfaces: **PascalCase**
- Folders: prefer lowercase-with-dashes for URLs/paths; `features/<featureName>/...`
- **TypeScript**: `strict` mode, strong typing, no `any`, clear interfaces/models.
- **HTTP & RxJS**: HttpClient typed responses, interceptors, `catchError`, `shareReplay` when caching, unsubscribe via `AsyncPipe` or `takeUntil`.
- **Templates**: declarative, minimal logic, `trackBy` in `*ngFor`, consistent datatable/pagination pattern.
- **Styling & Theme**: SCSS, PrimeNG theming, a11y.

> Reference: [Angular Instructions](../instructions/builder.instructions.md)

## Output Format (Markdown)

Create a report with the following sections:

1. **Header**

- Task: `<taskSlug>`
- Date: `YYYY-MM-DD`
- Reviewer: `<name or bot>`
- Source root reviewed: `<path>`
- Spec: `<path>`

2. **Summary**

- 2–4 bullet points summarizing overall status and risk level.

3. **Parity Checklist (PASS/FAIL)**

- Layout & Components: PASS/FAIL
- Data Models: PASS/FAIL
- Interactions & Validations: PASS/FAIL
- A11y & Responsiveness: PASS/FAIL

4. **Conventions Checklist (PASS/FAIL)**

- Architecture & Modules: PASS/FAIL
- Naming & Structure: PASS/FAIL
- TypeScript & Typing: PASS/FAIL
- HTTP & RxJS: PASS/FAIL
- Templates (trackBy, minimal logic): PASS/FAIL
- Styling & Theme & A11y: PASS/FAIL
- Testing Basics: PASS/FAIL

5. **Findings & Fixes**

- For each issue:
  - **ID**: `ISSUE-001`
  - **Category**: Parity / Conventions
  - **File:Line**: `src/app/features/...`
  - **Observation**: what’s wrong
  - **Why it matters**: impact
  - **Fix (suggested)**: concrete remediation (snippet allowed if necessary)
  - **Reference**: link to Angular v12 or project doc

6. **Parity Matrix (Spec → Impl)**

- Table mapping spec components/flows to implementation files/lines with status.

7. **Decision Log (Optional)**

- Any deliberate deviations agreed by the team (with rationale).

8. **Verdict**

- ✅ Ready / 🟡 Minor fixes / 🔴 Blocked
- Next actions & owners

## Style

Professional, concise, constructive. Explain **why**, provide **actionable** fixes, and include references.
