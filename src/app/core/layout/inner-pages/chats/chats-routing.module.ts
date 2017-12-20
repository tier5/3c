import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'

import { ListChatComponent } from './list-chat/list-chat.component'
import { RejectedComponent } from './rejected/rejected.component'
import { ListAgentComponent } from './list-agent/list-agent.component'

const routes: Routes = [
  { path: 'list-agent', component: ListAgentComponent },
  { path: 'rejected', component: RejectedComponent },
  { path: 'list-chat/:id', component: ListChatComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatsRoutingModule { }
