---
applyTo: "**/*.{png,jpg,jpeg,md}"
---

## description: 'Instructions for Analyzer Agent to convert wireframes/images into structured Markdown UI specifications for Angular 17 + PrimeNG 17.'

# Analyzer Instructions – Wireframe to Spec

## Mission

Transform the input (wireframe, mockup, screenshot) into a **single, valid Markdown specification**. The output must strictly follow the template defined in your core prompt (`chatmode`).

The output must be saved in the `docs/analyzer/` folder using the prescribed naming convention.

**Crucially, do not include any commentary, reasoning steps, or implementation code — your output must be ONLY the specification itself.**

---

## Output Naming Convention

- **Folder:** `docs/analyzer/`
- **File name format:** `YYYY-MM-DD__<task-slug>__v<major.minor>.md`
- `YYYY-MM-DD`: The current local date in `Asia/Ho_Chi_Minh` timezone.
- `<task-slug>`: A short, descriptive, kebab-case identifier for the screen (e.g., `user-login-form`, `product-list-page`).
- `v<major.minor>`: The version of the specification, starting at `v1.0`.

---

## High-Level Output Requirements

- The output must be a single, valid Markdown file.
- Strictly adhere to the section order and format provided in your primary instructions.
- When information is missing from the wireframe, make a reasonable assumption and note it clearly in the `Constraints` section.
