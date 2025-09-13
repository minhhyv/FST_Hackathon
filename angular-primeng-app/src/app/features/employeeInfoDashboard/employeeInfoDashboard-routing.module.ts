import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeInfoDashboardComponent } from './employeeInfoDashboard.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeInfoDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeInfoDashboardRoutingModule { }
