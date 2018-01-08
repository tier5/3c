import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CreateTwilioComponent } from './create-twilio/create-twilio.component';
import { ListTwilioComponent } from './list-twilio/list-twilio.component';
import { TwilioRoutingModule } from './twilio-routing.module';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TwilioRoutingModule,
    NgxPaginationModule
  ],
  declarations: [
    CreateTwilioComponent,
    ListTwilioComponent
  ]
})
export class TwilioModule { }