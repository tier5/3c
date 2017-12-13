import { Actions, Effect } from '@ngrx/effects';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';

import * as ChatActions from '../chat/chat.actions';
import * as AlertActions from '../../../store/alert/alert.actions';
import { environment } from '../../../../../environments/environment';
import { ChatService } from '../../inner-pages/chat/chat.service'

@Injectable()
export class ChatEffects {

  constructor (private actions$: Actions,
               private chatService: ChatService,
               private httpClient: HttpClient) {}

  @Effect()
  connect = this.actions$
    .ofType(ChatActions.CONNECT_ATTEMPT)
    .switchMap((action: ChatActions.ConnectAttempt) => {
      return of(
        {
          type: ChatActions.CONNECT_SUCCESS
        }
      );
    })
    .do(() => {
      this.chatService.connect();
    });
}