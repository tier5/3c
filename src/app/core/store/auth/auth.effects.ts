import { Actions, Effect } from '@ngrx/effects'
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { of } from 'rxjs/observable/of'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/retry'
import 'rxjs/add/operator/switchMap'

import * as fromApp from '../core.reducers'
import * as AuthActions from './auth.actions'
import * as AlertActions from '../alert/alert.actions'
import { environment } from '../../../../environments/environment'

@Injectable()
export class AuthEffects {

  constructor (private actions$: Actions,
               private httpClient: HttpClient,
               private router: Router,
               private store: Store<fromApp.AppState>) {}

  @Effect()
  authSignUp = this.actions$
    .ofType(AuthActions.SIGNUP_ATTEMPT)
    .switchMap((action: AuthActions.SignUpAttempt) => {
      const apiUrl = environment.API_BASE_URL + 'admin-registration'
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
                type: AuthActions.SIGNUP_SUCCESS,
                payload: true
              }
            ]
          } else {
            return [
              {
                type: AlertActions.ALERT_SHOW,
                payload: {message: res.message, type: 'danger'}
              },
              {
                type: AuthActions.SIGNUP_FAILED,
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
    })


  @Effect()
  authSignIn = this.actions$
    .ofType(AuthActions.SIGNIN_ATTEMPT)
    .switchMap((action: AuthActions.SignInAttempt) => {
      const apiUrl = environment.API_BASE_URL + 'userlogin'
      const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest')
      const config = {
        headers: headers
      }
      return this.httpClient.post(apiUrl, action.payload, config)
        .map((res: any) => {
          if (res.status) {
            this.router.navigate(['/dashboard'])
            return {
              type: AuthActions.SIGNIN_SUCCESS,
              payload: res.response
            }
          } else {
            return {
              type: AlertActions.ALERT_SHOW,
              payload: {message: res.message, type: 'danger'}
            }
          }
        })
        .catch((err: HttpErrorResponse) => {
          return of(
            {
              type: AlertActions.ALERT_SHOW,
              payload: { message: err.error.message, type: 'danger' }
            }
          )
        })
    })


  @Effect()
  authForgotPassword = this.actions$
    .ofType(AuthActions.FORGOT_PASSWORD_ATTEMPT)
    .switchMap((action: AuthActions.ForgotPasswordAttempt) => {
      const apiUrl = environment.API_BASE_URL + 'forget-password-mail'
      const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest')
      const config = {
        headers: headers
      }
      return this.httpClient.post(apiUrl, action.payload, config)
        .mergeMap((res: any) => {
          if (res.status) {
            this.router.navigate(['/sign-in']);
            return [
              {
                type: AlertActions.ALERT_SHOW,
                payload: {message: res.message, type: 'success'}
              },
              {
                type: AuthActions.FORGOT_PASSWORD_SUCCESS,
                payload: true
              }
            ]
          } else {
            return [
              {
                type: AlertActions.ALERT_SHOW,
                payload: {message: res.message, type: 'danger'}
              },
              {
                type: 'FORGOT_PASSWORD_FAILED',
              }
            ]
          }
        })
        .catch((err: HttpErrorResponse) => {
          return of(
            {
              type: AlertActions.ALERT_SHOW,
              payload: { message: err.error.message, type: 'danger' }
            }
          )
        })
    })


  @Effect()
  authResetPassword = this.actions$
    .ofType(AuthActions.RESET_PASSWORD_ATTEMPT)
    .switchMap((action: AuthActions.ResetPasswordAttempt) => {
      const apiUrl = environment.API_BASE_URL + 'update-password'
      const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest')
      const config = {
        headers: headers
      }
      return this.httpClient.post(apiUrl, action.payload, config)
        .mergeMap((res: any) => {
          if (res.status) {
            this.router.navigate(['/sign-in']);
            return [
              {
                type: AlertActions.ALERT_SHOW,
                payload: {message: res.message, type: 'success'}
              },
              {
                type: AuthActions.RESET_PASSWORD_SUCCESS,
                payload: true
              }
            ]
          } else {
            return [
              {
                type: AlertActions.ALERT_SHOW,
                payload: {message: res.message, type: 'danger'}
              },
              {
                type: 'RESET_PASSWORD_SUCCESS',
              }
            ]
          }
        })
        .catch((err: HttpErrorResponse) => {
          return of(
            {
              type: AlertActions.ALERT_SHOW,
              payload: { message: err.error.message, type: 'danger' }
            }
          )
        })
    })

  @Effect()
  authSignOut = this.actions$
    .ofType(AuthActions.SIGNOUT_ATTEMPT)
    .switchMap((action: AuthActions.SignOutAttempt) => {
      const apiUrl = environment.API_BASE_URL + 'log-out';      
      return this.httpClient.post(apiUrl, null)
        .map((res: any) => {
          if (res.status) {
            this.router.navigate(['/'])
            return {
              type: AuthActions.SIGNOUT_SUCCESS
            }
          } else {
            return {
              type: AlertActions.ALERT_SHOW,
              payload: {message: res.message, type: 'danger'}
            }
          }
        })
        .catch((err: HttpErrorResponse) => {
          return of(
            {
              type: AlertActions.ALERT_SHOW,
              payload: { message: err.error.message, type: 'danger' }
            }
          )
        })
    })

  @Effect()
  twilioActive = this.actions$
    .ofType(AuthActions.CHECK_TWILIO_ACTIVE_ATTEMPT)
    .switchMap((action: AuthActions.CheckTwilioActiveAttempt) => {
      const apiUrl = environment.API_BASE_URL + 'validate-twilio-credentials'
      const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest')
      const config = {
        headers: headers
      }
      return this.httpClient.get(apiUrl, config)
        .map((res: any) => {
          return {
            type: AuthActions.CHECK_TWILIO_ACTIVE_SUCCESS,
            payload: res.status
          }
        })
        .catch((err: HttpErrorResponse) => {
          return of(
            {
              type: AlertActions.ALERT_SHOW,
              payload: { message: err.error.message, type: 'danger' }
            }
          )
        })
    })

}
