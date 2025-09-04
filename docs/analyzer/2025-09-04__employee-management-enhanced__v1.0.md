# Screen Specification - Employee Management Enhanced

## Overview

- Purpose: Advanced employee management interface for HR departments to view, filter, and manage employee data with status tracking and bulk operations
- Target workflow/role: HR managers, department heads, and administrators who need to monitor employee status, manage transfers, and perform bulk updates
- Relation with other screens: Central hub connecting to employee detail forms, transfer workflows, and reporting dashboards

## Layout Structure

- **Header Region**
  - Tab navigation (Member Manager, Transfer Manager)
  - Search bar with global employee search functionality
  - Department filter dropdown (All Dept selection)
- **Status Summary Cards** (p-card)
  - Update status card (blue) - shows count of pending updates
  - IN status card (yellow) - shows count of incoming employees  
  - OUT status card (red) - shows count of outgoing employees
  - Totals card (white) - shows total employee count
- **Action Bar**
  - Bulk Update button
  - Request Employees button
- **Main Content Area** (p-table)
  - Employee data table with pagination
  - Checkbox selection for bulk operations
  - Action columns with edit and view buttons

## UI Components

- **TabNavigation** (p-tabView)
  - activeIndex: number, default 0
  - tabs: ['Member Manager', 'Transfer Manager']
  - Layout: Horizontal tabs at top

- **SearchInput** (p-inputText)
  - placeholder: "Search employees..."
  - ngModel: searchTerm
  - Layout: Full width search bar with search icon

- **DepartmentFilter** (p-dropdown)
  - options: departments array
  - ngModel: selectedDepartment
  - placeholder: "All Dept"
  - Layout: Right-aligned dropdown

- **StatusCard** (p-card)
  - header: status name ('Update', 'IN', 'OUT', 'Totals')
  - content: status count
  - styleClass: conditional based on status type
  - Layout: 4 cards in horizontal row

- **BulkUpdateButton** (p-button)
  - label: "Bulk Update"
  - icon: "pi pi-refresh"
  - styleClass: "p-button-secondary"

- **RequestEmployeesButton** (p-button)
  - label: "Request Employees"
  - icon: "pi pi-plus"
  - styleClass: "p-button-primary"

- **EmployeeTable** (p-table)
  - value: employees array
  - selection: selectedEmployees
  - selectionMode: "multiple"
  - paginator: true
  - rows: 10
  - columns: Employee, Dept, Working Status, Customer, Customer Contract, Workplace, Change Type, Action
  - Layout: Full width with checkbox selection column

- **ActionButtons** (p-button)
  - Edit button: icon "pi pi-pencil", styleClass "p-button-text"
  - View button: icon "pi pi-eye", styleClass "p-button-text"

## Data Models

- **Employee**
  - id: string, unique identifier
  - name: string, full employee name
  - department: string, department code (FJP HR)
  - workingStatus: 'Active' | 'Onboarding' | 'Inactive'
  - customer: string, assigned customer/client
  - customerContract: string, contract reference
  - workplace: string, work location
  - changeType: 'Update' | 'IN' | 'OUT' | null
  - isSelected: boolean, for bulk operations

- **Department**
  - code: string, department identifier
  - name: string, department display name
  - isActive: boolean, department status

- **StatusSummary**
  - updateCount: number, employees with pending updates
  - inCount: number, incoming employees
  - outCount: number, outgoing employees
  - totalCount: number, total active employees

## Events & Interactions

- **Search Input** → onInput → Filter employee list by name, department, or customer
- **Department Dropdown** → onSelectionChange → Filter employees by selected department
- **Tab Navigation** → onActiveIndexChange → Switch between Member Manager and Transfer Manager views
- **Status Cards** → onClick → Filter table to show only employees with matching status
- **Bulk Update Button** → onClick → Open bulk update dialog for selected employees
- **Request Employees Button** → onClick → Navigate to employee request form
- **Table Row Selection** → onSelectionChange → Update selectedEmployees array
- **Edit Action** → onClick → Navigate to employee edit form with employee.id
- **View Action** → onClick → Navigate to employee detail view with employee.id
- **Table Pagination** → onPage → Load next/previous page of employees

## Constraints

- Responsive design: Table should stack/scroll horizontally on mobile devices
- Accessibility: All interactive elements must have proper ARIA labels and keyboard navigation support
- Performance: Table should support virtual scrolling for large datasets (1000+ employees)
- Data validation: All employee data must be validated before display
- Security: Role-based access control for edit/view actions
- Localization: All text labels must support i18n for multiple languages
- Design consistency: Follow PrimeNG default theme with custom status card colors
- Assumptions: Employee data comes from REST API with pagination support
- Browser support: Modern browsers (Chrome 90+, Firefox 88+, Safari 14+)
