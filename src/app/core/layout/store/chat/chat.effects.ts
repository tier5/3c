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

@Injectable()
export class DepartmentEffects {

  constructor (private actions$: Actions,
               private httpClient: HttpClient) {}

  @Effect()
  connect = this.actions$
    .ofType(ChatActions.CONNECT_TRY)
    .switchMap((action: ChatActions.ConnectTry) => {
      const apiUrl = environment.API_BASE_URL + 'create-department';
      const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest')
      const config = {
        headers: headers
      }
      return this.httpClient.post(apiUrl, action.payload, config)
        .mergeMap((res: any) => {
        if (res.status) {
          return [
            {
              type: AlertActions.ALERT_SHOW,
              payload: {message: res.message, type: 'success'}
            },
            {
              type: ChatActions.CONNECT_SUCCESS,
              payload: res.response
            }
          ]
        } else {
          return [
            {
              type: AlertActions.ALERT_SHOW,
              payload: {message: res.message, type: 'danger'}
            }
          ]
        }
        })
        .catch((err: HttpErrorResponse) => {
          return of(
            {
              type: AlertActions.ALERT_SHOW,
              payload: {message: err.message, type: 'danger'}
            }
          )
        })
    });
}