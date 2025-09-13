import { Injectable } from '@angular/core';
import { MessageService as PrimeMessageService, Message } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private primeMessageService: PrimeMessageService) { }

  add(message: Message): void {
    this.primeMessageService.add(message);
  }

  showSuccess(summary: string, detail?: string): void {
    this.primeMessageService.add({
      severity: 'success',
      summary,
      detail
    });
  }

  showError(summary: string, detail?: string): void {
    this.primeMessageService.add({
      severity: 'error',
      summary,
      detail
    });
  }

  showWarn(summary: string, detail?: string): void {
    this.primeMessageService.add({
      severity: 'warn',
      summary,
      detail
    });
  }

  showInfo(summary: string, detail?: string): void {
    this.primeMessageService.add({
      severity: 'info',
      summary,
      detail
    });
  }

  clear(): void {
    this.primeMessageService.clear();
  }
}
