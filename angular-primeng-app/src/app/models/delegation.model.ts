export interface DelegationModel {
  id: string;
  employeeCode: string;
  employeeName: string;
  employee: string;
  scope: string;
  role: string;
  delegater: string;
  delegaterId: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'inactive' | 'expired';
  createdAt: string;
  createdBy: string;
}

export interface CreateDelegationRequest {
  employeeCode: string;
  employeeName: string;
  scope: string;
  role: string;
  startDate: string;
  endDate: string;
}
