# Screen Specification - Member Manager Enhanced

## Overview

The Member Manager screen is a comprehensive employee management interface that allows HR personnel and managers to view, filter, and manage employee records. The screen displays employee information in a tabular format with filtering capabilities, search functionality, and action buttons for employee lifecycle management. This screen serves as the primary interface for employee data management and integrates with transfer management workflows.

## Layout Structure

- **Header Section**
  - Tab navigation (Member Manager, Transfer Manager)
  - Global search input field
  - Filter dropdown (All Type)
- **Main Content Area**
  - Data table with employee records
  - Pagination controls (if needed)
  - Action buttons per row
- **Layout Components**
  - p-tabView for navigation tabs
  - p-table for data display
  - p-inputText for search
  - p-dropdown for filtering
  - p-button for actions

## UI Components

- **TabNavigation** (p-tabView)
  - activeIndex: number, default 0
  - Tabs: ["Member Manager", "Transfer Manager"]
  - Binding: activeTabIndex → component.selectedTab

- **SearchInput** (p-inputText)
  - placeholder: "Search employees..."
  - value: string
  - Binding: searchTerm → component.searchTerm
  - Icon: search icon (pi pi-search)

- **TypeFilter** (p-dropdown)
  - options: ["All Type", "Active", "Onboarding", "Inactive"]
  - placeholder: "All Type"
  - Binding: selectedType → component.filterType

- **EmployeeTable** (p-table)
  - columns: Employee, Working Status, Current Dept, Transfer To, New Customer, New Contract, New Workplace, Change Type, Status, Action
  - selectionMode: none
  - responsiveLayout: scroll
  - Binding: employees → component.employees
  - trackBy: employee.id

- **StatusBadge** (p-tag)
  - severity: success (Active), warning (Onboarding), danger (Inactive)
  - value: status text

- **ActionButtons** (p-button)
  - Confirm button: severity="success", size="small"
  - Reject button: severity="danger", size="small"
  - Edit button: severity="secondary", size="small"

## Data Models

- **Employee**
  - id: string, required
  - name: string, required
  - workingStatus: 'Active' | 'Onboarding' | 'Inactive', required
  - currentDept: string, required
  - transferTo: string, optional
  - newCustomer: string, optional
  - newContract: string, optional
  - newWorkplace: string, optional
  - changeType: 'IN' | 'OUT', optional
  - status: 'Confirm' | 'Reject', required
  - canEdit: boolean, default true

- **FilterOptions**
  - label: string
  - value: string

- **TabItem**
  - label: string
  - routerLink: string

## Events & Interactions

- **Search Input → onSearch()**
  - Filters employee list based on name, department, or other searchable fields
  - Debounced input with 300ms delay
  - Clear search resets to full list

- **Type Filter → onFilterChange()**
  - Filters employees by working status
  - "All Type" shows all employees
  - Other options filter by specific status

- **Tab Navigation → onTabChange()**
  - Switches between Member Manager and Transfer Manager views
  - Updates route navigation
  - Preserves search and filter state

- **Action Buttons**
  - Confirm → onConfirmEmployee(employee): Updates employee status
  - Reject → onRejectEmployee(employee): Updates employee status with rejection
  - Edit → onEditEmployee(employee): Navigates to edit form or opens modal

- **Table Sorting**
  - Click column headers to sort
  - Multi-column sorting support
  - Default sort by employee name ascending

## Constraints

- **Responsive Design**
  - Table scrolls horizontally on mobile devices
  - Search and filter controls stack vertically on small screens
  - Action buttons may collapse to dropdown menu on narrow screens

- **Accessibility**
  - All form controls have proper labels
  - Table has appropriate ARIA attributes
  - Keyboard navigation support for all interactive elements
  - Screen reader compatible status indicators

- **Performance**
  - Pagination for large datasets (>100 employees)
  - Virtual scrolling for very large lists
  - Lazy loading of employee data

- **Data Validation**
  - Employee names are required and non-empty
  - Department codes follow company standards
  - Status changes require appropriate permissions

- **Design Consistency**
  - Follows PrimeNG theme conventions
  - Consistent button styling and colors
  - Standard spacing and typography
  - Status badges use semantic colors

- **Assumptions**
  - Employee data comes from REST API
  - User has appropriate permissions for actions
  - Tab navigation integrates with Angular router
  - Change type indicators (IN/OUT) represent transfer direction
