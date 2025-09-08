import { WorkingStatus } from '../enum/workingStatus';
import { ChangeType } from '../enum/changeType';
import { TransferStatus } from '../enum/transferStatus';

export interface Transfer {
  id: string;
  employee: string;
  workingStatus: WorkingStatus;
  currentDept: string;
  transferTo: string;
  newCustomer: string;
  newContract: string;
  newWorkplace: string;
  changeType: ChangeType;
  status: TransferStatus;
}

export interface TransferFilter {
  searchTerm: string;
  type: string;
}
