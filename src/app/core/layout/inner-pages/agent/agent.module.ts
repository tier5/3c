import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { TextMaskModule } from 'angular2-text-mask'

import { AgentRoutingModule } from './agent-routing.module';
import { CreateAgentComponent } from './create-agent/create-agent.component';
import { ListAgentComponent } from './list-agent/list-agent.component';
import { SharedModule } from '../../../shared/shared.module';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    AgentRoutingModule,
    FormsModule,
    TextMaskModule,
    SharedModule,
    NgxPaginationModule
  ],
  declarations: [
    CreateAgentComponent,
    ListAgentComponent
  ]
})
export class AgentModule { }
