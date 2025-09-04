import { Injectable } from '@angular/core';
import { MessageService as PrimeMessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  
  constructor(private primeMessageService: PrimeMessageService) {}

  showSuccess(detail: string, summary = 'Success'): void {
    this.primeMessageService.add({
      severity: 'success',
      summary,
      detail
    });
  }

  showInfo(detail: string, summary = 'Info'): void {
    this.primeMessageService.add({
      severity: 'info',
      summary,
      detail
    });
  }

  showWarn(detail: string, summary = 'Warning'): void {
    this.primeMessageService.add({
      severity: 'warn',
      summary,
      detail
    });
  }

  showError(detail: string, summary = 'Error'): void {
    this.primeMessageService.add({
      severity: 'error',
      summary,
      detail
    });
  }

  clear(): void {
    this.primeMessageService.clear();
  }
}
