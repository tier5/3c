import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component'
import { DashboardRoutingModule } from './dashboard-routing.module'
import { MomentModule } from 'angular2-moment';


@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule, MomentModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
