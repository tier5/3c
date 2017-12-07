import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'

import { ListChatComponent } from './list-chat/list-chat.component'
import { ListAgentComponent } from './list-agent/list-agent.component'
import { ContactListComponent } from './contact-list/contact-list.component'

const routes: Routes = [
  { path: 'list-agent', component: ListAgentComponent,data: { chatMode: true } },
  { path: 'list-chat/:id', component: ListChatComponent },
  { path: 'list-agents-contacts', component: ListAgentComponent,data: { chatMode: false } },
  { path: 'contact-list/:id', component: ContactListComponent },
  { path: '**', redirectTo: 'list-agent' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatsRoutingModule { }
