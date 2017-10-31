import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateDepartmentComponent } from './create-department/create-department.component'
import { ListDepartmentComponent } from './list-department/list-department.component'

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'list' },
  { path: 'create', component: CreateDepartmentComponent, data: { editMode: false } },
  { path: 'list', component: ListDepartmentComponent },
  { path: 'edit/:id', component: CreateDepartmentComponent, data: { editMode: true } },
  { path: '**', redirectTo: 'list' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
