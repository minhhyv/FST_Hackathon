export interface Employee {
  id: string;
  name: string;
  department: string;
  workingStatus: 'Active' | 'Onboarding' | 'Inactive';
  customer: string;
  customerContract: string;
  workplace: string;
  changeType: 'Update' | 'IN' | 'OUT' | null;
  isSelected?: boolean;
}

export interface Department {
  code: string;
  name: string;
  isActive: boolean;
}

export interface StatusSummary {
  updateCount: number;
  inCount: number;
  outCount: number;
  totalCount: number;
}