# Screen Specification - Member Manager

## Overview

- Purpose: Manage employee membership status, including updates, onboarding, and transfers across different departments and workplaces
- Target workflow/role: HR staff or managers overseeing employee assignments, status changes, and transfer requests
- Relation: Linked to transfer management screens and other HR resource management modules

## Layout Structure

- Header navigation: Tab navigation with two main sections (`Member Manager`, `Transfer Manager`)
- Search and filter section:
  - Horizontal search input field (full width)
  - Department filter dropdown positioned on the right
- Status summary cards: Four horizontal status cards displaying counts (`Update`, `IN`, `OUT`, `Total`)
- Action buttons section: Two action buttons (`Bulk Update`, `Request Employees`)
- Main data table: Employee list with multi-select checkboxes and action columns
  - Uses PrimeNG `p-table` with pagination and sorting capabilities
- Layout uses PrimeNG `p-panel` for sections and responsive grid system

## UI Components

- **TabView** (PrimeNG p-tabView)
  - tabs: ['Member Manager', 'Transfer Manager']
  - activeIndex: 0 (Member Manager selected)
  - Layout: Full width header navigation

- **SearchInput** (PrimeNG p-inputText)
  - fieldName: searchQuery
  - type: string
  - placeholder: "Search employees..."
  - Binding: searchQuery → model.searchQuery
  - Layout: Full width with search icon

- **DepartmentDropdown** (PrimeNG p-dropdown)
  - fieldName: selectedDepartment
  - type: string
  - options: departmentList
  - placeholder: "All Dept"
  - Binding: selectedDepartment → model.selectedDepartment
  - Layout: Right-aligned, fixed width

- **StatusCards** (Custom components using PrimeNG p-card)
  - Update card: Count with blue background
  - IN card: Count with yellow/amber background  
  - OUT card: Count with red/pink background
  - Total card: Count with neutral background
  - Layout: Four equal-width cards in horizontal row

- **ActionButtons** (PrimeNG p-button)
  - Bulk Update: Primary button style
  - Request Employees: Secondary button style
  - Layout: Left-aligned, inline buttons

- **EmployeeTable** (PrimeNG p-table)
  - Selection: Multi-select with checkboxes
  - Columns:
    - Checkbox: selection column
    - Employee: string (name display)
    - Dept: string (department code)
    - Working Status: string (Active, Onboarding, etc.)
    - Customer: string (client assignment)
    - Customer Contract: string (contract details)
    - Workplace: string (location)
    - Change Type: string with colored badges (Update/IN/OUT)
    - Action: Icon buttons (Edit, View)
  - Binding: employees → model.employees
  - Selection binding: selectedEmployees → model.selectedEmployees
  - Action icons: Edit (`pi pi-pencil`), View (`pi pi-eye`)
  - Pagination: Enabled with page size controls

## Data Models

- **Employee**
  - id: string (unique identifier)
  - name: string (full name)
  - dept: string (department code like 'FJP HR')
  - workingStatus: 'Active' | 'Onboarding' | 'Inactive'
  - customer: string (client name)
  - customerContract: string (contract identifier)
  - workplace: string (office location)
  - changeType: 'Update' | 'IN' | 'OUT'

- **Department**
  - code: string (department identifier)
  - name: string (full department name)

- **StatusSummary**
  - updateCount: number (employees with Update status)
  - inCount: number (employees with IN status)
  - outCount: number (employees with OUT status)
  - totalCount: number (total employees)

- **FilterOptions**
  - searchQuery: string
  - selectedDepartment: string | null
  - pageSize: number
  - currentPage: number

- Data source: REST API endpoints for employee data, department list, and status counts

## Events & Interactions

- **Search functionality**
  - Search input → keyup event → debounced filtering of employee table
  - Filters employees by name (case-insensitive partial match)

- **Department filtering**
  - Department dropdown → change event → filters table by selected department
  - "All Dept" option shows all employees regardless of department

- **Status card interactions**
  - Status cards → click → filters table to show only employees with that status
  - Visual feedback on active filter

- **Table interactions**
  - Row checkbox → change → updates selectedEmployees array
  - Select all checkbox → change → selects/deselects all visible employees
  - Edit icon → click → opens employee edit dialog/modal
  - View icon → click → opens employee detail view dialog/modal

- **Action buttons**
  - Bulk Update → click → validates selection and opens bulk update dialog
  - Request Employees → click → opens employee request form dialog

- **Tab navigation**
  - Tab click → change → switches between Member Manager and Transfer Manager views
  - Updates URL routing accordingly

- **Pagination**
  - Page navigation → change → loads new page of employee data
  - Page size change → updates table display and refetches data

## Constraints

- **Responsive design**
  - Table scrolls horizontally on small screens (min-width: 768px for full table view)
  - Status cards stack vertically on mobile devices
  - Search and filter controls stack on small screens
  - Action buttons may convert to dropdown menu on mobile

- **Accessibility**
  - All interactive elements have ARIA labels and keyboard navigation support
  - Table headers have sorting indicators and screen reader support
  - Color-coded status badges include text labels for accessibility
  - Focus management for dialogs and modals
  - High contrast mode support

- **Design consistency**
  - Uses consistent PrimeNG theme throughout
  - Color coding: Blue for updates, Yellow for IN, Red for OUT
  - Consistent iconography using PrimeIcons
  - Standardized spacing and typography

- **Performance constraints**
  - Table virtualization for large datasets (>1000 employees)
  - Debounced search to prevent excessive API calls
  - Lazy loading for pagination

- **Data assumptions**
  - Employee data is fetched from `/api/employees` endpoint
  - Department list is static or cached from `/api/departments`
  - Status counts are calculated server-side or derived from filtered data
  - Real-time updates not required (manual refresh acceptable)

- **Localization/i18n**
  - All labels, tooltips, and messages support internationalization
  - Date formatting respects user locale
  - Text direction (LTR/RTL) support for international deployment
  - Department names may require translation support
