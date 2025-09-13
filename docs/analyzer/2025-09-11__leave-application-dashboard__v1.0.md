# Screen Specification: Leave Application Dashboard

## 1. Overview

A comprehensive leave management dashboard that allows employees to view their available leave balances, apply for different types of leave, and track their leave history. The screen serves as the primary interface for leave-related activities, displaying leave entitlements in an easily digestible card format and providing a detailed history table for tracking past applications.

## 2. Layout Structure

- **Header** (Type: `p-toolbar`)
  - **Title Section** (Type: `div`)
    - Leave Application title with icon
- **ContentArea** (Type: `div.p-fluid.grid`)
  - **LeaveCards Section** (Type: `div.col-12`)
    - **CardsContainer** (Type: `div.grid`)
      - **AnnualLeaveCard** (Type: `div.col-3`)
      - **SickLeaveCard** (Type: `div.col-3`)
      - **MaternityLeaveCard** (Type: `div.col-3`)
      - **AdditionalLeaveCard** (Type: `div.col-3`)
  - **HistorySection** (Type: `div.col-12`)
    - **SectionHeader** (Type: `div.flex justify-content-between`)
    - **HistoryTable** (Type: `p-table`)

## 3. UI Component Hierarchy

- **LeaveApplicationHeader** (Type: `div`)

  - icon: "pi pi-calendar"
  - label: "Leave Application"
  - notes: "Main header with calendar icon"

- **LeaveBalanceCard** (Type: `p-card`)

  - availableDays: `number`
  - leaveType: `string`
  - backgroundColor: `string` (blue theme variations)
  - binding: `LeaveBalance.availableDays`, `LeaveBalance.leaveType`
  - notes: "Circular display for available days with Apply button"

- **ApplyButton** (Type: `p-button`)

  - label: "Apply"
  - styleClass: "p-button-warning p-button-sm"
  - binding: `onApplyLeave(leaveType)`
  - notes: "Orange/yellow button for leave application"

- **LeaveHistoryTable** (Type: `p-table`)

  - value: `leaveHistoryData`
  - paginator: `true`
  - rows: `10`
  - binding: `LeaveHistory[]`
  - trackBy: `trackByLeaveId`
  - notes: "Sortable table with action buttons"

- **ActionButton** (Type: `p-button`)

  - label: "Actions"
  - icon: "pi pi-ellipsis-v"
  - styleClass: "p-button-secondary p-button-sm"
  - binding: `onActionClick(leaveRecord)`
  - notes: "Dropdown actions for each leave record"

- **ExportButton** (Type: `p-button`)

  - label: "Export"
  - icon: "pi pi-download"
  - styleClass: "p-button-success"
  - binding: `onExportData()`
  - notes: "Export leave history data"

- **FilterButton** (Type: `p-button`)
  - icon: "pi pi-filter"
  - styleClass: "p-button-outlined"
  - binding: `onToggleFilter()`
  - notes: "Toggle filter panel"

## 4. Data Models

- **Mock Data**

```json
{
  "leaveBalances": [
    {
      "availableDays": 60,
      "leaveType": "Annual Leave",
      "maxDays": 60,
      "usedDays": 0,
      "color": "#3f51b5"
    },
    {
      "availableDays": 20,
      "leaveType": "Sick Leave",
      "maxDays": 30,
      "usedDays": 10,
      "color": "#2196f3"
    },
    {
      "availableDays": 60,
      "leaveType": "Maternity Leave",
      "maxDays": 120,
      "usedDays": 60,
      "color": "#673ab7"
    },
    {
      "availableDays": 30,
      "leaveType": "Compassionate Leave",
      "maxDays": 30,
      "usedDays": 0,
      "color": "#4caf50"
    }
  ],
  "leaveHistory": [
    {
      "id": "1",
      "employeeName": "Abenezer kebede",
      "duration": 5,
      "startDate": "2022-04-22",
      "endDate": "2022-04-28",
      "leaveType": "Sick",
      "reason": "Personal",
      "status": "approved"
    },
    {
      "id": "2",
      "employeeName": "Abenezer kebede",
      "duration": 7,
      "startDate": "2022-04-22",
      "endDate": "2022-04-30",
      "leaveType": "Exam",
      "reason": "Examination",
      "status": "approved"
    },
    {
      "id": "3",
      "employeeName": "Abenezer kebede",
      "duration": 120,
      "startDate": "2022-04-22",
      "endDate": "2022-06-28",
      "leaveType": "Maternity",
      "reason": "Child Care",
      "status": "approved"
    },
    {
      "id": "4",
      "employeeName": "Abenezer kebede",
      "duration": 5,
      "startDate": "2022-04-22",
      "endDate": "2022-04-28",
      "leaveType": "Sick",
      "reason": "Personal",
      "status": "pending"
    },
    {
      "id": "5",
      "employeeName": "Abenezer kebede",
      "duration": 5,
      "startDate": "2022-04-22",
      "endDate": "2022-04-28",
      "leaveType": "Sick",
      "reason": "Personal",
      "status": "approved"
    },
    {
      "id": "6",
      "employeeName": "Abenezer kebede",
      "duration": 5,
      "startDate": "2022-04-22",
      "endDate": "2022-04-28",
      "leaveType": "Sick",
      "reason": "Personal",
      "status": "rejected"
    },
    {
      "id": "7",
      "employeeName": "Abenezer kebede",
      "duration": 5,
      "startDate": "2022-04-22",
      "endDate": "2022-04-28",
      "leaveType": "Sick",
      "reason": "Personal",
      "status": "approved"
    }
  ]
}
```

