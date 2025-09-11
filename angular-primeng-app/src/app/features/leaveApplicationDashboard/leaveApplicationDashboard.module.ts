import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// PrimeNG Modules
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { TagModule } from 'primeng/tag';
import { SplitButtonModule } from 'primeng/splitbutton';
import { PanelModule } from 'primeng/panel';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { LeaveApplicationDashboardComponent } from './leaveApplicationDashboard.component';
import { LeaveApplicationDashboardRoutingModule } from './leaveApplicationDashboard-routing.module';


@NgModule({
  declarations: [
    LeaveApplicationDashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LeaveApplicationDashboardRoutingModule,
    
    // PrimeNG Modules
    ButtonModule,
    CardModule,
    TableModule,
    PaginatorModule,
    ProgressSpinnerModule,
    ToastModule,
    MessagesModule,
    TagModule,
    SplitButtonModule,
    PanelModule,
    CalendarModule,
    DropdownModule,
    TooltipModule
  ],
  exports: [
    LeaveApplicationDashboardComponent
  ]
})
export class LeaveApplicationDashboardModule { }
