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
import { TwilioSearchPipe } from './twilioSearch.pipe';
import { SubaccountComponent } from './subaccount/subaccount.component';
import { SweetAlertService } from 'ngx-sweetalert2';

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
        ListTwilioComponent,
        TwilioSearchPipe,
        SubaccountComponent
    ],
    providers: [SweetAlertService]
})
export class TwilioModule {
}
