import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/employee-management',
    pathMatch: 'full'
  },
  {
    path: 'employee-management',
    loadChildren: () => import('./features/employee-management/employeeManagement.module').then(m => m.EmployeeManagementModule)
  }
];
