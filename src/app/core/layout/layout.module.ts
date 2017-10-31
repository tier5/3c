import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProfileEffects } from './store/profile/profile.effect';
import { profileReducer } from './store/profile/profile.reducers';
import { reducers } from './store/after-login.reducers';
import { TwilioEffects } from './store/twilio/twilio.effect';
import { DepartmentEffects } from './store/department/department.effects';
import { AdminEffects } from './store/admin/admin.effect';
import { AgentEffects } from './store/agent/agent.effect';
import { WidgetEffects } from './store/widget/widget.effect';

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
    StoreModule.forFeature('afterLogin', reducers),
    EffectsModule.forFeature([ProfileEffects, TwilioEffects, DepartmentEffects, AdminEffects, AgentEffects, WidgetEffects])
  ],
  declarations: [
    LayoutComponent,
    HeaderComponent,
    SidebarComponent
  ],
  providers: []
})
export class LayoutModule { }
