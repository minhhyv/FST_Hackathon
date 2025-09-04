import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, Observable, combineLatest } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged, switchMap, startWith } from 'rxjs/operators';

// PrimeNG Imports
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { CheckboxModule } from 'primeng/checkbox';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

import { EmployeeService } from '../../services/employee.service';
import { MessageService } from '../../services/message.service';
import { Employee, Department, StatusSummary } from '../../models/employee.model';

@Component({
  selector: 'app-employee-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    CardModule,
    TabViewModule,
    CheckboxModule,
    TagModule,
    TooltipModule
  ],
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.scss']
})
export class EmployeeManagementComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private searchTermSubject = new Subject<string>();

  // Observable data
  employees$: Observable<Employee[]>;
  departments$: Observable<Department[]>;
  statusSummary$: Observable<StatusSummary>;

  // Component state
  selectedEmployees: Employee[] = [];
  searchTerm = '';
  selectedDepartment: Department | null = null;
  activeTabIndex = 0;

  // Table configuration
  first = 0;
  rows = 10;

  constructor(
    private employeeService: EmployeeService,
    private messageService: MessageService
  ) {
    this.departments$ = this.employeeService.getDepartments();
    this.statusSummary$ = this.employeeService.getStatusSummary();
    
    // Setup search with debounce
    this.employees$ = combineLatest([
      this.searchTermSubject.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged()
      ),
      this.employeeService.getEmployees()
    ]).pipe(
      switchMap(([searchTerm, employees]) => {
        if (!searchTerm) {
          return this.employeeService.getEmployees();
        }
        return this.employeeService.searchEmployees(searchTerm);
      })
    );
  }

  ngOnInit(): void {
    // Initialize component
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.searchTermSubject.next(this.searchTerm);
  }

  onDepartmentChange(department: Department): void {
    this.selectedDepartment = department;
    if (department.code === 'ALL') {
      this.employees$ = this.employeeService.getEmployees();
    } else {
      this.employees$ = this.employeeService.filterByDepartment(department.code);
    }
  }

  onTabChange(event: any): void {
    this.activeTabIndex = event.index;
    // Handle tab switching logic here
    if (event.index === 1) {
      // Transfer Manager tab
      this.messageService.showInfo('Transfer Manager functionality coming soon');
    }
  }

  onSelectionChange(event: Employee[]): void {
    this.selectedEmployees = event;
  }

  onBulkUpdate(): void {
    if (this.selectedEmployees.length === 0) {
      this.messageService.showWarn('Please select employees to update');
      return;
    }

    this.messageService.showInfo(`Bulk updating ${this.selectedEmployees.length} employees`);
    
    // Simulate bulk update
    const updatedEmployees = this.selectedEmployees.map(emp => ({
      ...emp,
      changeType: 'Update' as const
    }));

    this.employeeService.bulkUpdateEmployees(updatedEmployees)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.messageService.showSuccess('Employees updated successfully');
          this.selectedEmployees = [];
        },
        error: () => {
          this.messageService.showError('Failed to update employees');
        }
      });
  }

  onRequestEmployees(): void {
    this.messageService.showInfo('Request Employees functionality coming soon');
  }

  onEditEmployee(employee: Employee): void {
    this.messageService.showInfo(`Editing employee: ${employee.name}`);
    // Navigate to edit form or open edit dialog
  }

  onViewEmployee(employee: Employee): void {
    this.messageService.showInfo(`Viewing employee: ${employee.name}`);
    // Navigate to detail view or open detail dialog
  }

  getStatusSeverity(status: string): "success" | "secondary" | "info" | "warning" | "danger" | "contrast" | undefined {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Onboarding':
        return 'warning';
      case 'Inactive':
        return 'danger';
      default:
        return 'info';
    }
  }

  getChangeTypeClass(changeType: string | null): string {
    switch (changeType) {
      case 'Update':
        return 'status-update';
      case 'IN':
        return 'status-in';
      case 'OUT':
        return 'status-out';
      default:
        return '';
    }
  }

  trackByEmployeeId(index: number, employee: Employee): string {
    return employee.id;
  }
}
