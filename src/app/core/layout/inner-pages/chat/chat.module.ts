import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { ChatRoutingModule } from './chat-routing.module';
import { PendingComponent } from './pending/pending.component';
import { OngoingComponent } from './ongoing/ongoing.component';
import { RejectedComponent } from './rejected/rejected.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ChatRoutingModule,
    FormsModule,
    SharedModule,

  ],
  declarations: [
    PendingComponent,
    OngoingComponent,
    RejectedComponent
  ]
})
export class ChatModule { }