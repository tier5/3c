import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component'
import { DashboardRoutingModule } from './dashboard-routing.module'
import { MomentModule } from 'angular2-moment';
import {OrderByPipe} from './orderBy.pipe';


@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule, MomentModule
  ],
  declarations: [
    DashboardComponent,
    OrderByPipe
  ]
})
export class DashboardModule { }
