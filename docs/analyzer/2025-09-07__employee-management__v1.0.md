# Screen Specification: Employee Management Dashboard

## 1. Overview

A comprehensive employee management interface that allows HR administrators to view, update, and manage employee information including their department assignments, working status, customer assignments, and workplace locations. The screen supports bulk operations and individual employee actions with real-time status tracking.

## 2. Layout Structure

- **Header** (Type: `p-toolbar`)
  - **TabContainer** (Type: `p-tabView`)
    - **MemberManagerTab** (Type: `p-tabPanel`)
    - **TransferManagerTab** (Type: `p-tabPanel`)
- **SearchAndFilterArea** (Type: `div.p-fluid.grid`)
  - **SearchBar** (Type: `div.col-9`)
  - **DepartmentFilter** (Type: `div.col-3`)
- **StatusCards** (Type: `div.p-fluid.grid`)
  - **UpdateCard** (Type: `div.col-3`)
  - **InCard** (Type: `div.col-3`)
  - **OutCard** (Type: `div.col-3`)
  - **TotalsCard** (Type: `div.col-3`)
- **ActionBar** (Type: `div.p-fluid.grid`)
  - **BulkUpdateButton** (Type: `div.col-6`)
  - **RequestEmployeesButton** (Type: `div.col-6`)
- **ContentArea** (Type: `div.p-fluid.grid`)
  - **EmployeeDataTable** (Type: `div.col-12`)

## 3. UI Component Hierarchy

- **TabView** (Type: `p-tabView`)
  - activeIndex: `0`
  - **TabPanel-MemberManager** (Type: `p-tabPanel`)
    - header: "Member Manager"
    - selected: `true`
  - **TabPanel-TransferManager** (Type: `p-tabPanel`)
    - header: "Transfer Manager"

- **SearchInput** (Type: `p-inputText`)
  - placeholder: "Search employees..."
  - binding: `EmployeeFilter.searchTerm`
  - notes: "Global search across employee data"

- **DepartmentDropdown** (Type: `p-dropdown`)
  - placeholder: "All Dept"
  - binding: `EmployeeFilter.department`
  - options: `departmentOptions`
  - notes: "Filter by department"

- **StatusCard-Update** (Type: `p-card`)
  - label: "Update"
  - value: `statusCounts.update`
  - styleClass: "status-card-update"

- **StatusCard-In** (Type: `p-card`)
  - label: "IN"
  - value: `statusCounts.in`
  - styleClass: "status-card-in"

- **StatusCard-Out** (Type: `p-card`)
  - label: "OUT"
  - value: `statusCounts.out`
  - styleClass: "status-card-out"

- **StatusCard-Totals** (Type: `p-card`)
  - label: "Totals"
  - value: `statusCounts.total`
  - styleClass: "status-card-totals"

- **BulkUpdateButton** (Type: `p-button`)
  - label: "Bulk Update"
  - severity: "primary"
  - binding: `onBulkUpdate()`

- **RequestEmployeesButton** (Type: `p-button`)
  - label: "Request Employees"
  - severity: "secondary"
  - binding: `onRequestEmployees()`

- **EmployeeTable** (Type: `p-table`)
  - value: `employees`
  - paginator: `true`
  - rows: `10`
  - selection: `selectedEmployees`
  - dataKey: "id"
  - **SelectAllCheckbox** (Type: `p-tableHeaderCheckbox`)
  - **EmployeeColumn** (Type: `p-column`)
    - field: "name"
    - header: "Employee"
  - **DeptColumn** (Type: `p-column`)
    - field: "department"
    - header: "Dept"
  - **WorkingStatusColumn** (Type: `p-column`)
    - field: "workingStatus"
    - header: "Working Status"
  - **CustomerColumn** (Type: `p-column`)
    - field: "customer"
    - header: "Customer"
  - **CustomerContractColumn** (Type: `p-column`)
    - field: "customerContract"
    - header: "Customer Contract"
  - **WorkplaceColumn** (Type: `p-column`)
    - field: "workplace"
    - header: "Workplace"
  - **ChangeTypeColumn** (Type: `p-column`)
    - field: "changeType"
    - header: "Change Type"
  - **ActionColumn** (Type: `p-column`)
    - header: "Action"
    - **EditButton** (Type: `p-button`)
      - icon: "pi pi-pencil"
      - severity: "info"
      - binding: `onEditEmployee(employee)`
    - **DeleteButton** (Type: `p-button`)
      - icon: "pi pi-trash"
      - severity: "danger"
      - binding: `onDeleteEmployee(employee)`

