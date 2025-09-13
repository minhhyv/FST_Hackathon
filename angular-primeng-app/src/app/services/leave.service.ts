import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { LeaveBalance } from '../models/leaveBalance.model';
import { LeaveHistory } from '../models/leaveHistory.model';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  private leaveBalancesSubject = new BehaviorSubject<LeaveBalance[]>([]);
  private leaveHistorySubject = new BehaviorSubject<LeaveHistory[]>([]);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);

  public leaveBalances$ = this.leaveBalancesSubject.asObservable();
  public leaveHistory$ = this.leaveHistorySubject.asObservable();
  public isLoading$ = this.isLoadingSubject.asObservable();

  private mockLeaveBalances: LeaveBalance[] = [
    {
      availableDays: 60,
      leaveType: "Annual Leave",
      maxDays: 60,
      usedDays: 0,
      color: "#3f51b5"
    },
    {
      availableDays: 20,
      leaveType: "Sick Leave", 
      maxDays: 30,
      usedDays: 10,
      color: "#2196f3"
    },
    {
      availableDays: 60,
      leaveType: "Maternity Leave",
      maxDays: 120,
      usedDays: 60,
      color: "#673ab7"
    },
    {
      availableDays: 30,
      leaveType: "Compassionate Leave",
      maxDays: 30,
      usedDays: 0,
      color: "#4caf50"
    }
  ];

  private mockLeaveHistory: LeaveHistory[] = [
    {
      id: "1",
      employeeName: "Abenezer kebede",
      duration: 5,
      startDate: "2022-04-22",
      endDate: "2022-04-28",
      leaveType: "Sick",
      reason: "Personal",
      status: "approved"
    },
    {
      id: "2", 
      employeeName: "Abenezer kebede",
      duration: 7,
      startDate: "2022-04-22",
      endDate: "2022-04-30",
      leaveType: "Exam",
      reason: "Examination",
      status: "approved"
    },
    {
      id: "3",
      employeeName: "Abenezer kebede", 
      duration: 120,
      startDate: "2022-04-22",
      endDate: "2022-06-28",
      leaveType: "Maternity",
      reason: "Child Care",
      status: "approved"
    },
    {
      id: "4",
      employeeName: "Abenezer kebede",
      duration: 5,
      startDate: "2022-04-22", 
      endDate: "2022-04-28",
      leaveType: "Sick",
      reason: "Personal",
      status: "pending"
    },
    {
      id: "5",
      employeeName: "Abenezer kebede",
      duration: 5,
      startDate: "2022-04-22",
      endDate: "2022-04-28", 
      leaveType: "Sick",
      reason: "Personal",
      status: "approved"
    },
    {
      id: "6",
      employeeName: "Abenezer kebede",
      duration: 5,
      startDate: "2022-04-22",
      endDate: "2022-04-28",
      leaveType: "Sick", 
      reason: "Personal",
      status: "rejected"
    },
    {
      id: "7",
      employeeName: "Abenezer kebede",
      duration: 5,
      startDate: "2022-04-22",
      endDate: "2022-04-28",
      leaveType: "Sick",
      reason: "Personal",
      status: "approved"
    }
  ];

  constructor() {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.isLoadingSubject.next(true);
    
    // Simulate API delay
    setTimeout(() => {
      this.leaveBalancesSubject.next(this.mockLeaveBalances);
      this.leaveHistorySubject.next(this.mockLeaveHistory);
      this.isLoadingSubject.next(false);
    }, 1000);
  }

  getLeaveBalances(): Observable<LeaveBalance[]> {
    return this.leaveBalances$;
  }

  getLeaveHistory(page: number = 0, size: number = 10): Observable<{data: LeaveHistory[], totalRecords: number}> {
    const startIndex = page * size;
    const endIndex = startIndex + size;
    const paginatedData = this.mockLeaveHistory.slice(startIndex, endIndex);
    
    return of({
      data: paginatedData,
      totalRecords: this.mockLeaveHistory.length
    }).pipe(delay(300));
  }

  exportLeaveHistory(): Observable<Blob> {
    const csvContent = this.generateCSV(this.mockLeaveHistory);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    return of(blob).pipe(delay(500));
  }

  private generateCSV(data: LeaveHistory[]): string {
    const headers = ['Name', 'Duration', 'Start Date', 'End Date', 'Type', 'Reason', 'Status'];
    const csvRows = [
      headers.join(','),
      ...data.map(row => [
        row.employeeName,
        row.duration,
        row.startDate,
        row.endDate,
        row.leaveType,
        row.reason,
        row.status
      ].join(','))
    ];
    return csvRows.join('\n');
  }

  applyLeave(leaveType: string): void {
    // Navigate to leave application form or open modal
    console.log(`Applying for ${leaveType}`);
  }

  getActionItems(leaveRecord: LeaveHistory): string[] {
    const actions = ['View Details'];
    
    if (leaveRecord.status === 'pending') {
      actions.push('Edit', 'Cancel');
    }
    
    actions.push('Download Attachment');
    return actions;
  }
}
