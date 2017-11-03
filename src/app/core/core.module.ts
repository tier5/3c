import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { StoreModule } from '@ngrx/store'

import { AuthEffects } from './store/auth/auth.effects';
import { AuthGuard } from './auth/auth.guard'
import { CoreComponent } from './core.component';
import { CoreRoutingModule } from './core-routing.module';
import { environment } from '../../environments/environment'
import { HeaderComponent } from './layout/header/header.component'
import { LayoutComponent } from './layout/layout.component'
import { NotAuthGuard } from './auth/not-auth.guard'
import { reducers } from './store/core.reducers';
import { SidebarComponent } from './layout/sidebar/sidebar.component'

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  declarations: [
    CoreComponent,
    LayoutComponent,
    HeaderComponent,
    SidebarComponent
  ],
  exports: [CoreComponent],
  providers: [
    AuthGuard,
    NotAuthGuard
  ]
})
export class CoreModule { }
