import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CreateTwilioComponent} from './create-twilio/create-twilio.component';
import {ListTwilioComponent} from './list-twilio/list-twilio.component';
import {TwilioRoutingModule} from './twilio-routing.module';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {OrderModule} from 'ngx-order-pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { MomentModule } from 'angular2-moment';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TwilioRoutingModule,
        Ng2SearchPipeModule,
        OrderModule,
        NgxPaginationModule,
        MomentModule
    ],
    declarations: [
        CreateTwilioComponent,
        ListTwilioComponent
    ]
})
export class TwilioModule {
}
