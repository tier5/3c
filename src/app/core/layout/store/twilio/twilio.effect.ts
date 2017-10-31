import { Actions, Effect } from '@ngrx/effects';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';

import * as AuthActions from '../../../store/auth/auth.actions';
import * as TwilioActions from './twilio.actions';
import * as AlertActions from '../../../store/alert/alert.actions';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class TwilioEffects {

  constructor (private actions$: Actions,
               private httpClient: HttpClient) {}

  @Effect()
  addTwilio = this.actions$
    .ofType(TwilioActions.ADD_TWILIO_ATTEMPT)
    .switchMap((action: TwilioActions.AddTwilioAttempt) => {
      const apiUrl = environment.API_BASE_URL + 'twilio-information';
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
                payload: { message: res.message, type: 'success' }
              },
              {
                type: AuthActions.CHECK_TWILIO_ACTIVE_SUCCESS,
                payload: true
              }
            ]
          } else {
            return [
              {
                type: AlertActions.ALERT_SHOW,
                payload: { message: res.message, type: 'danger' }
              }
            ]
          }
        })
        .catch((err: HttpErrorResponse) => {
          return of(
            {
              type: AlertActions.ALERT_SHOW,
              payload: { message: err.message, type: 'danger' }
            }
          )
        })
    });

  @Effect()
  getTwilio = this.actions$
    .ofType(TwilioActions.GET_TWILIO_ATTEMPT)
    .switchMap((action: TwilioActions.GetTwilioAttempt) => {
      const apiUrl = environment.API_BASE_URL + 'get-twilio-information';
      const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest')
      const config = {
        headers: headers
      }
      return this.httpClient.post(apiUrl, '', config)
        .map((res: any) => {
          return {
            type: TwilioActions.GET_TWILIO_SUCCESS,
            payload: res.response
          }
        })
        .catch((err: HttpErrorResponse) => {
          return of(
            {
              type: AlertActions.ALERT_SHOW,
              payload: { message: err.message, type: 'danger' }
            }
          )
        })
    });

  @Effect()
  getTwilioList = this.actions$
    .ofType(TwilioActions.GET_TWILIO_LIST_ATTEMPT)
    .switchMap((action: TwilioActions.GetTwilioAttempt) => {
      const apiUrl = environment.API_BASE_URL + 'twilio-account-list';
      const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest')
      const config = {
        headers: headers
      }
      return this.httpClient.get(apiUrl, config)
        .map((res: any) => {
          if(res.status) {
            return {
              type: TwilioActions.GET_TWILIO_LIST_SUCCESS,
              payload: res.response
            }
          } else {
            return {
              type: AlertActions.ALERT_SHOW,
              payload: { message: res.message, type: 'danger' }
            }
          }

        })
        .catch((err: HttpErrorResponse) => {
          return of(
            {
              type: AlertActions.ALERT_SHOW,
              payload: { message: err.message, type: 'danger' }
            }
          )
        })
    });

}
