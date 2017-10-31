import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatRoutingModule } from './chat-routing.module';
import { PendingComponent } from './pending/pending.component';
import { OngoingComponent } from './ongoing/ongoing.component';
import { RejectedComponent } from './rejected/rejected.component';
import { ResolveComponent } from './resolve/resolve.component';
import { SharedModule } from '../../../shared/shared.module';
import { MomentModule } from 'angular2-moment';
import { SweetAlertService } from 'ngx-sweetalert2';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  imports: [
    CommonModule,
    ChatRoutingModule,
    FormsModule,
    SharedModule,
    MomentModule,
    ModalModule.forRoot()
  ],
  declarations: [
    PendingComponent,
    OngoingComponent,
    RejectedComponent,
    ResolveComponent,
  ],
    providers: [SweetAlertService]
})
export class ChatModule { }
