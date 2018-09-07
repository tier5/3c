import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';

import { AlertComponent } from './alert/alert.component';
import { AuthEffects } from './store/auth/auth.effects';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { CoreComponent } from './core.component';
import { CoreRoutingModule } from './core-routing.module';
import { environment } from '../../environments/environment';
import { IsAdminOrSuperAdminGuard } from './auth/is-admin-or-super-admin.guard';
import { IsAgentGuard } from './auth/is-agent.guard';
import { IsSuperAdminGuard } from './auth/is-super-admin.guard';
import { LayoutModule } from './layout/layout.module';
import { NotAuthGuard } from './auth/not-auth.guard';
import { reducers } from './store/core.reducers';
import { SharedModule } from './shared';
import { MomentModule } from 'angular2-moment';
import {ChatService} from './layout/inner-pages/chat/chat.service';
import { PushNotificationsService } from './shared/push.notification.service';
import {NotificationAlertService} from './shared/notification.alert.service';


@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule,
    SharedModule,
    LayoutModule,
    MomentModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  declarations: [
    CoreComponent,
    AlertComponent
  ],
  exports: [CoreComponent],
  providers: [
    AuthGuard,
    IsAdminOrSuperAdminGuard,
    IsAgentGuard,
    IsSuperAdminGuard,
    NotAuthGuard,
    ChatService,
    PushNotificationsService,
    NotificationAlertService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class CoreModule { }
