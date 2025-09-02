import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/member-manager',
    pathMatch: 'full'
  },
  {
    path: 'member-manager',
    loadChildren: () => import('./features/member-manager/member-manager.module').then(m => m.MemberManagerModule)
  }
];
