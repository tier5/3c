import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreComponent } from './core.component';
import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from './layout/header/header.component'
import { SidebarComponent } from './layout/sidebar/sidebar.component'
import { LayoutComponent } from './layout/layout.component'

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  declarations: [
    CoreComponent,
    LayoutComponent,
    HeaderComponent,
    SidebarComponent
  ],
  exports: [CoreComponent]
})
export class CoreModule { }
