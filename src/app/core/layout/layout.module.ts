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

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
    StoreModule.forFeature('profile', profileReducer),
    EffectsModule.forFeature([ProfileEffects])
  ],
  declarations: [
    LayoutComponent,
    HeaderComponent,
    SidebarComponent
  ],
  providers: []
})
export class LayoutModule { }
