import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/employee-info',
    pathMatch: 'full'
  },
  {
    path: 'leave',
    loadChildren: () => import('./features/leaveApplicationDashboard/leaveApplicationDashboard.module').then(m => m.LeaveApplicationDashboardModule)
  },
  {
    path: 'employee-info',
    loadChildren: () => import('./features/employeeInfoDashboard/employeeInfoDashboard.module').then(m => m.EmployeeInfoDashboardModule)
  }
];
