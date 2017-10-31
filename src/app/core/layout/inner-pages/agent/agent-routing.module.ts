import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateAgentComponent } from './create-agent/create-agent.component'
import { ListAgentComponent } from './list-agent/list-agent.component'

const routes: Routes = [
  { path: 'create', component: CreateAgentComponent, data: { editMode: false } },
  { path: 'list', component: ListAgentComponent },
  { path: 'edit/:id', component: CreateAgentComponent, data: { editMode: true } },
  { path: '**', redirectTo: 'list' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule { }
