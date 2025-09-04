import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { Employee, Department, StatusSummary } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeesSubject = new BehaviorSubject<Employee[]>([]);
  private departmentsSubject = new BehaviorSubject<Department[]>([]);
  
  employees$ = this.employeesSubject.asObservable();
  departments$ = this.departmentsSubject.asObservable();

  constructor() {
    this.loadMockData();
  }

  private loadMockData(): void {
    const mockEmployees: Employee[] = [
      {
        id: '1',
        name: 'AnNV (Nguyen Van A)',
        department: 'FJP HR',
        workingStatus: 'Active',
        customer: 'HeadOffice',
        customerContract: 'HeadOffice',
        workplace: 'Mita',
        changeType: 'Update'
      },
      {
        id: '2',
        name: 'BeTT (Tran Thi Be)',
        department: 'FJP HR',
        workingStatus: 'Onboarding',
        customer: 'FST',
        customerContract: 'Juninin',
        workplace: 'Tokyo',
        changeType: 'IN'
      },
      {
        id: '3',
        name: 'XeLV (Le Van Xe)',
        department: 'FJP HR',
        workingStatus: 'Active',
        customer: 'Honda',
        customerContract: 'Haken',
        workplace: 'Osaka',
        changeType: 'OUT'
      }
    ];

    const mockDepartments: Department[] = [
      { code: 'ALL', name: 'All Dept', isActive: true },
      { code: 'FJP_HR', name: 'FJP HR', isActive: true },
      { code: 'FJP_DEV', name: 'FJP Development', isActive: true },
      { code: 'FJP_QA', name: 'FJP Quality Assurance', isActive: true }
    ];

    this.employeesSubject.next(mockEmployees);
    this.departmentsSubject.next(mockDepartments);
  }

  getEmployees(): Observable<Employee[]> {
    return this.employees$;
  }

  getDepartments(): Observable<Department[]> {
    return this.departments$;
  }

  getStatusSummary(): Observable<StatusSummary> {
    return this.employees$.pipe(
      map(employees => ({
        updateCount: employees.filter(e => e.changeType === 'Update').length,
        inCount: employees.filter(e => e.changeType === 'IN').length,
        outCount: employees.filter(e => e.changeType === 'OUT').length,
        totalCount: employees.length
      }))
    );
  }

  searchEmployees(searchTerm: string): Observable<Employee[]> {
    return this.employees$.pipe(
      map(employees => 
        employees.filter(emp => 
          emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.customer.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
  }

  filterByDepartment(departmentCode: string): Observable<Employee[]> {
    if (departmentCode === 'ALL') {
      return this.employees$;
    }
    
    return this.employees$.pipe(
      map(employees => 
        employees.filter(emp => emp.department === departmentCode)
      )
    );
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    const employees = this.employeesSubject.value;
    const index = employees.findIndex(e => e.id === employee.id);
    
    if (index !== -1) {
      employees[index] = { ...employee };
      this.employeesSubject.next([...employees]);
    }
    
    return of(employee).pipe(delay(500));
  }

  bulkUpdateEmployees(employees: Employee[]): Observable<Employee[]> {
    const currentEmployees = this.employeesSubject.value;
    
    employees.forEach(updatedEmp => {
      const index = currentEmployees.findIndex(e => e.id === updatedEmp.id);
      if (index !== -1) {
        currentEmployees[index] = { ...updatedEmp };
      }
    });
    
    this.employeesSubject.next([...currentEmployees]);
    return of(employees).pipe(delay(1000));
  }
}