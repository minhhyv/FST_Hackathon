import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/employee-info',
    pathMatch: 'full'
  },
  {
    path: 'employee-info',
    loadChildren: () => import('./features/employeeInfoDashboard/employeeInfoDashboard.module').then(m => m.EmployeeInfoDashboardModule)
  },

];
