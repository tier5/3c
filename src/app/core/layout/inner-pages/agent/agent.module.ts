import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {TextMaskModule} from 'angular2-text-mask'
import {AgentRoutingModule} from './agent-routing.module';
import {CreateAgentComponent} from './create-agent/create-agent.component';
import {ListAgentComponent} from './list-agent/list-agent.component';
import {SharedModule} from '../../../shared/shared.module';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {OrderModule} from 'ngx-order-pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MomentModule } from 'angular2-moment';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatRippleModule} from '@angular/material';


@NgModule({
    imports: [
        CommonModule,
        AgentRoutingModule,
        FormsModule,
        TextMaskModule,
        SharedModule,
        Ng2SearchPipeModule,
        OrderModule,
        NgxPaginationModule,
        ModalModule.forRoot(),
        MomentModule,
        MatAutocompleteModule, MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatRippleModule
    ],
    declarations: [
        CreateAgentComponent,
        ListAgentComponent
    ]
})
export class AgentModule {
}
