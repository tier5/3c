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
import * as AgentActions from './agent.actions';
import * as AlertActions from '../../../store/alert/alert.actions';
import { environment } from '../../../../../environments/environment';
import {GET_COMPANY_LIST_ATTEMPT} from './agent.actions';
import {GET_COMPANY_LIST_SUCCESS} from './agent.actions';
import * as AdminActions from '../admin/admin.actions';

@Injectable()
export class AgentEffects {

  constructor (private actions$: Actions,
               private httpClient: HttpClient) {}

  @Effect()
  addAdmin = this.actions$
    .ofType(AgentActions.ADD_AGENT_ATTEMPT)
    .switchMap((action: AgentActions.AddAgentAttempt) => {
      const apiUrl = environment.API_BASE_URL + 'agent-register';
      const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest');
      const config = {
        headers: headers
      };
      return this.httpClient.post(apiUrl, action.payload, config)
        .mergeMap((res: any) => {
          if (res.status) {
            return [
              {
                type: AgentActions.ADD_AGENT_SUCCESS,
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
  getAgentList = this.actions$
    .ofType(AgentActions.GET_AGENT_LIST_ATTEMPT)
    .switchMap((action: AgentActions.GetAgentListAttempt) => {
      const apiUrl = environment.API_BASE_URL + 'listofAgent';
      const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest');
      const config = {
        headers: headers
      };
      return this.httpClient.post(apiUrl, config)
        .map((res: any) => {
          if (res.status) {
            return {
              type: AgentActions.GET_AGENT_LIST_SUCCESS,
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
  editAgent = this.actions$
    .ofType(AgentActions.EDIT_AGENT_ATTEMPT)
    .switchMap((action: AgentActions.EditAgentAttempt) => {
      const apiUrl = environment.API_BASE_URL + 'agent-update';
      const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest');
      const config = {
        headers: headers
      };
      return this.httpClient.post(apiUrl, action.payload, config)
        .mergeMap((res: any) => {
          if (res.status) {
            return [
              {
                type: AgentActions.EDIT_AGENT_SUCCESS,
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
  getToEditDepartmentList = this.actions$
    .ofType(AgentActions.GET_TO_EDIT_AGENT_ATTEMPT)
    .switchMap((action: AgentActions.GetToEditAgentAttempt) => {
      const apiUrl = environment.API_BASE_URL + 'view-agent';
      const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest');
      const config = {
        headers: headers
      };
      return this.httpClient.post(apiUrl, action.payload, config)
        .map((res: any) => {
          return {
            type: AgentActions.GET_TO_EDIT_AGENT_SUCCESS,
            payload: res.response
          };
        })
        .catch((err: HttpErrorResponse) => {
          return of(
            {
              type: AlertActions.ALERT_SHOW,
              payload: {message: err.message, type: 'danger'}
            }
          );
        });
    });

    @Effect()
    getAdminAgentList = this.actions$
        .ofType(AgentActions.GET_ADMIN_AGENT_LIST_ATTEMPT)
        .switchMap((action: AgentActions.GetAdminAgentListAttempt) => {
            const apiUrl = environment.API_BASE_URL + 'get-admin-agents';
            const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest');
            const config = {
                headers: headers
            };
            return this.httpClient.post(apiUrl, action.payload, config)
                .map((res: any) => {
                    if (res.status) {
                        return {
                            type: AgentActions.GET_ADMIN_AGENT_LIST_SUCCESS,
                            payload: res.response
                        };
                    } else {
                        return {
                            type: AlertActions.ALERT_SHOW,
                            payload: { message: res.message, type: 'danger'}
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
    getCompanyList = this.actions$
        .ofType(AgentActions.GET_COMPANY_LIST_ATTEMPT)
        .switchMap((action: AgentActions.GetCompanyListAttempt) => {
            const apiUrl = environment.API_BASE_URL + 'get-company-list';
            const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest');
            const config = {
                headers: headers
            };
            return this.httpClient.post(apiUrl, config)
                .map((res: any) => {
                    if (res.status) {
                        return {
                            type: AgentActions.GET_COMPANY_LIST_SUCCESS,
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
    blockAgent =  this.actions$
      .ofType(AgentActions.AGENT_BLOCK_ATTEMPT)
      .switchMap((action: AgentActions.BlockAgentAttempt) => {
        const apiUrl = environment.API_BASE_URL + 'block-agent';
        const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest');
        const config = {
          headers: headers
        };
        return this.httpClient.post(apiUrl, action.payload, config)
          .mergeMap((res: any) => {
            if (res.status) {
              return [
                {
                  type: AgentActions.AGENT_BLOCK_SUCCESS,
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
  unblockAgent =  this.actions$
    .ofType(AgentActions.AGENT_UNBLOCK_ATTEMPT)
    .switchMap((action: AgentActions.UnblockAgentAttempt) => {
      const apiUrl = environment.API_BASE_URL + 'unblock-agent';
      const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest');
      const config = {
        headers: headers
      };
      return this.httpClient.post(apiUrl, action.payload, config)
        .mergeMap((res: any) => {
          if (res.status) {
            return [
              {
                type: AgentActions.AGENT_UNBLOCK_SUCCESS,
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
  deleteAgent =  this.actions$
    .ofType(AgentActions.AGENT_DELETE_ATTEMPT)
    .switchMap((action: AgentActions.DeleteAgentAttempt) => {
      const apiUrl = environment.API_BASE_URL + 'delete-agent';
      const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest');
      const config = {
        headers: headers
      };
      return this.httpClient.post(apiUrl, action.payload, config)
        .mergeMap((res: any) => {
          if (res.status) {
            return [
              {
                type: AgentActions.AGENT_DELETE_SUCCESS,
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
