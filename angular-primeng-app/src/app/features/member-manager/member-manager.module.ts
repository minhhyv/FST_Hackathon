import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG Modules
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';

import { MemberManagerComponent } from './member-manager.component';
import { MemberManagerRoutingModule } from './member-manager-routing.module';

@NgModule({
  declarations: [
    MemberManagerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MemberManagerRoutingModule,
    // PrimeNG Modules
    TabViewModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    TableModule,
    CheckboxModule,
    TooltipModule,
    TagModule
  ]
})
export class MemberManagerModule { }
