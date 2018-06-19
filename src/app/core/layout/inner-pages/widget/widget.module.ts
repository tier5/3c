import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { TextMaskModule } from 'angular2-text-mask'
// import {DpDatePickerModule} from 'ng2-date-picker';
import { WidgetRoutingModule } from './widget-routing.module';
import { ListWidgetComponent } from './list-widget/list-widget.component';
import { CreateWidgetComponent } from './create-widget/create-widget.component';
import { SharedModule } from '../../../shared/shared.module';
// import { TimePickerModule } from 'ng2-simple-timepicker';

// import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';

// export const MY_NATIVE_FORMATS = {
//     timePickerInput: {hour: 'numeric', minute: 'numeric'},
// };
import { AmazingTimePickerModule } from 'amazing-time-picker';

@NgModule({
  imports: [
      CommonModule,
      WidgetRoutingModule,
      FormsModule,
      TextMaskModule,
      SharedModule, AmazingTimePickerModule

  ],
    providers: [
        // {provide: OWL_DATE_TIME_FORMATS, useValue: MY_NATIVE_FORMATS},
    ],
  declarations: [
    CreateWidgetComponent,
    ListWidgetComponent,
  ]
})
export class WidgetModule { }
