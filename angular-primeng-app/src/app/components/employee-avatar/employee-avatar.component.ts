import { Component, Input, OnInit } from '@angular/core';
import { AvatarService } from '../../services/avatar.service';

@Component({
  selector: 'app-employee-avatar',
  template: `
    <p-avatar 
      [image]="avatarUrl"
      [shape]="shape"
      [size]="size"
      [styleClass]="styleClass"
      (imageError)="onImageError($event)">
    </p-avatar>
  `
})
export class EmployeeAvatarComponent implements OnInit {
  @Input() avatarUrl?: string;
  @Input() name?: string;
  @Input() shape: 'square' | 'circle' = 'circle';
  @Input() size: 'normal' | 'large' | 'xlarge' = 'normal';
  @Input() styleClass?: string;

  constructor(private avatarService: AvatarService) {}

  ngOnInit(): void {
    if (!this.avatarUrl && this.name) {
      this.avatarUrl = this.avatarService.getAvatarUrl(undefined, this.name);
    }
  }

  onImageError(event: any): void {
    // Fallback to generated avatar
    if (this.name) {
      event.target.src = this.avatarService.generateAvatarDataUrl({
        name: this.name
      });
    } else {
      event.target.src = 'assets/images/avatars/default-avatar.svg';
    }
  }
}
