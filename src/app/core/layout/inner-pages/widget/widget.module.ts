import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { TextMaskModule } from 'angular2-text-mask'
import { WidgetRoutingModule } from './widget-routing.module';
import { ListWidgetComponent } from './list-widget/list-widget.component';
import { CreateWidgetComponent } from './create-widget/create-widget.component';
import { SharedModule } from '../../../shared/shared.module';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import { MomentModule } from 'angular2-moment';
import { SearchPipe } from './tableSearch.pipe';

@NgModule({
  imports: [
      CommonModule,
      WidgetRoutingModule,
      FormsModule,
      TextMaskModule,
      SharedModule,
      AmazingTimePickerModule,
      Ng2SearchPipeModule,
      NgxPaginationModule,
      MomentModule

  ],
    providers: [
        // {provide: OWL_DATE_TIME_FORMATS, useValue: MY_NATIVE_FORMATS},
    ],
  declarations: [
    CreateWidgetComponent,
    ListWidgetComponent,
    SearchPipe,
  ]
})
export class WidgetModule { }
