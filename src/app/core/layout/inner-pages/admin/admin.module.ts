import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CreateAdminComponent } from './create-admin/create-admin.component';
import { ListAdminComponent } from './list-admin/list-admin.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [
    CreateAdminComponent,
    ListAdminComponent
  ]
})
export class AdminModule { }
