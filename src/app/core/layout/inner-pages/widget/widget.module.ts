import { CommonModule } from '@angular/common';
import { DpDatePickerModule } from 'ng2-date-picker';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { TextMaskModule } from 'angular2-text-mask'

import { WidgetRoutingModule } from './widget-routing.module';
import { ListWidgetComponent } from './list-widget/list-widget.component';
import { CreateWidgetComponent } from './create-widget/create-widget.component';
import { SharedModule } from '../../../shared/shared.module';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  imports: [
      CommonModule,
      DpDatePickerModule,
      WidgetRoutingModule,
      FormsModule,
      TextMaskModule,
      SharedModule,
      NgxPaginationModule
  ],
  declarations: [
    CreateWidgetComponent,
    ListWidgetComponent,
  ]
})
export class WidgetModule { }
