import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { AvatarService } from '../../services/avatar.service';
import { Employee, Certificate, Award, WorkHistory } from '../../models/employee.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EMPLOYEE_MOCK_DATA } from '../../data/employee.mock';

@Component({
  selector: 'app-employee-info-dashboard',
  templateUrl: './employeeInfoDashboard.component.html',
  styleUrls: ['./employeeInfoDashboard.component.scss']
})
export class EmployeeInfoDashboardComponent implements OnInit, OnDestroy {
  employee: Employee | null = null;
  isLoading = false;
  errorMessage: string | null = null;
  chartDataLoaded = false;

  // Chart options
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true
        }
      },
      y: {
        display: true,
        title: {
          display: true
        }
      }
    }
  };

  private destroy$ = new Subject<void>();

  constructor(
    private messageService: MessageService,
    private avatarService: AvatarService
  ) {}

  ngOnInit(): void {
    this.loadEmployeeData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Avatar handling methods
  getEmployeeAvatar(): string {
    return this.avatarService.getAvatarUrl(
      this.employee?.avatarUrl, 
      this.employee?.fullName
    );
  }

  getUserAvatar(): string {
    return this.avatarService.getAvatarUrl(
      'assets/images/avatars/user-avatar.svg', 
      'PhucNKM2'
    );
  }

  onAvatarError(event: any): void {
    // Fallback to generated avatar if image fails to load
    if (this.employee?.fullName) {
      event.target.src = this.avatarService.generateAvatarDataUrl({
        name: this.employee.fullName
      });
    } else {
      event.target.src = 'assets/images/avatars/default-avatar.svg';
    }
  }

  loadEmployeeData(): void {
    this.isLoading = true;

    // Simulate loading delay with setTimeout
    setTimeout(() => {
      try {
        this.employee = EMPLOYEE_MOCK_DATA;
        this.isLoading = false;
        this.chartDataLoaded = true;
      } catch (error) {
        this.errorMessage = 'Failed to load employee data';
        this.isLoading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load employee information'
        });
      }
    }, 1000); // 1 second delay to simulate loading
  }

  onChartHover(event: any): void {
    // Handle chart hover events for detailed tooltips
    console.log('Chart hover:', event);
  }

  onCertificateClick(certificate: Certificate): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Certificate Details',
      detail: `${certificate.name} - ${certificate.issuer}`
    });
  }

  onAwardClick(award: Award): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Award Details',
      detail: `${award.title} - ${award.description}`
    });
  }

  onHistoryItemClick(historyItem: WorkHistory): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Work History',
      detail: `${historyItem.position} at ${historyItem.project}`
    });
  }

  trackByCertificateId(index: number, certificate: Certificate): string {
    return certificate.id;
  }

  trackByAwardId(index: number, award: Award): string {
    return award.id;
  }

  trackByHistoryId(index: number, history: WorkHistory): string {
    return history.id;
  }
}
