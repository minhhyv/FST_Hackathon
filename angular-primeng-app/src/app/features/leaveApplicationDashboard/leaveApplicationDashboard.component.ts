import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LeaveBalance } from '../../models/leaveBalance.model';
import { LeaveHistory } from '../../models/leaveHistory.model';
import { LeaveService } from '../../services/leave.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-leave-application-dashboard',
  templateUrl: './leaveApplicationDashboard.component.html',
  styleUrls: ['./leaveApplicationDashboard.component.scss']
})
export class LeaveApplicationDashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  leaveBalances$: Observable<LeaveBalance[]>;
  leaveHistory: LeaveHistory[] = [];
  isLoading$: Observable<boolean>;
  
  // Table pagination
  first = 0;
  rows = 10;
  totalRecords = 0;
  
  // Component state
  showFilterPanel = false;
  selectedLeaveType: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private leaveService: LeaveService,
    private messageService: MessageService
  ) {
    this.leaveBalances$ = this.leaveService.getLeaveBalances();
    this.isLoading$ = this.leaveService.isLoading$;
  }

  ngOnInit(): void {
    this.loadLeaveHistory();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadLeaveHistory(): void {
    const page = Math.floor(this.first / this.rows);
    
    this.leaveService.getLeaveHistory(page, this.rows)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.leaveHistory = response.data;
          this.totalRecords = response.totalRecords;
        },
        error: (error) => {
          this.errorMessage = 'Failed to load leave history';
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to load leave history'
          });
        }
      });
  }

  onApplyLeave(leaveType: string): void {
    this.selectedLeaveType = leaveType;
    this.leaveService.applyLeave(leaveType);
    
    this.messageService.add({
      severity: 'info',
      summary: 'Navigation',
      detail: `Redirecting to ${leaveType} application form`
    });
  }

  onActionClick(leaveRecord: LeaveHistory, action: string): void {
    switch (action) {
      case 'View Details':
        this.viewLeaveDetails(leaveRecord);
        break;
      case 'Edit':
        this.editLeaveRecord(leaveRecord);
        break;
      case 'Cancel':
        this.cancelLeaveRecord(leaveRecord);
        break;
      case 'Download Attachment':
        this.downloadAttachment(leaveRecord);
        break;
      default:
        console.log(`Unknown action: ${action}`);
    }
  }

  onExportData(): void {
    this.leaveService.exportLeaveHistory()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `leave-history-${new Date().toISOString().split('T')[0]}.csv`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          
          this.messageService.add({
            severity: 'success',
            summary: 'Export',
            detail: 'Leave history exported successfully'
          });
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Export Failed',
            detail: 'Failed to export leave history'
          });
        }
      });
  }

  onToggleFilter(): void {
    this.showFilterPanel = !this.showFilterPanel;
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
    this.loadLeaveHistory();
  }

  trackByLeaveId(index: number, item: LeaveHistory): string {
    return item.id;
  }

  getActionItems(leaveRecord: LeaveHistory): string[] {
    return this.leaveService.getActionItems(leaveRecord);
  }

  getActionMenuItems(leaveRecord: LeaveHistory): any[] {
    const actions = this.getActionItems(leaveRecord);
    return actions.map(action => ({
      label: action,
      command: () => this.onActionClick(leaveRecord, action)
    }));
  }

  getStatusSeverity(status: string): string {
    switch (status) {
      case 'approved':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'danger';
      default:
        return 'info';
    }
  }

  private viewLeaveDetails(leaveRecord: LeaveHistory): void {
    console.log('Viewing details for:', leaveRecord);
    this.messageService.add({
      severity: 'info',
      summary: 'View Details',
      detail: `Opening details for leave request ${leaveRecord.id}`
    });
  }

  private editLeaveRecord(leaveRecord: LeaveHistory): void {
    if (leaveRecord.status === 'pending') {
      console.log('Editing leave record:', leaveRecord);
      this.messageService.add({
        severity: 'info',
        summary: 'Edit',
        detail: `Opening edit form for leave request ${leaveRecord.id}`
      });
    }
  }

  private cancelLeaveRecord(leaveRecord: LeaveHistory): void {
    if (leaveRecord.status === 'pending') {
      console.log('Cancelling leave record:', leaveRecord);
      this.messageService.add({
        severity: 'warn',
        summary: 'Cancel',
        detail: `Cancelling leave request ${leaveRecord.id}`
      });
    }
  }

  private downloadAttachment(leaveRecord: LeaveHistory): void {
    console.log('Downloading attachment for:', leaveRecord);
    this.messageService.add({
      severity: 'info',
      summary: 'Download',
      detail: `Downloading attachment for leave request ${leaveRecord.id}`
    });
  }
}
