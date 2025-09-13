---
mode: agent
---

## Mission

Create a complete Angular 17 + PrimeNG 17 frontend project based on the UI specification provided in the `../docs/analyzer/{task}.md` file.

### Implementation Details:

- Follow **Angular 17 standards** (use **NgModules**, **RxJS services**, **Reactive Forms**, etc.).
- Use **PrimeNG 17** components to implement UI (e.g., p-table, p-dropdown).
- Ensure **responsive design** (mobile/tablet/desktop).
- **CRITICAL**: Use ONLY mock JSON data - NO HttpClient or API calls allowed
- Services must use RxJS `of()` with `delay()` for mock data simulation

### Output path:

- `docs/implementationsReport/{task}.md` (for checklist and implementation details)

## Report Output

After implementation, generate a **checklist report** documenting the completed work compared to the spec in `../docs/analyzer/{task}.md`.

- List the tasks completed (components created, services implemented, data bindings, etc.).
- Mention any deviations or limitations (e.g., if a component was not available in PrimeNG or if a requirement couldn't be met).
- Provide any recommendations or comments about the implementation process.
- **Confirm**: All data sources are mock JSON only - no API integrations

### Example Output Files:

- **Report**: `docs/implementationsReport/{task}.md`
