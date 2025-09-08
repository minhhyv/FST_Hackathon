import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Subject, BehaviorSubject, combineLatest } from 'rxjs';
import { takeUntil, map, startWith } from 'rxjs/operators';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { Employee, EmployeeFilter, StatusCounts } from '../../models/employee';
import { Transfer } from '../../models/transfer';
import { EmployeeService } from '../../services/employee.service';
import { TransferService } from '../../services/transfer.service';
import { AppMessageService } from '../../services/message.service';
import { ChangeType } from '../../enum/changeType';
import { TransferStatus } from '../../enum/transferStatus';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employeeManagement.component.html',
  styleUrls: ['./employeeManagement.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeManagementComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  // Tab management
  activeTabIndex = 0;
  
  // Employee management state
  employees$ = this.employeeService.employees$;
  transfers$ = this.transferService.transfers$;
  
  private filterSubject = new BehaviorSubject<EmployeeFilter>({
    searchTerm: '',
    department: 'All Dept'
  });
  
  private transferFilterSubject = new BehaviorSubject<{ searchTerm: string; type: string }>({
    searchTerm: '',
    type: 'All Type'
  });
  
  filter$ = this.filterSubject.asObservable();
  transferFilter$ = this.transferFilterSubject.asObservable();
  
  filteredEmployees$ = combineLatest([this.employees$, this.filter$]).pipe(
    map(([employees, filter]) => this.filterEmployees(employees, filter))
  );
  
  filteredTransfers$ = combineLatest([this.transfers$, this.transferFilter$]).pipe(
    map(([transfers, filter]) => this.filterTransfers(transfers, filter))
  );
  
  statusCounts$ = this.filteredEmployees$.pipe(
    map(employees => this.employeeService.getStatusCounts(employees))
  );
  
  selectedEmployees: Employee[] = [];
  departmentOptions: SelectItem[] = [];
  typeOptions: SelectItem[] = [];
  isLoading = false;
  
  // Change type enum for template
  ChangeType = ChangeType;
  TransferStatus = TransferStatus;

  constructor(
    private employeeService: EmployeeService,
    private transferService: TransferService,
    private messageService: AppMessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.setupDepartmentOptions();
    this.setupTypeOptions();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Tab management
  onTabChange(event: any): void {
    this.activeTabIndex = event.index;
  }

  // Employee filtering
  onSearchChange(searchTerm: string): void {
    const currentFilter = this.filterSubject.value;
    this.filterSubject.next({ ...currentFilter, searchTerm });
  }

  onDepartmentChange(department: string): void {
    const currentFilter = this.filterSubject.value;
    this.filterSubject.next({ ...currentFilter, department });
  }

  // Transfer filtering
  onTransferSearchChange(searchTerm: string): void {
    const currentFilter = this.transferFilterSubject.value;
    this.transferFilterSubject.next({ ...currentFilter, searchTerm });
  }

  onTypeChange(type: string): void {
    const currentFilter = this.transferFilterSubject.value;
    this.transferFilterSubject.next({ ...currentFilter, type });
  }

  // Employee actions
  onBulkUpdate(): void {
    if (this.selectedEmployees.length === 0) {
      this.messageService.showWarning('Please select employees to update');
      return;
    }

    this.confirmationService.confirm({
      message: `Are you sure you want to bulk update ${this.selectedEmployees.length} employee(s)?`,
      header: 'Confirm Bulk Update',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isLoading = true;
        this.employeeService.bulkUpdate(this.selectedEmployees)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.messageService.showSuccess('Employees updated successfully');
              this.selectedEmployees = [];
              this.loadData();
            },
            error: () => {
              this.messageService.showError('Failed to update employees');
            },
            complete: () => {
              this.isLoading = false;
            }
          });
      }
    });
  }

  onRequestEmployees(): void {
    this.isLoading = true;
    this.employeeService.requestEmployees()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.messageService.showSuccess('Employee request submitted successfully');
        },
        error: () => {
          this.messageService.showError('Failed to submit employee request');
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }

  onEditEmployee(employee: Employee): void {
    // Navigate to edit form - placeholder for routing
    this.messageService.showInfo(`Edit employee: ${employee.name}`);
  }

  onDeleteEmployee(employee: Employee): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${employee.name}?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.employeeService.deleteEmployee(employee.id)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.messageService.showSuccess('Employee deleted successfully');
              this.loadData();
            },
            error: () => {
              this.messageService.showError('Failed to delete employee');
            }
          });
      }
    });
  }

  // Transfer actions
  onConfirmTransfer(transfer: Transfer): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to confirm the transfer for ${transfer.employee}?`,
      header: 'Confirm Transfer',
      icon: 'pi pi-check-circle',
      accept: () => {
        this.transferService.confirmTransfer(transfer.id)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.messageService.showSuccess('Transfer confirmed successfully');
            },
            error: () => {
              this.messageService.showError('Failed to confirm transfer');
            }
          });
      }
    });
  }

  onRejectTransfer(transfer: Transfer): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to reject the transfer for ${transfer.employee}?`,
      header: 'Reject Transfer',
      icon: 'pi pi-times-circle',
      accept: () => {
        this.transferService.rejectTransfer(transfer.id)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.messageService.showSuccess('Transfer rejected successfully');
            },
            error: () => {
              this.messageService.showError('Failed to reject transfer');
            }
          });
      }
    });
  }

  onEditTransfer(transfer: Transfer): void {
    // Navigate to edit form - placeholder for routing
    this.messageService.showInfo(`Edit transfer: ${transfer.employee}`);
  }

  // Utility methods
  trackByEmployeeId(index: number, employee: Employee): string {
    return employee.id;
  }

  trackByTransferId(index: number, transfer: Transfer): string {
    return transfer.id;
  }

  getChangeTypeSeverity(changeType: ChangeType): "success" | "info" | "warning" | "danger" {
    switch (changeType) {
      case ChangeType.Update:
        return 'info';
      case ChangeType.IN:
        return 'warning';
      case ChangeType.OUT:
        return 'danger';
      default:
        return 'info';
    }
  }

  getStatusSeverity(status: TransferStatus): "success" | "info" | "warning" | "danger" {
    switch (status) {
      case TransferStatus.Confirmed:
        return 'success';
      case TransferStatus.Rejected:
        return 'danger';
      case TransferStatus.Pending:
        return 'warning';
      default:
        return 'info';
    }
  }

  private loadData(): void {
    this.isLoading = true;
    this.employeeService.getEmployees()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.isLoading = false;
        },
        error: () => {
          this.messageService.showError('Failed to load employee data');
          this.isLoading = false;
        }
      });

    this.transferService.getTransfers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        error: () => {
          this.messageService.showError('Failed to load transfer data');
        }
      });
  }

  private setupDepartmentOptions(): void {
    this.employeeService.getDepartmentOptions()
      .pipe(takeUntil(this.destroy$))
      .subscribe(departments => {
        this.departmentOptions = departments.map(dept => ({
          label: dept,
          value: dept
        }));
      });
  }

  private setupTypeOptions(): void {
    this.transferService.getTypeOptions()
      .pipe(takeUntil(this.destroy$))
      .subscribe(types => {
        this.typeOptions = types.map(type => ({
          label: type,
          value: type
        }));
      });
  }

  private filterEmployees(employees: Employee[], filter: EmployeeFilter): Employee[] {
    let filtered = employees;

    if (filter.searchTerm) {
      const searchLower = filter.searchTerm.toLowerCase();
      filtered = filtered.filter(emp =>
        emp.name.toLowerCase().includes(searchLower) ||
        emp.department.toLowerCase().includes(searchLower) ||
        emp.customer.toLowerCase().includes(searchLower) ||
        emp.workplace.toLowerCase().includes(searchLower)
      );
    }

    if (filter.department && filter.department !== 'All Dept') {
      filtered = filtered.filter(emp => emp.department === filter.department);
    }

    return filtered;
  }

  private filterTransfers(transfers: Transfer[], filter: { searchTerm: string; type: string }): Transfer[] {
    let filtered = transfers;

    if (filter.searchTerm) {
      const searchLower = filter.searchTerm.toLowerCase();
      filtered = filtered.filter(transfer =>
        transfer.employee.toLowerCase().includes(searchLower) ||
        transfer.currentDept.toLowerCase().includes(searchLower) ||
        transfer.transferTo.toLowerCase().includes(searchLower) ||
        transfer.newCustomer.toLowerCase().includes(searchLower) ||
        transfer.newWorkplace.toLowerCase().includes(searchLower)
      );
    }

    if (filter.type && filter.type !== 'All Type') {
      filtered = filtered.filter(transfer => transfer.changeType === filter.type);
    }

    return filtered;
  }
}