## 4. Data Models

- **Employee**
  - id: `string` (validation: `required`)
  - name: `string` (validation: `required`, default: `""`)
  - department: `string` (validation: `required`, default: `""`)
  - workingStatus: `WorkingStatus` (validation: `required`, default: `"Active"`)
  - customer: `string` (validation: `required`, default: `""`)
  - customerContract: `string` (validation: `required`, default: `""`)
  - workplace: `string` (validation: `required`, default: `""`)
  - changeType: `ChangeType` (validation: `required`, default: `"Update"`)
  - _Assumed Data Source_: `API GET /api/v1/employees`

- **EmployeeFilter**
  - searchTerm: `string` (default: `""`)
  - department: `string` (default: `"All Dept"`)
  - _Assumed Data Source_: `Local component state`

- **StatusCounts**
  - update: `number` (default: `0`)
  - in: `number` (default: `0`)
  - out: `number` (default: `0`)
  - total: `number` (default: `0`)
  - _Assumed Data Source_: `Computed from employees array`

- **WorkingStatus** (Enum)
  - Active
  - Onboarding
  - Inactive

- **ChangeType** (Enum)
  - Update
  - IN
  - OUT

## 5. Screen State

- isLoading: `boolean` (default: `false`)
- errorMessage: `string` (default: `null`)
- employees: `Employee[]` (default: `[]`)
- selectedEmployees: `Employee[]` (default: `[]`)
- filteredEmployees: `Employee[]` (default: `[]`)
- statusCounts: `StatusCounts` (default: `{update: 0, in: 0, out: 0, total: 0}`)
- departmentOptions: `SelectItem[]` (default: `[]`)

## 6. Events & Interactions

- **[SearchInput]** -> `on(input)` -> "Filter employees array based on search term across all employee fields. Update filteredEmployees and recalculate statusCounts."

- **[DepartmentDropdown]** -> `on(change)` -> "Filter employees by selected department. Update filteredEmployees and recalculate statusCounts."

- **[BulkUpdateButton]** -> `on(click)` -> "Open bulk update dialog for selectedEmployees. Validate selection is not empty. On confirmation, call `employeeService.bulkUpdate(selectedEmployees)` and refresh data."

- **[RequestEmployeesButton]** -> `on(click)` -> "Navigate to employee request form or open request dialog. Call `employeeService.requestEmployees()` and show success message."

- **[EmployeeTable]** -> `on(selectionChange)` -> "Update selectedEmployees array. Enable/disable bulk action buttons based on selection."

- **[EditButton]** -> `on(click)` -> "Navigate to employee edit form with employee.id parameter. Route to '/employees/edit/:id'."

- **[DeleteButton]** -> `on(click)` -> "Show confirmation dialog. On confirmation, call `employeeService.deleteEmployee(employee.id)` and refresh employee list."

- **[TabView]** -> `on(activeIndexChange)` -> "Switch between Member Manager and Transfer Manager views. Load appropriate data for selected tab."

## 7. Constraints & Assumptions

- **Responsiveness**: "Table should be horizontally scrollable on mobile devices. Status cards should stack vertically on screens smaller than 768px."
- **Accessibility**: "All form inputs must have associated labels. Table headers must be properly marked. Action buttons must have ARIA labels."
- **Localization**: "All static text (headers, labels, buttons) must be sourced from i18n files."
- **Assumptions Made**: 
  - "Employee data is fetched from a REST API with pagination support"
  - "Bulk operations require confirmation dialogs"
  - "Status counts are calculated client-side from the filtered employee list"
  - "Department filter options are loaded from a separate API endpoint"
  - "Edit and delete operations require appropriate user permissions"
  - "Change type colors: Update (blue), IN (yellow), OUT (red)"
