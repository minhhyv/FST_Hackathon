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
import { Employee, Department } from '../models/employee.model';

@Component({
  selector: 'app-transfer-management',
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
  templateUrl: './transfer-management.component.html',
  styleUrl: './transfer-management.component.css'
})
export class TransferManagementComponent implements OnInit {
  employees: Employee[] = [];
  typeOptions: Department[] = [];
  
  searchTerm: string = '';
  selectedType: Department | null = null;
  
  activeTab: number = 0; // 0 for Member Manager, 1 for Transfer Manager

  ngOnInit() {
    this.loadTypeOptions();
    this.loadEmployees();
  }

  loadTypeOptions() {
    this.typeOptions = [
      { id: '1', name: 'All Type', code: 'ALL' },
      { id: '2', name: 'IN Type', code: 'IN' },
      { id: '3', name: 'OUT Type', code: 'OUT' }
    ];
    this.selectedType = this.typeOptions[0]; // Default to "All Type"
  }

  loadEmployees() {
    this.employees = [
      {
        id: '1',
        name: 'AnNV (Nguyen Van A)',
        workingStatus: 'Active',
        currentDept: 'FJP FST',
        transferTo: 'FJP HR',
        newCustomer: 'HeadOffice',
        newContract: 'HeadOffice',
        newWorkplace: 'Mita',
        changeType: 'IN',
        status: 'Confirm'
      },
      {
        id: '2',
        name: 'BeTT (Tran Thi Be)',
        workingStatus: 'Onboarding',
        currentDept: 'FJP AF',
        transferTo: 'FJP HR',
        newCustomer: 'FST',
        newContract: 'Juninin',
        newWorkplace: 'Tokyo',
        changeType: 'IN',
        status: 'Reject'
      },
      {
        id: '3',
        name: 'XeLV (Le Van Xe)',
        workingStatus: 'Active',
        currentDept: 'FJP HR',
        transferTo: 'FJP FST',
        newCustomer: 'Honda',
        newContract: 'Haken',
        newWorkplace: 'Osaka',
        changeType: 'OUT',
        status: 'Confirm'
      }
    ];
  }

  onTabChange(event: any) {
    this.activeTab = event.index;
  }

  onSearch() {
    // Implement search functionality
    console.log('Searching for:', this.searchTerm);
  }

  onTypeChange() {
    // Implement type filter
    console.log('Type changed to:', this.selectedType);
  }

  onConfirmEmployee(employee: Employee) {
    console.log('Confirm employee:', employee);
    // Implement confirm logic - update employee status
    employee.status = 'Confirm';
  }

  onRejectEmployee(employee: Employee) {
    console.log('Reject employee:', employee);
    // Implement reject logic - update employee status
    employee.status = 'Reject';
  }

  onEditEmployee(employee: Employee) {
    console.log('Edit employee:', employee);
    // Implement edit logic - open edit form/modal
  }

  getChangeTypeClass(changeType: string): string {
    switch (changeType) {
      case 'IN': return 'change-in';
      case 'OUT': return 'change-out';
      default: return '';
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Confirm': return 'status-confirm';
      case 'Reject': return 'status-reject';
      default: return '';
    }
  }
}
