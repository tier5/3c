import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetRoutingModule } from './widget-routing.module';
import { ListWidgetComponent } from './list-widget/list-widget.component';
import { CreateWidgetComponent } from './create-widget/create-widget.component';

@NgModule({
  imports: [
    CommonModule,
    WidgetRoutingModule
  ],
  declarations: [
    CreateWidgetComponent,
    ListWidgetComponent,
  ]
})
export class WidgetModule { }
