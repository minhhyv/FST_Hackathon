export interface Employee {
  id: string;
  name: string;
  workingStatus: 'Active' | 'Onboarding' | 'Inactive';
  currentDept: string;
  transferTo: string;
  newCustomer: string;
  newContract: string;
  newWorkplace: string;
  changeType: 'IN' | 'OUT';
  status: 'Confirm' | 'Reject';
  selected?: boolean;
}

export interface Department {
  id: string;
  name: string;
  code: string;
}

export interface StatusSummary {
  updateCount: number;
  inCount: number;
  outCount: number;
  totalCount: number;
}