- **LeaveBalance**

  - availableDays: `number` (validation: `min: 0`, default: `0`)
  - leaveType: `string` (validation: `required`, default: `''`)
  - maxDays: `number` (validation: `min: 0`, default: `0`)
  - usedDays: `number` (validation: `min: 0`, default: `0`)
  - color: `string` (validation: `required`, default: `'#000000'`)

- **LeaveHistory**
  - id: `string` (validation: `required`, default: `''`)
  - employeeName: `string` (validation: `required`, default: `''`)
  - duration: `number` (validation: `min: 1`, default: `1`)
  - startDate: `string` (validation: `required`, default: `''`)
  - endDate: `string` (validation: `required`, default: `''`)
  - leaveType: `string` (validation: `required`, default: `''`)
  - reason: `string` (validation: `required`, default: `''`)
  - status: `string` (validation: `required`, default: `'pending'`)

## 5. Screen State

- isLoading: `boolean` (default: `false`)
- errorMessage: `string` (default: `null`)
- selectedLeaveType: `string` (default: `null`)
- showFilterPanel: `boolean` (default: `false`)
- leaveBalances: `LeaveBalance[]` (default: `[]`)
- leaveHistory: `LeaveHistory[]` (default: `[]`)
- totalRecords: `number` (default: `0`)

## 6. Events & Interactions

- **[ApplyButton]** -> `onClick(leaveType)` -> "Navigate to leave application form with pre-selected leave type. Open modal or route to `/leave/apply?type=${leaveType}`"

- **[ActionButton]** -> `onClick(leaveRecord)` -> "Display context menu with options: View Details, Edit (if pending), Cancel (if pending), Download Attachment. Each action triggers appropriate service call or navigation."

- **[ExportButton]** -> `onClick()` -> "Call `leaveService.exportHistory()` to download leave history as CSV/Excel file. Show loading state during export."

- **[FilterButton]** -> `onClick()` -> "Toggle filter panel visibility. Allow filtering by date range, leave type, and status."

- **[HistoryTable]** -> `onPage(event)` -> "Load next page of leave history data. Update `first` and `rows` parameters for pagination."

- **[HistoryTable]** -> `onSort(event)` -> "Sort leave history by selected column (date, type, duration). Call API with sort parameters."

## 7. Constraints & Assumptions

- **Responsiveness**: "Cards stack vertically on mobile (col-12), 2 per row on tablet (col-6), 4 per row on desktop (col-3). Table becomes horizontally scrollable on mobile devices."

- **Accessibility**: "All interactive elements must have proper ARIA labels. Table headers must have scope attributes. Color coding must not be the only indicator of status - use icons as well."

- **Localization**: "All static text (labels, titles, status values) must be sourced from i18n files. Date formatting should respect user locale."

- **Assumptions Made**:

  - "Assumed employees can only view their own leave data and cannot access other employees' records"
  - "Assumed the Actions dropdown includes standard CRUD operations based on leave status"
  - "Assumed pagination is server-side with default page size of 10 records"
  - "Assumed export functionality generates CSV format with all visible columns"
  - "Assumed leave types are predefined (Annual, Sick, Maternity, etc.) and fetched from backend"
  - "Assumed filter functionality includes date range picker and multi-select dropdowns for type/status"
  - "Mock data will be used for initial development and can be replaced with API calls later"
    - label: "Maternity Leave"
    - applyButton: (Type: `p-button`)
      - label: "Apply"
      - styleClass: "p-button-warning p-button-sm"
      - binding: `onApplyLeave('maternity')`

