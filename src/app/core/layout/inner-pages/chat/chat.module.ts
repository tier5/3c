import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { PendingComponent } from './pending/pending.component';
import { OngoingComponent } from './ongoing/ongoing.component';
import { RejectedComponent } from './rejected/rejected.component';

@NgModule({
  imports: [
    CommonModule,
    ChatRoutingModule
  ],
  declarations: [
    PendingComponent,
    OngoingComponent,
    RejectedComponent
  ]
})
export class ChatModule { }
