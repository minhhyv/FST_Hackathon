import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';
import { TransferManagementComponent } from './transfer-management/transfer-management.component';
import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EmployeeManagementComponent, TransferManagementComponent, TabViewModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-primeng-app';
}
