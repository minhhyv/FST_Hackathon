import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Employee, Department, StatusSummary, FilterOptions } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class MemberManagerService {
  private employeesSubject = new BehaviorSubject<Employee[]>([]);
  private filterOptionsSubject = new BehaviorSubject<FilterOptions>({
    searchQuery: '',
    selectedDepartment: null,
    pageSize: 10,
    currentPage: 0
  });

  // Mock data
  private mockEmployees: Employee[] = [
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
      status: 'Confirm',
      canEdit: true
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
      status: 'Reject',
      canEdit: true
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
      status: 'Confirm',
      canEdit: true
    }
  ];

  private mockDepartments: Department[] = [
    { code: 'FJP HR', name: 'FJP Human Resources' },
    { code: 'FJP IT', name: 'FJP Information Technology' },
    { code: 'FJP FIN', name: 'FJP Finance' }
  ];

  constructor() {
    this.employeesSubject.next(this.mockEmployees);
  }

  getEmployees(): Observable<Employee[]> {
    return this.employeesSubject.asObservable();
  }

  getFilteredEmployees(): Observable<Employee[]> {
    return this.employeesSubject.pipe(
      map(employees => {
        const filters = this.filterOptionsSubject.value;
        let filtered = employees;

        // Search by name
        if (filters.searchQuery) {
          filtered = filtered.filter(emp => 
            emp.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
          );
        }

        // Filter by department
        if (filters.selectedDepartment) {
          filtered = filtered.filter(emp => emp.currentDept === filters.selectedDepartment);
        }

        return filtered;
      })
    );
  }

  getDepartments(): Observable<Department[]> {
    return of(this.mockDepartments).pipe(delay(100));
  }

  getStatusSummary(): Observable<StatusSummary> {
    return this.employeesSubject.pipe(
      map(employees => {
        const updateCount = employees.filter(emp => emp.status === 'Confirm' && !emp.changeType).length;
        const inCount = employees.filter(emp => emp.changeType === 'IN').length;
        const outCount = employees.filter(emp => emp.changeType === 'OUT').length;
        const totalCount = employees.length;

        return {
          updateCount,
          inCount,
          outCount,
          totalCount
        };
      })
    );
  }

  updateFilterOptions(filters: Partial<FilterOptions>): void {
    const currentFilters = this.filterOptionsSubject.value;
    this.filterOptionsSubject.next({ ...currentFilters, ...filters });
  }

  getFilterOptions(): Observable<FilterOptions> {
    return this.filterOptionsSubject.asObservable();
  }

  // Mock methods for actions
  confirmEmployee(employeeId: string): Observable<boolean> {
    console.log('Confirming employee:', employeeId);
    const employeeIndex = this.mockEmployees.findIndex(emp => emp.id === employeeId);
    if (employeeIndex !== -1) {
      this.mockEmployees[employeeIndex].status = 'Confirm';
      this.employeesSubject.next([...this.mockEmployees]);
    }
    return of(true).pipe(delay(500));
  }

  rejectEmployee(employeeId: string): Observable<boolean> {
    console.log('Rejecting employee:', employeeId);
    const employeeIndex = this.mockEmployees.findIndex(emp => emp.id === employeeId);
    if (employeeIndex !== -1) {
      this.mockEmployees[employeeIndex].status = 'Reject';
      this.employeesSubject.next([...this.mockEmployees]);
    }
    return of(true).pipe(delay(500));
  }

  bulkUpdateEmployees(employeeIds: string[]): Observable<boolean> {
    console.log('Bulk updating employees:', employeeIds);
    return of(true).pipe(delay(1000));
  }

  requestEmployees(): Observable<boolean> {
    console.log('Requesting employees');
    return of(true).pipe(delay(1000));
  }

  editEmployee(employeeId: string): Observable<boolean> {
    console.log('Editing employee:', employeeId);
    return of(true).pipe(delay(500));
  }

  viewEmployee(employeeId: string): Observable<Employee | null> {
    const employee = this.mockEmployees.find(emp => emp.id === employeeId);
    return of(employee || null).pipe(delay(300));
  }
}
