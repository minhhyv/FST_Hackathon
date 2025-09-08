import { WorkingStatus } from '../enum/workingStatus';
import { ChangeType } from '../enum/changeType';

export interface Employee {
  id: string;
  name: string;
  department: string;
  workingStatus: WorkingStatus;
  customer: string;
  customerContract: string;
  workplace: string;
  changeType: ChangeType;
}

export interface EmployeeFilter {
  searchTerm: string;
  department: string;
}

export interface StatusCounts {
  update: number;
  in: number;
  out: number;
  total: number;
}
