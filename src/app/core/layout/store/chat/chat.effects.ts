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
import { ChatService } from '../../inner-pages/chat/chat.service';
import { GET_CONTACT_LIST_ATTEMPT } from './chat.actions';
import {GET_AGENT_CLOSED_CHATS_ATTEMPT} from "../chat/chat.actions";

@Injectable()
export class ChatEffects {

    constructor (private actions$: Actions,
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
            // this.chatService.connect();
        });


    @Effect()
    getAgentList = this.actions$
        .ofType(ChatActions.GET_AGENT_LIST_ATTEMPT)
        .switchMap((action: ChatActions.GetAgentListAttempt) => {
            const apiUrl = environment.API_BASE_URL + 'listofAgent';
            const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest');
            const config = {
                headers: headers
            };
            return this.httpClient.post(apiUrl, config)
                .mergeMap((res: any) => {
                    if (res.status) {
                        return [
                            {
                                type: ChatActions.GET_AGENT_LIST_SUCCESS,
                                payload: res.response
                            }
                        ];
                    } else {
                        return [
                            {
                                type: ChatActions.GET_AGENT_LIST_SUCCESS,
                                payload: []
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
    getChatList = this.actions$
        .ofType(ChatActions.GET_CHAT_LIST_ATTEMPT)
        .switchMap((action: ChatActions.GetChatListAttempt) => {
            const apiUrl = environment.API_BASE_URL + 'client-chat';
            const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest');
            const config = {
                headers: headers
            };

            return this.httpClient.post(apiUrl, action.payload, config)
                .map((res: any) => {
                    if (res.status) {
                        return {
                            type: ChatActions.GET_CHAT_LIST_SUCCESS,
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
    getContactList = this.actions$
        .ofType(ChatActions.GET_CONTACT_LIST_ATTEMPT)
        .switchMap((action: ChatActions.GetContactListAttempt) => {
            const apiUrl = environment.API_BASE_URL + 'contact-list';
            const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest');
            const config = {
                headers: headers
            };

            return this.httpClient.post(apiUrl, action.payload, config)
                .mergeMap((res: any) => {
                    if (res.status) {
                        return [
                            {
                                type: ChatActions.GET_CONTACT_LIST_SUCCESS,
                                payload: res.response
                            }
                        ];
                    } else {
                        return [
                            {
                                type: AlertActions.ALERT_SHOW,
                                payload: {message: res.message, type: 'danger'},
                            },
                            {
                                type: ChatActions.GET_CONTACT_LIST_SUCCESS,
                                payload: []
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
    getTransferAgentList = this.actions$
        .ofType(ChatActions.GET_TRANSFER_AGENT_LIST_ATTEMPT)
        .switchMap((action: ChatActions.GetTransferAgentListAttempt) => {
            const apiUrl = environment.API_BASE_URL + 'agent-department-list';
            const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest');
            const config = {
                headers: headers
            };

            return this.httpClient.post(apiUrl, action.payload, config)
                .mergeMap((res: any) => {
                    if (res.status) {
                         // console.log(res.response);
                        return [
                            {
                                type: ChatActions.GET_TRANSFER_AGENT_LIST_SUCCESS,
                                payload: res.response
                            }
                        ];
                    } else {
                        return [
                            {
                                type: ChatActions.GET_TRANSFER_AGENT_LIST_SUCCESS,
                                payload: []
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
  getChatInitEffect = this.actions$
    .ofType(ChatActions.INI_CHAT_ATTEMPT)
    .switchMap((action: ChatActions.IniChatAttempt) => {
      const apiUrl = environment.API_BASE_URL + 'ini-chat';
      const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest');
      const config = {
        headers: headers
      };

      return this.httpClient.post(apiUrl, action.payload, config)
        .mergeMap((res: any) => {
          if (res.status) {
            return [
              {
                type: ChatActions.INI_CHAT_SUCCESS,
                payload: res.response
              }
            ];
          } else {
            return [
              {
                type: ChatActions.INI_CHAT_ERROR,
                payload: res.message
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
    getAllAgentClosedChats = this.actions$
        .ofType(ChatActions.GET_AGENT_CLOSED_CHATS_ATTEMPT)
        .switchMap((action: ChatActions.IniChatAttempt) => {
            const apiUrl = environment.API_BASE_URL + 'get-all-closed-chats';
            const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest');
            const config = {
                headers: headers
            };

            return this.httpClient.post(apiUrl, action.payload, config)
                .mergeMap((res: any) => {
                    if (res.status) {
                        return [
                            {
                                type: ChatActions.GET_AGENT_CLOSED_CHATS_SUCCESS,
                                payload: res.response
                            }
                        ];
                    } else {
                        return [
                            {
                                type: ChatActions.INI_CHAT_ERROR,
                                payload: res.message
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

}