- **LeaveHistorySection** (Type: `div.leave-history-section`)

  - **SectionHeader** (Type: `div.section-header`)

    - title: "Leave History"
    - **FilterButton** (Type: `p-button`)
      - icon: "pi pi-filter"
      - styleClass: "p-button-outlined"
      - binding: `onToggleFilter()`
    - **ExportButton** (Type: `p-button`)
      - label: "Export"
      - icon: "pi pi-download"
      - styleClass: "p-button-success"
      - binding: `onExportData()`

  - **LeaveHistoryTable** (Type: `p-table`)
    - dataKey: "id"
    - binding: `leaveHistory`
    - paginator: `true`
    - rows: `10`
    - columns:
      - **NameColumn**: field: "employeeName", header: "Name(s)"
      - **DurationColumn**: field: "duration", header: "Duration(s)"
      - **StartDateColumn**: field: "startDate", header: "Start Date"
      - **EndDateColumn**: field: "endDate", header: "End Date"
      - **TypeColumn**: field: "leaveType", header: "Type"
      - **ReasonColumn**: field: "reason", header: "Reason(s)"
      - **ActionsColumn**:
        - **ActionDropdown** (Type: `p-dropdown`)
          - label: "Actions"
          - options: `actionOptions`
          - binding: `onActionSelect($event, rowData)`

## 4. Data Models

- **LeaveBalance**

  - leaveType: `string` (validation: `required`, default: `''`)
  - balance: `number` (validation: `min: 0`, default: `0`)
  - maxAllowed: `number` (validation: `min: 0`, default: `0`)
  - _Assumed Data Source_: `API GET /api/v1/leave/balance`

- **LeaveHistoryRecord**

  - id: `string` (validation: `required`, default: `''`)
  - employeeName: `string` (validation: `required`, default: `''`)
  - duration: `number` (validation: `min: 1`, default: `1`)
  - startDate: `Date` (validation: `required`, default: `new Date()`)
  - endDate: `Date` (validation: `required`, default: `new Date()`)
  - leaveType: `string` (validation: `required`, default: `''`)
  - reason: `string` (validation: `required`, default: `''`)
  - status: `string` (validation: `required`, default: `'pending'`)
  - _Assumed Data Source_: `API GET /api/v1/leave/history`

- **LeaveApplication**
  - leaveType: `string` (validation: `required`, default: `''`)
  - startDate: `Date` (validation: `required`, default: `new Date()`)
  - endDate: `Date` (validation: `required`, default: `new Date()`)
  - reason: `string` (validation: `required, minLength: 10`, default: `''`)
  - duration: `number` (validation: `min: 1`, default: `1`)

## 5. Screen State

- isLoading: `boolean` (default: `false`)
- leaveBalances: `LeaveBalance[]` (default: `[]`)
- leaveHistory: `LeaveHistoryRecord[]` (default: `[]`)
- showFilter: `boolean` (default: `false`)
- selectedAction: `string` (default: `null`)
- actionOptions: `SelectItem[]` (default: `[{label: 'View', value: 'view'}, {label: 'Edit', value: 'edit'}, {label: 'Cancel', value: 'cancel'}]`)

## 6. Events & Interactions

- **[ApplyButton]** -> `onApplyLeave(leaveType: string)` -> "Navigate to leave application form with pre-selected leave type. Route to `/leave/apply?type=${leaveType}`."

- **[FilterButton]** -> `onToggleFilter()` -> "Toggle visibility of filter panel. Update `showFilter` state and display additional filter controls above the table."

- **[ExportButton]** -> `onExportData()` -> "Export current leave history data to Excel/CSV format. Call `leaveService.exportLeaveHistory()` and trigger file download."

- **[ActionDropdown]** -> `onActionSelect(event, rowData)` -> "Handle action selection for leave record. For 'view': open details dialog, for 'edit': navigate to edit form if status is 'pending', for 'cancel': show confirmation dialog and call API to cancel leave."

- **[Table]** -> `onPageChange(event)` -> "Handle pagination. Load new page data from API with updated page parameters."

## 7. Constraints & Assumptions

- **Responsiveness**: "Cards should stack vertically on mobile devices (col-12). Table should be horizontally scrollable on smaller screens with sticky action column."
- **Accessibility**: "All interactive elements must have proper ARIA labels. Leave balance cards should have screen reader friendly announcements for balance numbers. Table should support keyboard navigation."
- **Localization**: "All static text must be sourced from i18n files. Date formats should respect user locale preferences."
- **Assumptions Made**:
  - "Assumed employee can only view their own leave data"
  - "Assumed 'Actions' dropdown provides view, edit (for pending), and cancel options"
  - "Assumed export functionality exports all filtered results"
  - "Assumed leave application process opens in a separate form/modal"
  - "Assumed pagination with 10 records per page"
  - "Assumed API endpoints follow RESTful conventions"
