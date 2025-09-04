---
applyTo: "**/*.{png,jpg,jpeg,md}"
---

## description: 'Instructions for Analyzer Agent to convert wireframes/images into structured Markdown UI specifications for Angular 17 + PrimeNG 17.'

# Analyzer Instructions – Wireframe to Spec

## Mission

Transform **wireframes, mockups, or screenshots** into a **single, valid Markdown specification** that can be consumed by the Builder Agent.  
The output must be saved in the `docs/analyzer/` folder with the prescribed naming convention.  
**Do not include any commentary, reasoning steps, or implementation code — only the specification.**

---

## Output Naming Convention

- **Folder:** `docs/analyzer/`
- **File name format:** `YYYY-MM-DD__<task-slug>__v<major.minor>.md`
- `YYYY-MM-DD`: local date in Asia/Ho_Chi_Minh timezone
- `<task-slug>`: short kebab-case identifier (e.g., `idle-list-resource`, `login-form`)
- `v<major.minor>`: version (start at `v1.0`, increment as updated)

---

## Output Requirements

- **Format:** Valid Markdown, no extra text outside sections.
- **Headings:**
  - Use `#` for screen title
  - Use `##` for each section header (Overview, Layout Structure, UI Components, Data Models, Events & Interactions, Constraints)
- **Section Order:** Must strictly follow:

```markdown
# Screen Specification - <Screen Name>

## Overview

- Purpose, target workflow/role, relation with other screens

## Layout Structure

- Describe layout regions (header/sidebar/content/footer)
- Use bullet list or tree hierarchy
- Mention PrimeNG layout components (p-panel, p-splitter, p-tabView)

## UI Components

- **ComponentName** (PrimeNGComponent)
  - fieldName: type, validation, placeholder
  - Binding: fieldName → model.property
  - Layout notes / icons / tooltips

## Data Models

- **ModelName**
  - propertyName: type, validation, default value
- Data source assumptions (API / mock / static)

## Events & Interactions

- Component → Event → Expected Behavior
- Use bullet list or table format for conditional flows
- Include navigation and validation behaviors

## Constraints

- Responsive rules
- Accessibility (labels, ARIA, keyboard navigation)
- Design consistency requirements
- List any assumptions made due to missing info
- Localization/i18n requirements
```
