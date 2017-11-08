import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateAdminComponent } from './create-admin/create-admin.component'
import { ListAdminComponent } from './list-admin/list-admin.component'

const routes: Routes = [
  { path: 'create', component: CreateAdminComponent },
  { path: 'list', component: ListAdminComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
