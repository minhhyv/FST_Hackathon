export interface Employee {
  id: string;
  name: string;
  workingStatus: 'Active' | 'Onboarding' | 'Inactive';
  currentDept: string;
  transferTo?: string;
  newCustomer?: string;
  newContract?: string;
  newWorkplace?: string;
  changeType?: 'IN' | 'OUT';
  status: 'Confirm' | 'Reject';
  canEdit: boolean;
}

export interface Department {
  code: string;
  name: string;
}

export interface StatusSummary {
  updateCount: number;
  inCount: number;
  outCount: number;
  totalCount: number;
}

export interface FilterOptions {
  searchQuery: string;
  selectedDepartment: string | null;
  pageSize: number;
  currentPage: number;
}

export interface TabItem {
  label: string;
  routerLink: string;
}
