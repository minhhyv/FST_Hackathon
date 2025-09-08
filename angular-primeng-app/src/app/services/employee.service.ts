import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Employee, StatusCounts } from '../models/employee';
import { WorkingStatus } from '../enum/workingStatus';
import { ChangeType } from '../enum/changeType';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeesSubject = new BehaviorSubject<Employee[]>([]);
  public employees$ = this.employeesSubject.asObservable();

  private mockEmployees: Employee[] = [
    {
      id: '1',
      name: 'AnNV (Nguyen Van A)',
      department: 'FJP HR',
      workingStatus: WorkingStatus.Active,
      customer: 'HeadOffice',
      customerContract: 'HeadOffice',
      workplace: 'Mita',
      changeType: ChangeType.Update
    },
    {
      id: '2',
      name: 'BeTT (Tran Thi Be)',
      department: 'FJP HR',
      workingStatus: WorkingStatus.Onboarding,
      customer: 'FST',
      customerContract: 'Juninin',
      workplace: 'Tokyo',
      changeType: ChangeType.IN
    },
    {
      id: '3',
      name: 'XeLV (Le Van Xe)',
      department: 'FJP HR',
      workingStatus: WorkingStatus.Active,
      customer: 'Honda',
      customerContract: 'Haken',
      workplace: 'Osaka',
      changeType: ChangeType.OUT
    }
  ];

  constructor() {
    this.employeesSubject.next(this.mockEmployees);
  }

  getEmployees(): Observable<Employee[]> {
    return of(this.mockEmployees).pipe(delay(500));
  }

  getStatusCounts(employees: Employee[]): StatusCounts {
    return {
      update: employees.filter(emp => emp.changeType === ChangeType.Update).length,
      in: employees.filter(emp => emp.changeType === ChangeType.IN).length,
      out: employees.filter(emp => emp.changeType === ChangeType.OUT).length,
      total: employees.length
    };
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return of(employee).pipe(delay(300));
  }

  deleteEmployee(id: string): Observable<boolean> {
    const employees = this.employeesSubject.value.filter(emp => emp.id !== id);
    this.employeesSubject.next(employees);
    return of(true).pipe(delay(300));
  }

  bulkUpdate(employees: Employee[]): Observable<boolean> {
    return of(true).pipe(delay(500));
  }

  requestEmployees(): Observable<boolean> {
    return of(true).pipe(delay(300));
  }

  getDepartmentOptions(): Observable<string[]> {
    return of(['FJP HR', 'FJP AF', 'FJP FST', 'All Dept']);
  }
}
