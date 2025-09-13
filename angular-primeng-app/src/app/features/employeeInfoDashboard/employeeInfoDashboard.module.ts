import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// PrimeNG Imports
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';
import { AvatarModule } from 'primeng/avatar';
import { ToolbarModule } from 'primeng/toolbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';

import { EmployeeInfoDashboardComponent } from './employeeInfoDashboard.component';
import { EmployeeInfoDashboardRoutingModule } from './employeeInfoDashboard-routing.module';

@NgModule({
  declarations: [
    EmployeeInfoDashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    EmployeeInfoDashboardRoutingModule,
    // PrimeNG
    CardModule,
    PanelModule,
    ChartModule,
    AvatarModule,
    ToolbarModule,
    ProgressSpinnerModule,
    MessageModule
  ],
  exports: [
    EmployeeInfoDashboardComponent
  ]
})
export class EmployeeInfoDashboardModule { }
