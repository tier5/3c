import { Actions, Effect } from '@ngrx/effects';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';

import * as AlertActions from '../../../store/alert/alert.actions';
import * as WidgetActions from './widget.actions';
import { environment } from '../../../../../environments/environment';
import * as AgentActions from '../agent/agent.actions';
import {SpinnerService} from '../../../shared/spinner';
@Injectable()
export class WidgetEffects {
  constructor (private actions$: Actions,
               private httpClient: HttpClient,
               private spinnerService: SpinnerService) {}

  @Effect()
  getTimezoneList = this.actions$
    .ofType(WidgetActions.GET_TIMEZONE_LIST_ATTEMPT)
    .switchMap((action: WidgetActions.GetTimeZoneListAttempt) => {
      const apiUrl = environment.API_BASE_URL + 'get-timezone';
      const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest');
      const config = {
        headers: headers
      };
      return this.httpClient.get(apiUrl, config)
        .map((res: any) => {
          if (res.status) {
            return {
              type: WidgetActions.GET_TIMEZONE_LIST_SUCCESS,
              payload: res.response
            };
          } else {
            return {
              type: AlertActions.ALERT_SHOW,
              payload: {message: res.message, type: 'danger'}
            };
          }

        })
        .catch((err: HttpErrorResponse) => {
          return of(
            {
              type: AlertActions.ALERT_SHOW,
              payload: {message: err.error, type: 'danger'}
            }
          );
        });
    });

  @Effect()
  addWidget = this.actions$
    .ofType(WidgetActions.ADD_WIDGET_ATTEMPT)
    .switchMap((action: WidgetActions.AddWidgetAttempt) => {
      const apiUrl = environment.API_BASE_URL + 'createWidgets';
      const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest');
      const config = {
        headers: headers
      };
      return this.httpClient.post(apiUrl, action.payload, config)
        .mergeMap((res: any) => {
          if (res.status) {
            return [
              {
                type: WidgetActions.ADD_WIDGET_SUCCESS,
                payload: res.response
              },
              {
                type: AlertActions.ALERT_SHOW,
                payload: {message: res.message, type: 'success'}
              }
            ];
          } else {
            return [
              {
                type: AlertActions.ALERT_SHOW,
                payload: {message: res.message, type: 'danger'}
              }
            ];
          }
        })
        .catch((err: HttpErrorResponse) => {
          return of(
            {
              type: AlertActions.ALERT_SHOW,
              payload: {message: err.error, type: 'danger'}
            }
          );
        });
    });

  @Effect()
  getWidgetList = this.actions$
    .ofType(WidgetActions.GET_WIDGET_LIST_ATTEMPT)
    .switchMap((action: WidgetActions.GetWidgetListAttempt) => {
      const apiUrl = environment.API_BASE_URL + 'listWidgets';
      const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest');
      const config = {
        headers: headers
      };
      return this.httpClient.post(apiUrl, action.payload, config)
        .map((res: any) => {
          if (res.status) {
            return {
              type: WidgetActions.GET_WIDGET_LIST_SUCCESS,
              payload: res.response
            };
          } else {
            return {
              type: AlertActions.ALERT_SHOW,
              payload: {message: res.message, type: 'danger'}
            };
          }

        })
        .catch((err: HttpErrorResponse) => {
          return of(
            {
              type: AlertActions.ALERT_SHOW,
              payload: {message: err.error, type: 'danger'}
            }
          );
        });
    });

  @Effect()
  editWidget = this.actions$
    .ofType(WidgetActions.EDIT_WIDGET_ATTEMPT)
    .switchMap((action: WidgetActions.EditWidgetAttempt) => {
      const apiUrl = environment.API_BASE_URL + 'updateWidgets';
      const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest');
      const config = {
        headers: headers
      };
      return this.httpClient.post(apiUrl, action.payload, config)
        .mergeMap((res: any) => {
          if (res.status) {
            return [
              {
                type: WidgetActions.EDIT_WIDGET_SUCCESS,
                payload: res.response
              },
              {
                type: AlertActions.ALERT_SHOW,
                payload: {message: res.message, type: 'success'}
              }
            ];
          } else {
            return [
              {
                type: AlertActions.ALERT_SHOW,
                payload: {message: res.message, type: 'danger'}
              }
            ];
          }
        })
        .catch((err: HttpErrorResponse) => {
          return of(
            {
              type: AlertActions.ALERT_SHOW,
              payload: {message: err.error, type: 'danger'}
            }
          );
        });
    });

  @Effect()
  widgetToEdit = this.actions$
    .ofType(WidgetActions.GET_WIDGET_TO_EDIT_ATTEMPT)
    .switchMap((action: WidgetActions.GetWidgetToEditAttempt) => {
      const apiUrl = environment.API_BASE_URL + 'viewWidgets';
      const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest');
      const config = {
        headers: headers
      };
      return this.httpClient.post(apiUrl, action.payload, config)
        .map((res: any) => {
          if (res.status) {
            return {
                type: WidgetActions.GET_WIDGET_TO_EDIT_SUCCESS,
                payload: res.response
              };
          } else {
            return {
                type: AlertActions.ALERT_SHOW,
                payload: {message: res.message, type: 'danger'}
              };
          }
        })
        .catch((err: HttpErrorResponse) => {
          return of(
            {
              type: AlertActions.ALERT_SHOW,
              payload: {message: err.error, type: 'danger'}
            }
          );
        });
    });
  @Effect()
  searchNumber = this.actions$
    .ofType(WidgetActions.GET_NUMBER_LIST_ATTEMPT)
    .switchMap((action: WidgetActions.GetNumberListAttempt) => {
      const apiUrl = environment.API_BASE_URL + 'search-number';
      const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest');
      const config = {
        headers: headers
      };
      this.spinnerService.show();
      return this.httpClient.post(apiUrl, action.payload, config)
        .map((res: any) => {
          this.spinnerService.hide();
          if (res.status) {
            return {
              type: WidgetActions.GET_NUMBER_LIST_SUCCESS,
              payload:  { res:res.data, type:'success' }
            };
          } else {
            return {
              type: WidgetActions.GET_NUMBER_LIST_ERROR,
              payload: { message: res.message, type: 'danger' }
            };
          }
        })
        .catch((err: HttpErrorResponse) => {
          return of(
            {
              type: WidgetActions.GET_NUMBER_LIST_ERROR,
              payload: { message: err.error, type: 'danger' }
            }
          );
        });
    });
  @Effect()
  deleteWidget =  this.actions$
    .ofType(WidgetActions.WIDGET_DELETE_ATTEMPT)
    .switchMap((action: WidgetActions.DeleteWidgetAttempt) => {
      const apiUrl = environment.API_BASE_URL + 'delete-widget';
      const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest');
      const config = {
        headers: headers
      };
      return this.httpClient.post(apiUrl, action.payload, config)
        .mergeMap((res: any) => {
          if (res.status) {
            return [
              {
                type: WidgetActions.WIDGET_DELETE_SUCCESS,
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
}
