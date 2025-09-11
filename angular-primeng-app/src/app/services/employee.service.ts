import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeeSubject = new BehaviorSubject<Employee | null>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public employee$ = this.employeeSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();

  constructor() {}

  getEmployeeById(id: string): Observable<Employee> {
    this.loadingSubject.next(true);
    
    // Mock data matching the specification
    const mockEmployee: Employee = {
      id: "emp-001",
      employeeId: "200057",
      fullName: "Nguyen Hoang Minh",
      avatarUrl: "assets/images/avatars/nguyen-hoang-minh.svg",
      department: "FPT Software Japan",
      position: "Senior Software Developer",
      contractInfo: {
        startDate: "2024-08-08",
        contractType: "1st Year Contract",
        position: "CEO",
        department: "DEVOI",
        level: "HOKKAIDO",
        grade: "NT/Aide=HQSC"
      },
      certificates: [
        {
          id: "cert-001",
          name: "PMP (Certified by PMI)",
          issuer: "PMI",
          issueDate: "2025/06/01",
          expiryDate: "2026-03-15",
          status: "Active"
        },
        {
          id: "cert-002",
          name: "AWS Architect Associate",
          issuer: "Amazon Web Services",
          issueDate: "2024/12/04",
          expiryDate: "2026-01-20",
          status: "Active"
        },
        {
          id: "cert-003",
          name: "IBM Certified Solution Designer",
          issuer: "IBM",
          issueDate: "2022-11-10",
          expiryDate: "2025-11-10",
          status: "Active"
        }
      ],
      awards: [
        {
          id: "award-001",
          title: "AI Project Distinguished Contributor",
          description: "Outstanding contribution to AI project development",
          awardDate: "2023-12-15",
          category: "Excellence"
        },
        {
          id: "award-002",
          title: "Outstanding Contributor",
          description: "Exceptional performance in team collaboration",
          awardDate: "2023-06-20",
          category: "Teamwork"
        }
      ],
      workHistory: [
        {
          id: "hist-001",
          period: "2023-2024",
          position: "Senior Developer",
          project: "AI Analytics Platform",
          description: "Led development of machine learning analytics dashboard"
        },
        {
          id: "hist-002",
          period: "2022-2023",
          position: "Full Stack Developer",
          project: "E-commerce Platform",
          description: "Developed customer-facing web application using Angular and Node.js"
        }
      ],
      performanceData: {
        creEvaluation: {
          labels: ["2023-01", "2023-02", "2023-03", "2023-04", "2023-05", "2023-06"],
          datasets: [
            {
              label: "Feedback",
              data: [3.2, 3.5, 3.8, 4.1, 4.0, 4.2],
              borderColor: "#8B5CF6",
              backgroundColor: "rgba(139, 92, 246, 0.1)",
              tension: 0.4
            },
            {
              label: "Technical",
              data: [3.8, 4.0, 4.2, 4.3, 4.1, 4.4],
              borderColor: "#F59E0B",
              backgroundColor: "rgba(245, 158, 11, 0.1)",
              tension: 0.4
            }
          ]
        },
        timesheetData: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              label: "OT Time",
              data: [25, 30, 18, 42, 38, 65, 45, 28, 35, 40, 32, 28],
              backgroundColor: "#3B82F6"
            },
            {
              label: "Leave Time", 
              data: [8, 12, 15, 10, 16, 8, 20, 14, 12, 8, 18, 22],
              backgroundColor: "#F59E0B"
            },
            {
              label: "Work Hours",
              data: [160, 155, 168, 172, 164, 158, 145, 170, 165, 175, 162, 150],
              backgroundColor: "#10B981"
            }
          ]
        },
        auditSurveyData: {
          labels: ["2023-Q1", "2023-Q2", "2023-Q3", "2023-Q4", "2024-Q1", "2024-Q2"],
          datasets: [
            {
              label: "Job Satisfaction",
              data: [7.5, 8.2, 8.0, 8.5, 8.3, 8.7],
              borderColor: "#06B6D4",
              backgroundColor: "rgba(6, 182, 212, 0.1)",
              tension: 0.4
            },
            {
              label: "Supervisor Satisfaction", 
              data: [8.0, 8.1, 7.8, 8.3, 8.5, 8.4],
              borderColor: "#10B981",
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              tension: 0.4
            },
            {
              label: "Team Satisfaction",
              data: [7.8, 8.0, 8.2, 8.1, 8.4, 8.6],
              borderColor: "#8B5CF6",
              backgroundColor: "rgba(139, 92, 246, 0.1)",
              tension: 0.4
            },
            {
              label: "Company Satisfaction",
              data: [7.2, 7.5, 7.8, 8.0, 8.1, 8.3],
              borderColor: "#F59E0B",
              backgroundColor: "rgba(245, 158, 11, 0.1)",
              tension: 0.4
            }
          ]
        },
        essSurveyData: {
          labels: ["Category 1", "Category 2", "Category 3", "Category 4"],
          datasets: [
            {
              label: "Engagement Index",
              data: [85, 92, 78, 88],
              backgroundColor: "#EF4444"
            },
            {
              label: "Top Management",
              data: [78, 85, 82, 90],
              backgroundColor: "#F59E0B"
            },
            {
              label: "Manager",
              data: [88, 90, 85, 92],
              backgroundColor: "#10B981"
            },
            {
              label: "Individual Contributor",
              data: [82, 88, 90, 85],
              backgroundColor: "#3B82F6"
            },
            {
              label: "Communication & Learning",
              data: [90, 85, 88, 92],
              backgroundColor: "#8B5CF6"
            },
            {
              label: "Global HQs",
              data: [85, 88, 82, 90],
              backgroundColor: "#EF4444"
            }
          ]
        }
      }
    };

    return of(mockEmployee).pipe(
      delay(1000), // Simulate API delay
    );
  }

  setEmployee(employee: Employee): void {
    this.employeeSubject.next(employee);
    this.loadingSubject.next(false);
  }
}
