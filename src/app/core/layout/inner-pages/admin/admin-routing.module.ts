import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateAdminComponent } from './create-admin/create-admin.component'
import { ListAdminComponent } from './list-admin/list-admin.component'

const routes: Routes = [
  { path: '', redirectTo: 'list' },
  { path: 'create', component: CreateAdminComponent, data: { editMode: false } },
  { path: 'list', component: ListAdminComponent },
  { path: 'edit/:id', component: CreateAdminComponent, data: { editMode: true } },
  { path: '**', redirectTo: 'list' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
