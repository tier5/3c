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
import * as DepartmentActions from '../department/department.actions';
import * as AlertActions from '../../../store/alert/alert.actions';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class DepartmentEffects {

  constructor (private actions$: Actions,
               private httpClient: HttpClient) {}

  @Effect()
  addDepartment = this.actions$
    .ofType(DepartmentActions.ADD_DEPARTMENT_ATTEMPT)
    .switchMap((action: DepartmentActions.AddDepartmentAttempt) => {
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
                payload: { message: res.message, type: 'success' }
              },
              {
                type: DepartmentActions.ADD_DEPARTMENT_SUCCESS,
                payload: res.response
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
  editDepartment = this.actions$
    .ofType(DepartmentActions.EDIT_DEPARTMENT_ATTEMPT)
    .switchMap((action: DepartmentActions.EditDepartmentAttempt) => {
      const apiUrl = environment.API_BASE_URL + 'edit-department';
      const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest')
      const config = {
        headers: headers
      }
      return this.httpClient.post(apiUrl, action.payload, config)
        .mergeMap((res: any) => {
          if (res.status) {
            return [
              {
                type: DepartmentActions.EDIT_DEPARTMENT_SUCCESS,
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
              payload: { message: err.message, type: 'danger' }
            }
          )
        })
    });

  @Effect()
  getDepartmentList = this.actions$
    .ofType(DepartmentActions.GET_DEPARTMENT_LIST_ATTEMPT)
    .switchMap((action: DepartmentActions.GetDepartmentListAttempt) => {
      const apiUrl = environment.API_BASE_URL + 'department-list';
      const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest')
      const config = {
        headers: headers
      }
      return this.httpClient.post(apiUrl, action.payload, config)
        .map((res: any) => {
          return {
            type: DepartmentActions.GET_DEPARTMENT_LIST_SUCCESS,
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
  getToEditDepartment = this.actions$
    .ofType(DepartmentActions.GET_TO_EDIT_DEPARTMENT_ATTEMPT)
    .switchMap((action: DepartmentActions.GetToEditDepartmentAttempt) => {
      const apiUrl = environment.API_BASE_URL + 'view-department';
      const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest')
      const config = {
        headers: headers
      }
      return this.httpClient.post(apiUrl, action.payload, config)
        .map((res: any) => {
          return {
            type: DepartmentActions.GET_TO_EDIT_DEPARTMENT_SUCCESS,
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
  preDeleteDepartment = this.actions$
    .ofType(DepartmentActions.PRE_DELETE_ATTEMPT)
    .switchMap((action: DepartmentActions.PreDeleteAttempt) => {
      const apiUrl = environment.API_BASE_URL + 'check-pre-delete-department';
      const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest')
      const config = {
        headers: headers
      }
      return this.httpClient.post(apiUrl, action.payload, config)
        .map((res: any) => {
          if (res.status) {
            return {
                type: DepartmentActions.PRE_DELETE_SUCCESS,
                payload: res.response
              }
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
  deleteDepartment = this.actions$
    .ofType(DepartmentActions.DEPARTMENT_DELETE_ATTEMPT)
    .switchMap((action: DepartmentActions.DepartmentDeleteAttempt) => {
      const apiUrl = environment.API_BASE_URL + 'delete-department';
      const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest')
      const config = {
        headers: headers
      }
      return this.httpClient.post(apiUrl, action.payload, config)
        .mergeMap((res: any) => {
          if (res.status) {
            return [
              {
                type: DepartmentActions.DEPARTMENT_DELETE_SUCCESS,
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
              payload: { message: err.message, type: 'danger' }
            }
          )
        })
    });

}
