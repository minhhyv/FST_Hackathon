import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaveApplicationDashboardComponent } from './leaveApplicationDashboard.component';

const routes: Routes = [
  {
    path: '',
    component: LeaveApplicationDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveApplicationDashboardRoutingModule { }
