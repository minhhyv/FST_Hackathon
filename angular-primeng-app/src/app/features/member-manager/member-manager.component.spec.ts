import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { MemberManagerComponent } from './member-manager.component';
import { MemberManagerService } from '../../services/member-manager.service';
import { Employee, Department, StatusSummary } from '../../models/employee.model';

// PrimeNG Modules for testing
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';

describe('MemberManagerComponent', () => {
  let component: MemberManagerComponent;
  let fixture: ComponentFixture<MemberManagerComponent>;
  let mockMemberManagerService: any;

  const mockEmployees: Employee[] = [
    {
      id: '1',
      name: 'Test Employee',
      dept: 'IT',
      workingStatus: 'Active',
      customer: 'Test Customer',
      customerContract: 'Test Contract',
      workplace: 'Test Location',
      changeType: 'Update'
    }
  ];

  const mockDepartments: Department[] = [
    { code: 'IT', name: 'Information Technology' },
    { code: 'HR', name: 'Human Resources' }
  ];

  const mockStatusSummary: StatusSummary = {
    updateCount: 1,
    inCount: 0,
    outCount: 0,
    totalCount: 1
  };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('MemberManagerService', [
      'getDepartments',
      'getFilteredEmployees',
      'getStatusSummary',
      'updateFilterOptions',
      'getFilterOptions',
      'bulkUpdateEmployees',
      'requestEmployees',
      'editEmployee',
      'viewEmployee'
    ]);

    await TestBed.configureTestingModule({
      declarations: [MemberManagerComponent],
      imports: [
        FormsModule,
        TabViewModule,
        InputTextModule,
        DropdownModule,
        ButtonModule,
        TableModule,
        CheckboxModule,
        TooltipModule
      ],
      providers: [
        { provide: MemberManagerService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MemberManagerComponent);
    component = fixture.componentInstance;
    mockMemberManagerService = TestBed.inject(MemberManagerService);

    // Setup default mock returns
    mockMemberManagerService.getDepartments.and.returnValue(of(mockDepartments));
    mockMemberManagerService.getFilteredEmployees.and.returnValue(of(mockEmployees));
    mockMemberManagerService.getStatusSummary.and.returnValue(of(mockStatusSummary));
    mockMemberManagerService.getFilterOptions.and.returnValue(of({
      searchQuery: '',
      selectedDepartment: null,
      pageSize: 10,
      currentPage: 0
    }));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load initial data on init', () => {
    component.ngOnInit();

    expect(mockMemberManagerService.getDepartments).toHaveBeenCalled();
    expect(mockMemberManagerService.getFilteredEmployees).toHaveBeenCalled();
    expect(mockMemberManagerService.getStatusSummary).toHaveBeenCalled();
  });

  it('should handle department change', () => {
    component.selectedDepartment = mockDepartments[0];
    component.onDepartmentChange();

    expect(mockMemberManagerService.updateFilterOptions).toHaveBeenCalledWith({
      selectedDepartment: 'IT'
    });
  });

  it('should handle bulk update', () => {
    mockMemberManagerService.bulkUpdateEmployees.and.returnValue(of(true));
    component.selectedEmployees = mockEmployees;

    spyOn(window, 'alert');
    component.onBulkUpdate();

    expect(mockMemberManagerService.bulkUpdateEmployees).toHaveBeenCalledWith(['1']);
  });

  it('should show alert when no employees selected for bulk update', () => {
    component.selectedEmployees = [];
    spyOn(window, 'alert');

    component.onBulkUpdate();

    expect(window.alert).toHaveBeenCalledWith('Please select employees to update');
    expect(mockMemberManagerService.bulkUpdateEmployees).not.toHaveBeenCalled();
  });

  it('should handle employee edit', () => {
    mockMemberManagerService.editEmployee.and.returnValue(of(true));
    const employee = mockEmployees[0];

    component.onEditEmployee(employee);

    expect(mockMemberManagerService.editEmployee).toHaveBeenCalledWith('1');
  });

  it('should handle employee view', () => {
    mockMemberManagerService.viewEmployee.and.returnValue(of(mockEmployees[0]));
    const employee = mockEmployees[0];

    component.onViewEmployee(employee);

    expect(mockMemberManagerService.viewEmployee).toHaveBeenCalledWith('1');
  });

  it('should track employees by id', () => {
    const employee = mockEmployees[0];
    const result = component.trackByEmployeeId(0, employee);

    expect(result).toBe('1');
  });

  it('should return correct change type class', () => {
    expect(component.getChangeTypeClass('Update')).toBe('change-type-update');
    expect(component.getChangeTypeClass('IN')).toBe('change-type-in');
    expect(component.getChangeTypeClass('OUT')).toBe('change-type-out');
    expect(component.getChangeTypeClass('Unknown')).toBe('');
  });
});
