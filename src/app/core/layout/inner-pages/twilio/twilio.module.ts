import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateTwilioComponent } from './create-twilio/create-twilio.component';
import { ListTwilioComponent } from './list-twilio/list-twilio.component';
import { TwilioRoutingModule } from './twilio-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TwilioRoutingModule
  ],
  declarations: [
    CreateTwilioComponent,
    ListTwilioComponent
  ]
})
export class TwilioModule { }
