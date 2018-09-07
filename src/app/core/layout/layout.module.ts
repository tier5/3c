import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { MomentModule } from 'angular2-moment';

import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileEffects } from './store/profile/profile.effect';
import { reducers } from './store/after-login.reducers';
import { TwilioEffects } from './store/twilio/twilio.effect';
import { DepartmentEffects } from './store/department/department.effects';
import { AdminEffects } from './store/admin/admin.effect';
import { AgentEffects } from './store/agent/agent.effect';
import { WidgetEffects } from './store/widget/widget.effect';
import { ChatEffects } from './store/chat/chat.effects';
import { ChatService } from './inner-pages/chat/chat.service';
import { AgentChatEffects } from './store/agent-chat/agent-chat.effect';
import { DashboardEffects} from './store/dashboard/dashboard.effects';

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
    MomentModule,
    StoreModule.forFeature('afterLogin', reducers),
    EffectsModule.forFeature([ProfileEffects, TwilioEffects, DepartmentEffects, AdminEffects,
      AgentEffects, WidgetEffects, ChatEffects, DashboardEffects, AgentChatEffects])
  ],
  declarations: [
    LayoutComponent,
    HeaderComponent,
    SidebarComponent
  ],
  providers: []
})
export class LayoutModule { }
