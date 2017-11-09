import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { StoreModule } from '@ngrx/store'

import { AlertComponent } from './alert/alert.component';
import { AuthEffects } from './store/auth/auth.effects';
import { AuthGuard } from './auth/auth.guard'
import { AuthInterceptor } from './auth/auth.interceptor'
import { CoreComponent } from './core.component';
import { CoreRoutingModule } from './core-routing.module';
import { environment } from '../../environments/environment';
import { LayoutModule } from './layout/layout.module'
import { NotAuthGuard } from './auth/not-auth.guard';
import { reducers } from './store/core.reducers';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule,
    SharedModule,
    LayoutModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  declarations: [
    CoreComponent,
    AlertComponent
  ],
  exports: [CoreComponent],
  providers: [
    AuthGuard,
    NotAuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class CoreModule { }
