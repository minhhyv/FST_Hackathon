import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberManagerComponent } from './member-manager.component';

const routes: Routes = [
  {
    path: '',
    component: MemberManagerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberManagerRoutingModule { }
