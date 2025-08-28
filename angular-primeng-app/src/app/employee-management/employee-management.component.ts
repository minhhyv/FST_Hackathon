import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';
import { Employee, Department, StatusSummary } from '../models/employee.model';

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
    TabViewModule,
    CardModule,
    CheckboxModule,
    TooltipModule
  ],
  templateUrl: './employee-management.component.html',
  styleUrl: './employee-management.component.css'
})
export class EmployeeManagementComponent implements OnInit {
  employees: Employee[] = [];
  departments: Department[] = [];
  statusSummary: StatusSummary = { updateCount: 0, inCount: 0, outCount: 0, totalCount: 0 };
  
  searchTerm: string = '';
  selectedDepartment: Department | null = null;
  selectedEmployees: Employee[] = [];
  
  activeTab: number = 0; // 0 for Member Manager, 1 for Transfer Manager

  ngOnInit() {
    this.loadDepartments();
    this.loadEmployees();
    this.calculateStatusSummary();
  }

  loadDepartments() {
    this.departments = [
      { id: '1', name: 'All Dept', code: 'ALL' },
      { id: '2', name: 'FJP HR', code: 'FJP_HR' },
      { id: '3', name: 'IT Department', code: 'IT' },
      { id: '4', name: 'Finance', code: 'FIN' }
    ];
    this.selectedDepartment = this.departments[0]; // Default to "All Dept"
  }

  loadEmployees() {
    this.employees = [
      {
        id: '1',
        name: 'AnNV (Nguyen Van A)',
        currentDept: 'FJP HR',
        workingStatus: 'Active',
        transferTo: '',
        newCustomer: 'HeadOffice',
        newContract: 'HeadOffice',
        newWorkplace: 'Mita',
        changeType: 'IN',
        status: 'Confirm'
      },
      {
        id: '2',
        name: 'BeTT (Tran Thi Be)',
        currentDept: 'FJP HR',
        workingStatus: 'Onboarding',
        transferTo: 'IT Department',
        newCustomer: 'FST',
        newContract: 'Juninin',
        newWorkplace: 'Tokyo',
        changeType: 'IN',
        status: 'Confirm'
      },
      {
        id: '3',
        name: 'XeLV (Le Van Xe)',
        currentDept: 'FJP HR',
        workingStatus: 'Active',
        transferTo: 'Finance',
        newCustomer: 'Honda',
        newContract: 'Haken',
        newWorkplace: 'Osaka',
        changeType: 'OUT',
        status: 'Reject'
      }
    ];
  }

  calculateStatusSummary() {
    this.statusSummary.updateCount = 0; // No longer using 'Update' type
    this.statusSummary.inCount = this.employees.filter(e => e.changeType === 'IN').length;
    this.statusSummary.outCount = this.employees.filter(e => e.changeType === 'OUT').length;
    this.statusSummary.totalCount = this.employees.length;
  }

  onTabChange(event: any) {
    this.activeTab = event.index;
  }

  onSearch() {
    // Implement search functionality
    console.log('Searching for:', this.searchTerm);
  }

  onDepartmentChange() {
    // Implement department filter
    console.log('Department changed to:', this.selectedDepartment);
  }

  onEmployeeSelect(employee: Employee) {
    if (employee.selected) {
      this.selectedEmployees.push(employee);
    } else {
      this.selectedEmployees = this.selectedEmployees.filter(e => e.id !== employee.id);
    }
  }

  onBulkUpdate() {
    console.log('Bulk update for:', this.selectedEmployees);
  }

  onRequestEmployees() {
    console.log('Request employees clicked');
  }

  onEditEmployee(employee: Employee) {
    console.log('Edit employee:', employee);
  }

  onViewEmployee(employee: Employee) {
    console.log('View employee:', employee);
  }

  getChangeTypeClass(changeType: string): string {
    switch (changeType) {
      case 'Update': return 'change-update';
      case 'IN': return 'change-in';
      case 'OUT': return 'change-out';
      default: return '';
    }
  }
}
