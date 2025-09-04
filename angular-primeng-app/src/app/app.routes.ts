import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/employee-management',
    pathMatch: 'full'
  },
  {
    path: 'employee-management',
    loadComponent: () => import('./features/employee-management/employee-management.component')
      .then(m => m.EmployeeManagementComponent)
  }
];
