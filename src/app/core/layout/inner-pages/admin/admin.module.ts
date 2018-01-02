import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask'

import { AdminRoutingModule } from './admin-routing.module';
import { CreateAdminComponent } from './create-admin/create-admin.component';
import { ListAdminComponent } from './list-admin/list-admin.component';
import { SharedModule } from '../../../shared/shared.module';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    AdminRoutingModule,
    TextMaskModule,
    NgxPaginationModule
  ],
  declarations: [
    CreateAdminComponent,
    ListAdminComponent,    
  ]
})
export class AdminModule { }
