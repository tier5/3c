import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentRoutingModule } from './agent-routing.module';
import { ListAgentComponent } from './list-agent/list-agent.component';
import { CreateAgentComponent } from './create-agent/create-agent.component';

@NgModule({
  imports: [
    CommonModule,
    AgentRoutingModule
  ],
  declarations: [
    CreateAgentComponent,
    ListAgentComponent
  ]
})
export class AgentModule { }
