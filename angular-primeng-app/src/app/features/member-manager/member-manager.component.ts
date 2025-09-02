import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Employee, Department, StatusSummary, FilterOptions, TabItem } from '../../models/employee.model';
import { MemberManagerService } from '../../services/member-manager.service';

type TagSeverity = "success" | "secondary" | "info" | "warning" | "danger" | "contrast";

@Component({
  selector: 'app-member-manager',
  templateUrl: './member-manager.component.html',
  styleUrls: ['./member-manager.component.scss']
})
export class MemberManagerComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  employees: Employee[] = [];
  departments: Department[] = [];
  statusSummary: StatusSummary = {
    updateCount: 0,
    inCount: 0,
    outCount: 0,
    totalCount: 0
  };

  selectedEmployees: Employee[] = [];
  searchQuery = '';
  selectedDepartment: Department | null = null;

  // Filter options
  filterTypes = [
    { label: 'All Type', value: '' },
    { label: 'Active', value: 'Active' },
    { label: 'Onboarding', value: 'Onboarding' },
    { label: 'Inactive', value: 'Inactive' }
  ];
  selectedFilterType = '';

  // Tab configuration
  tabs: TabItem[] = [
    { label: 'Member Manager', routerLink: '/member-manager' },
    { label: 'Transfer Manager', routerLink: '/transfer-manager' }
  ];

  // Table settings
  rows = 10;
  totalRecords = 0;
  first = 0;

  // Tab settings
  activeTabIndex = 0;

  constructor(private memberManagerService: MemberManagerService) {}

  ngOnInit(): void {
    this.loadInitialData();
    this.setupFilterSubscriptions();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadInitialData(): void {
    // Load departments
    this.memberManagerService.getDepartments()
      .pipe(takeUntil(this.destroy$))
      .subscribe(departments => {
        this.departments = [
          { code: '', name: 'All Dept' },
          ...departments
        ];
      });

    // Load employees
    this.memberManagerService.getFilteredEmployees()
      .pipe(takeUntil(this.destroy$))
      .subscribe(employees => {
        this.employees = employees;
        this.totalRecords = employees.length;
      });

    // Load status summary
    this.memberManagerService.getStatusSummary()
      .pipe(takeUntil(this.destroy$))
      .subscribe(summary => {
        this.statusSummary = summary;
      });
  }

  private setupFilterSubscriptions(): void {
    // Setup search debouncing
    const searchSubject = new Subject<string>();
    searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(query => {
      this.memberManagerService.updateFilterOptions({ searchQuery: query });
    });

    // Watch for search changes
    searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(query => {
      this.searchQuery = query;
      this.updateFilters();
    });
  }

  onDepartmentChange(): void {
    const selectedDeptCode = this.selectedDepartment?.code || null;
    this.memberManagerService.updateFilterOptions({ 
      selectedDepartment: selectedDeptCode 
    });
  }

  onStatusCardClick(status: string): void {
    // Filter employees by status
    console.log('Filter by status:', status);
  }

  onBulkUpdate(): void {
    if (this.selectedEmployees.length === 0) {
      alert('Please select employees to update');
      return;
    }

    const employeeIds = this.selectedEmployees.map(emp => emp.id);
    this.memberManagerService.bulkUpdateEmployees(employeeIds)
      .pipe(takeUntil(this.destroy$))
      .subscribe(success => {
        if (success) {
          alert('Bulk update completed successfully');
          this.selectedEmployees = [];
        }
      });
  }

  onRequestEmployees(): void {
    this.memberManagerService.requestEmployees()
      .pipe(takeUntil(this.destroy$))
      .subscribe(success => {
        if (success) {
          alert('Employee request submitted successfully');
        }
      });
  }

  onSearchChange(event: any): void {
    this.searchQuery = event.target.value;
    this.updateFilters();
  }

  onConfirmEmployee(employee: Employee): void {
    this.memberManagerService.confirmEmployee(employee.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(success => {
        if (success) {
          console.log('Confirmed employee:', employee.name);
        }
      });
  }

  onRejectEmployee(employee: Employee): void {
    this.memberManagerService.rejectEmployee(employee.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(success => {
        if (success) {
          console.log('Rejected employee:', employee.name);
        }
      });
  }

  onFilterTypeChange(): void {
    this.updateFilters();
  }

  private updateFilters(): void {
    this.memberManagerService.updateFilterOptions({
      searchQuery: this.searchQuery,
      selectedDepartment: this.selectedDepartment?.code || null
    });
  }

  onTabChange(event: any): void {
    this.activeTabIndex = event.index;
    // Tab navigation would be handled by router in a real implementation
    console.log('Tab changed to:', this.tabs[event.index].label);
  }

  onEditEmployee(employee: Employee): void {
    this.memberManagerService.editEmployee(employee.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(success => {
        if (success) {
          console.log('Edit employee:', employee.name);
        }
      });
  }

  onViewEmployee(employee: Employee): void {
    this.memberManagerService.viewEmployee(employee.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(employeeData => {
        if (employeeData) {
          console.log('View employee:', employeeData);
        }
      });
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
    this.memberManagerService.updateFilterOptions({
      currentPage: event.page,
      pageSize: event.rows
    });
  }

  getChangeTypeClass(changeType?: string): string {
    switch (changeType) {
      case 'IN':
        return 'change-type-in';
      case 'OUT':
        return 'change-type-out';
      default:
        return '';
    }
  }

  getStatusSeverity(status: string): TagSeverity {
    switch (status) {
      case 'Confirm':
        return 'success';
      case 'Reject':
        return 'danger';
      default:
        return 'info';
    }
  }

  getWorkingStatusSeverity(status: string): TagSeverity {
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
}
