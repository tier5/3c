import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChatsRoutingModule } from './chats-routing.module';
import { ListChatComponent } from './list-chat/list-chat.component';
import { ListAgentComponent } from './list-agent/list-agent.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { SharedModule } from '../../../shared/shared.module';
import { MomentModule } from 'angular2-moment';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    ChatsRoutingModule,
    FormsModule,
    SharedModule,
    MomentModule,
    NgxPaginationModule
  ],
  declarations: [
    ListChatComponent,
    ListAgentComponent,
    ContactListComponent
  ]
})
export class ChatsModule { }
