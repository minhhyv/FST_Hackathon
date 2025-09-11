export interface LeaveHistory {
  id: string;
  employeeName: string;
  duration: number;
  startDate: string;
  endDate: string;
  leaveType: string;
  reason: string;
  status: 'approved' | 'pending' | 'rejected';
}
