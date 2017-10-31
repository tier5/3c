import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CreateDepartmentComponent } from './create-department/create-department.component';
import { ListDepartmentComponent } from './list-department/list-department.component';
import { DepartmentRoutingModule } from './department-routing.module';

@NgModule({
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    FormsModule
  ],
  declarations: [
    CreateDepartmentComponent,
    ListDepartmentComponent
  ]
})
export class DepartmentModule { }
