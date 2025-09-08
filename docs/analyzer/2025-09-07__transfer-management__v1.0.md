# Screen Specification: Transfer Management Dashboard

## 1. Overview

A transfer management interface that allows HR and Transfer managers to review, approve, or reject employee transfer requests. The screen displays detailed transfer information including current and target departments, customer assignments, workplace changes, and provides action buttons for processing transfer requests with status tracking.

## 2. Layout Structure

- **Header** (Type: `p-toolbar`)
  - **TabContainer** (Type: `p-tabView`)
    - **MemberManagerTab** (Type: `p-tabPanel`)
    - **TransferManagerTab** (Type: `p-tabPanel`)
- **SearchAndFilterArea** (Type: `div.p-fluid.grid`)
  - **SearchBar** (Type: `div.col-9`)
  - **TypeFilter** (Type: `div.col-3`)
- **ContentArea** (Type: `div.p-fluid.grid`)
  - **TransferDataTable** (Type: `div.col-12`)

## 3. UI Component Hierarchy

- **TabView** (Type: `p-tabView`)
  - activeIndex: `1`
  - **TabPanel-MemberManager** (Type: `p-tabPanel`)
    - header: "Member Manager"
  - **TabPanel-TransferManager** (Type: `p-tabPanel`)
    - header: "Transfer Manager"
    - selected: `true`

- **SearchInput** (Type: `p-inputText`)
  - placeholder: "Search transfers..."
  - binding: `TransferFilter.searchTerm`
  - notes: "Global search across transfer data"

- **TypeDropdown** (Type: `p-dropdown`)
  - placeholder: "All Type"
  - binding: `TransferFilter.type`
  - options: `typeOptions`
  - notes: "Filter by transfer type"

- **TransferTable** (Type: `p-table`)
  - value: `transfers`
  - paginator: `true`
  - rows: `10`
  - dataKey: "id"
  - **EmployeeColumn** (Type: `p-column`)
    - field: "employee"
    - header: "Employee"
  - **WorkingStatusColumn** (Type: `p-column`)
    - field: "workingStatus"
    - header: "Working Status"
  - **CurrentDeptColumn** (Type: `p-column`)
    - field: "currentDept"
    - header: "Current Dept"
  - **TransferToColumn** (Type: `p-column`)
    - field: "transferTo"
    - header: "Transfer To"
  - **NewCustomerColumn** (Type: `p-column`)
    - field: "newCustomer"
    - header: "New Customer"
  - **NewContractColumn** (Type: `p-column`)
    - field: "newContract"
    - header: "New Contract"
  - **NewWorkplaceColumn** (Type: `p-column`)
    - field: "newWorkplace"
    - header: "New Workplace"
  - **ChangeTypeColumn** (Type: `p-column`)
    - field: "changeType"
    - header: "Change Type"
    - **ChangeTypeBadge** (Type: `p-badge`)
      - value: `transfer.changeType`
      - severity: `getChangeTypeSeverity(transfer.changeType)`
  - **StatusColumn** (Type: `p-column`)
    - field: "status"
    - header: "Status"
  - **ActionColumn** (Type: `p-column`)
    - header: "Action"
    - **ConfirmButton** (Type: `p-button`)
      - label: "Confirm"
      - severity: "success"
      - size: "small"
      - binding: `onConfirmTransfer(transfer)`
      - disabled: `transfer.status !== 'Pending'`
    - **RejectButton** (Type: `p-button`)
      - label: "Reject"
      - severity: "danger"
      - size: "small"
      - binding: `onRejectTransfer(transfer)`
      - disabled: `transfer.status !== 'Pending'`
    - **EditButton** (Type: `p-button`)
      - icon: "pi pi-pencil"
      - severity: "info"
      - size: "small"
      - binding: `onEditTransfer(transfer)`

## 4. Data Models

- **Transfer**
  - id: `string` (validation: `required`)
  - employee: `string` (validation: `required`, default: `""`)
  - workingStatus: `WorkingStatus` (validation: `required`, default: `"Active"`)
  - currentDept: `string` (validation: `required`, default: `""`)
  - transferTo: `string` (validation: `required`, default: `""`)
  - newCustomer: `string` (validation: `required`, default: `""`)
  - newContract: `string` (validation: `required`, default: `""`)
  - newWorkplace: `string` (validation: `required`, default: `""`)
  - changeType: `ChangeType` (validation: `required`, default: `"IN"`)
  - status: `TransferStatus` (validation: `required`, default: `"Pending"`)
  - _Assumed Data Source_: `API GET /api/v1/transfers`

- **TransferFilter**
  - searchTerm: `string` (default: `""`)
  - type: `string` (default: `"All Type"`)
  - _Assumed Data Source_: `Local component state`

- **WorkingStatus** (Enum)
  - Active
  - Onboarding
  - Inactive

- **ChangeType** (Enum)
  - IN
  - OUT
  - Transfer

- **TransferStatus** (Enum)
  - Pending
  - Confirmed
  - Rejected

## 5. Screen State

- isLoading: `boolean` (default: `false`)
- errorMessage: `string` (default: `null`)
- transfers: `Transfer[]` (default: `[]`)
- filteredTransfers: `Transfer[]` (default: `[]`)
- typeOptions: `SelectItem[]` (default: `[]`)
- confirmationDialogVisible: `boolean` (default: `false`)
- selectedTransfer: `Transfer` (default: `null`)

## 6. Events & Interactions

- **[SearchInput]** -> `on(input)` -> "Filter transfers array based on search term across all transfer fields. Update filteredTransfers."

- **[TypeDropdown]** -> `on(change)` -> "Filter transfers by selected type. Update filteredTransfers."

- **[ConfirmButton]** -> `on(click)` -> "Show confirmation dialog for transfer approval. On confirmation, call `transferService.confirmTransfer(transfer.id)` and update transfer status to 'Confirmed'."

- **[RejectButton]** -> `on(click)` -> "Show confirmation dialog for transfer rejection. On confirmation, call `transferService.rejectTransfer(transfer.id)` and update transfer status to 'Rejected'."

- **[EditButton]** -> `on(click)` -> "Navigate to transfer edit form with transfer.id parameter. Route to '/transfers/edit/:id'."

- **[TabView]** -> `on(activeIndexChange)` -> "Switch between Member Manager and Transfer Manager views. Load appropriate data for selected tab."

## 7. Constraints & Assumptions

- **Responsiveness**: "Table should be horizontally scrollable on mobile devices. Action buttons should stack vertically on smaller screens."
- **Accessibility**: "All form inputs must have associated labels. Table headers must be properly marked. Action buttons must have ARIA labels and proper focus management."
- **Localization**: "All static text (headers, labels, buttons) must be sourced from i18n files."
- **Assumptions Made**:
  - "Transfer data is fetched from a REST API with real-time updates"
  - "Confirm and reject operations require confirmation dialogs"
  - "Only pending transfers can be confirmed or rejected"
  - "Transfer type filter options are loaded from a configuration service"
  - "Status changes are immediately reflected in the UI"
  - "Change type badge colors: IN (yellow), OUT (red), Transfer (blue)"
  - "Action buttons are disabled based on transfer status"
