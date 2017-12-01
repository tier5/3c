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
import * as AdminActions from './admin.actions';
import * as AlertActions from '../../../store/alert/alert.actions';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class AdminEffects {

  constructor (private actions$: Actions,
               private httpClient: HttpClient) {}

  @Effect()
  addAdmin = this.actions$
    .ofType(AdminActions.ADD_ADMIN_ATTEMPT)
    .switchMap((action: AdminActions.AddAdminAttempt) => {
      const apiUrl = environment.API_BASE_URL + 'admin-registration';
      const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest')
      const config = {
        headers: headers
      }
      return this.httpClient.post(apiUrl, action.payload, config)
        .mergeMap((res: any) => {
          if (res.status) {
            return [
              {
                type: AdminActions.ADD_ADMIN_SUCCESS,
                payload: res.response
              },
              {
                type: AlertActions.ALERT_SHOW,
                payload: { message: res.message, type: 'success' }
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
              payload: { message: err.error, type: 'danger' }
            }
          )
        })
    });

  @Effect()
  getAdminList = this.actions$
    .ofType(AdminActions.GET_ADMIN_LIST_ATTEMPT)
    .switchMap((action: AdminActions.GetAdminListAttempt) => {
      const apiUrl = environment.API_BASE_URL + 'admin-list';
      const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest')
      const config = {
        headers: headers
      }
      return this.httpClient.get(apiUrl, config)
        .map((res: any) => {
          if(res.status) {
            return {
              type: AdminActions.GET_ADMIN_LIST_SUCCESS,
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
              payload: { message: err.error, type: 'danger' }
            }
          )
        })
    });

  @Effect()
  editAdmin = this.actions$
    .ofType(AdminActions.EDIT_ADMIN_ATTEMPT)
    .switchMap((action: AdminActions.EditAdminAttempt) => {
        const apiUrl = environment.API_BASE_URL + 'updateuserprofile';
        const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest')
        const config = {
          headers: headers
        }
        return this.httpClient.post(apiUrl, action.payload, config)
          .mergeMap((res: any) => {
            if (res.status) {
              return [
                {
                  type: AdminActions.EDIT_ADMIN_SUCCESS,
                  payload: res.response
                },
                {
                  type: AlertActions.ALERT_SHOW,
                  payload: { message: res.message, type: 'success' }
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
                payload: { message: err.error, type: 'danger' }
              }
            )
          })
      });

  @Effect()
  createTwilioSid = this.actions$
    .ofType(AdminActions.CREATE_TWILIO_SID_ATTEMPT)
    .switchMap((action: AdminActions.CreateTwilioSidAttempt) => {
        const apiUrl = environment.API_BASE_URL + 'create-user-twilio-sid';
        const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest')
        const config = {
          headers: headers
        }
        return this.httpClient.post(apiUrl, action.payload, config)
          .mergeMap((res: any) => {
            if (res.status) {
              return [
                {
                  type: AdminActions.CREATE_TWILIO_SID_SUCCESS,
                  payload: res.response
                },
                {
                  type: AlertActions.ALERT_SHOW,
                  payload: { message: res.message, type: 'success' }
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
                payload: { message: err.error, type: 'danger' }
              }
            )
          })
      });

  @Effect()
  blockUser = this.actions$
    .ofType(AdminActions.BLOCK_ADMIN_USER_ATTEMPT)
    .switchMap((action: AdminActions.BlockAdminUserAttempt) => {
        const apiUrl = environment.API_BASE_URL + 'block-user';
        const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest')
        const config = {
          headers: headers
        }
        return this.httpClient.post(apiUrl, action.payload, config)
          .mergeMap((res: any) => {
            if (res.status) {
              return [
                {
                  type: AdminActions.BLOCK_ADMIN_USER_SUCCESS,
                  payload: res.response
                },
                {
                  type: AlertActions.ALERT_SHOW,
                  payload: { message: res.message, type: 'success' }
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
                payload: { message: err.error, type: 'danger' }
              }
            )
          })
      });

  @Effect()
  unblockUser = this.actions$
    .ofType(AdminActions.UNBLOCK_ADMIN_USER_ATTEMPT)
    .switchMap((action: AdminActions.UnblockAdminUserAttempt) => {
        const apiUrl = environment.API_BASE_URL + 'unblock-user';
        const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest')
        const config = {
          headers: headers
        }
        return this.httpClient.post(apiUrl, action.payload, config)
          .mergeMap((res: any) => {
            if (res.status) {
              return [
                {
                  type: AdminActions.UNBLOCK_ADMIN_USER_SUCCESS,
                  payload: res.response
                },
                {
                  type: AlertActions.ALERT_SHOW,
                  payload: { message: res.message, type: 'success' }
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
                payload: { message: err.error, type: 'danger' }
              }
            )
          })
      });

  @Effect()
  getToEditAdmin = this.actions$
    .ofType(AdminActions.GET_TO_EDIT_ADMIN_ATTEMPT)
    .switchMap((action: AdminActions.GetToEditAdminAttempt) => {
      const apiUrl = environment.API_BASE_URL + 'view-admin';
      const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest')
      const config = {
        headers: headers
      }
      return this.httpClient.post(apiUrl, action.payload, config)
        .map((res: any) => {
          return {
            type: AdminActions.GET_TO_EDIT_ADMIN_SUCCESS,
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

}
