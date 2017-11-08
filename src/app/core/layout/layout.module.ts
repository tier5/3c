import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component'
import { LayoutComponent } from './layout.component'
import { LayoutRoutingModule } from './layout-routing.module'
import { SidebarComponent } from './sidebar/sidebar.component'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule
  ],
  declarations: [
    LayoutComponent,
    HeaderComponent,
    SidebarComponent
  ],
  providers: []
})
export class LayoutModule { }
