import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Transfer } from '../models/transfer';
import { WorkingStatus } from '../enum/workingStatus';
import { ChangeType } from '../enum/changeType';
import { TransferStatus } from '../enum/transferStatus';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  private transfersSubject = new BehaviorSubject<Transfer[]>([]);
  public transfers$ = this.transfersSubject.asObservable();

  private mockTransfers: Transfer[] = [
    {
      id: '1',
      employee: 'AnNV (Nguyen Van A)',
      workingStatus: WorkingStatus.Active,
      currentDept: 'FJP FST',
      transferTo: 'FJP HR',
      newCustomer: 'HeadOffice',
      newContract: 'HeadOffice',
      newWorkplace: 'Mita',
      changeType: ChangeType.IN,
      status: TransferStatus.Pending
    },
    {
      id: '2',
      employee: 'BeTT (Tran Thi Be)',
      workingStatus: WorkingStatus.Onboarding,
      currentDept: 'FJP AF',
      transferTo: 'FJP HR',
      newCustomer: 'FST',
      newContract: 'Juninin',
      newWorkplace: 'Tokyo',
      changeType: ChangeType.IN,
      status: TransferStatus.Pending
    },
    {
      id: '3',
      employee: 'XeLV (Le Van Xe)',
      workingStatus: WorkingStatus.Active,
      currentDept: 'FJP HR',
      transferTo: 'FJP FST',
      newCustomer: 'Honda',
      newContract: 'Haken',
      newWorkplace: 'Osaka',
      changeType: ChangeType.OUT,
      status: TransferStatus.Pending
    }
  ];

  constructor() {
    this.transfersSubject.next(this.mockTransfers);
  }

  getTransfers(): Observable<Transfer[]> {
    return of(this.mockTransfers).pipe(delay(500));
  }

  confirmTransfer(id: string): Observable<boolean> {
    const transfers = this.transfersSubject.value.map(transfer => 
      transfer.id === id ? { ...transfer, status: TransferStatus.Confirmed } : transfer
    );
    this.transfersSubject.next(transfers);
    return of(true).pipe(delay(300));
  }

  rejectTransfer(id: string): Observable<boolean> {
    const transfers = this.transfersSubject.value.map(transfer => 
      transfer.id === id ? { ...transfer, status: TransferStatus.Rejected } : transfer
    );
    this.transfersSubject.next(transfers);
    return of(true).pipe(delay(300));
  }

  updateTransfer(transfer: Transfer): Observable<Transfer> {
    return of(transfer).pipe(delay(300));
  }

  getTypeOptions(): Observable<string[]> {
    return of(['IN', 'OUT', 'Transfer', 'All Type']);
  }
}
