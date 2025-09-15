import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { DelegationModel, CreateDelegationRequest } from '../models/delegation.model';

@Injectable({
  providedIn: 'root'
})
export class DelegationService {
  private delegationsSubject = new BehaviorSubject<DelegationModel[]>([]);
  public delegations$ = this.delegationsSubject.asObservable();

  private mockDelegations: DelegationModel[] = [
    {
      id: 'DEL001',
      employeeCode: 'NhiNB',
      employeeName: 'Nguyen Bao Nhi',
      employee: 'NhiNB (Nguyen Bao Nhi)',
      scope: 'FJP HR',
      role: 'Manager',
      delegater: 'ThanhTP',
      delegaterId: 'EMP003',
      startDate: '2025-09-01',
      endDate: '2025-12-31',
      status: 'active',
      createdAt: '2025-09-01T08:00:00Z',
      createdBy: 'ThanhTP'
    },
    {
      id: 'DEL002',
      employeeCode: 'DiemPT',
      employeeName: 'Pham Thi Diem',
      employee: 'DiemPT (Pham Thi Diem)',
      scope: 'FJP HR',
      role: 'RA',
      delegater: 'ThanhTP',
      delegaterId: 'EMP003',
      startDate: '2025-09-01',
      endDate: '2025-11-30',
      status: 'active',
      createdAt: '2025-09-01T08:00:00Z',
      createdBy: 'ThanhTP'
    }
  ];

  constructor() {
    // Initialize with mock data
    this.delegationsSubject.next(this.mockDelegations);
  }

  getDelegations(): Observable<DelegationModel[]> {
    return of(this.mockDelegations).pipe(
      delay(500), // Simulate network delay
      map(delegations => [...delegations])
    );
  }

  createDelegation(request: CreateDelegationRequest): Observable<DelegationModel> {
    const newDelegation: DelegationModel = {
      id: `DEL${String(Date.now()).slice(-6)}`,
      employeeCode: request.employeeCode,
      employeeName: request.employeeName,
      employee: `${request.employeeCode} (${request.employeeName})`,
      scope: request.scope,
      role: request.role,
      delegater: 'ThanhTP', // Current user
      delegaterId: 'EMP003',
      startDate: request.startDate,
      endDate: request.endDate,
      status: 'active',
      createdAt: new Date().toISOString(),
      createdBy: 'ThanhTP'
    };

    return of(newDelegation).pipe(
      delay(300),
      map(delegation => {
        this.mockDelegations.push(delegation);
        this.delegationsSubject.next([...this.mockDelegations]);
        return delegation;
      })
    );
  }

  deleteDelegations(delegationIds: string[]): Observable<boolean> {
    return of(true).pipe(
      delay(300),
      map(() => {
        this.mockDelegations = this.mockDelegations.filter(
          delegation => !delegationIds.includes(delegation.id)
        );
        this.delegationsSubject.next([...this.mockDelegations]);
        return true;
      })
    );
  }

  updateDelegation(id: string, updates: Partial<DelegationModel>): Observable<DelegationModel> {
    return of(updates).pipe(
      delay(300),
      map(() => {
        const index = this.mockDelegations.findIndex(d => d.id === id);
        if (index !== -1) {
          this.mockDelegations[index] = { ...this.mockDelegations[index], ...updates };
          this.delegationsSubject.next([...this.mockDelegations]);
          return this.mockDelegations[index];
        }
        throw new Error('Delegation not found');
      })
    );
  }
}
