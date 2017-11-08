import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateAgentComponent } from './create-agent/create-agent.component'
import { ListAgentComponent } from './list-agent/list-agent.component'

const routes: Routes = [
  { path: 'create', component: CreateAgentComponent },
  { path: 'list', component: ListAgentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule { }
