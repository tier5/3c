import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ChatsRoutingModule} from './chats-routing.module';
import {ListChatComponent} from './list-chat/list-chat.component';
import {ListAgentComponent} from './list-agent/list-agent.component';
import {ContactListComponent} from './contact-list/contact-list.component';
import {SharedModule} from '../../../shared/shared.module';
import {MomentModule} from 'angular2-moment';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {OrderModule} from 'ngx-order-pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { ChatSearchPipe } from './chatSearch.pipe';
import { AgentLiveComponent } from './agent-live/agent-live.component';
import { AgentRejectedComponent } from './agent-rejected/agent-rejected.component';
import { AgentClosedComponent } from './agent-closed/agent-closed.component';

@NgModule({
    imports: [
        CommonModule,
        ChatsRoutingModule,
        FormsModule,
        SharedModule,
        MomentModule,
        Ng2SearchPipeModule,
        OrderModule,
        NgxPaginationModule,
    ],
    declarations: [
        ListChatComponent,
        ListAgentComponent,
        ContactListComponent,
        ChatSearchPipe,
        AgentLiveComponent,
        AgentRejectedComponent,
        AgentClosedComponent
    ]
})
export class ChatsModule {
}
