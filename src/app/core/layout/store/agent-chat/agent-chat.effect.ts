import {Actions, Effect} from '@ngrx/effects';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';

import * as AgentChatActions from '../agent-chat/agent-chat.action';
import * as AlertActions from '../../../store/alert/alert.actions';
import {environment} from '../../../../../environments/environment';
import {GetAgentCloseChatAttempt} from '../agent-chat/agent-chat.action';
import {SpinnerService} from '../../../shared/spinner';


@Injectable()
export class AgentChatEffects {

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private spinnerService: SpinnerService) {
  }

  @Effect()
  getAgentListWithChat = this.actions$
    .ofType(AgentChatActions.GET_AGENT_LIVE_CHAT_ATTEMPT)
    .switchMap((action: AgentChatActions.GetAgentLiveChatAttempt) => {
      this.spinnerService.show();
      const apiUrl = environment.API_BASE_URL + 'agent-all-chats';
      const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest');
      const config = {
        headers: headers
      };
      return this.httpClient.post(apiUrl, config)
        .map((res: any) => {
          this.spinnerService.hide();
          if (res.status) {
            return {
              type: AgentChatActions.GET_AGENT_LIVE_CHAT_SUCCESS,
              payload: res.response
            };
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
  getAgentCloseListWithChat = this.actions$
    .ofType(AgentChatActions.GET_AGENT_CLOSE_CHAT_ATTEMPT)
    .switchMap((action: AgentChatActions.GetAgentCloseChatAttempt) => {
      this.spinnerService.show();
      const apiUrl = environment.API_BASE_URL + 'all-agent-closed-chats';
      const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest');
      const config = {
        headers: headers
      };
      return this.httpClient.post(apiUrl, config)
        .map((res: any) => {
          this.spinnerService.hide();
          if (res.status) {
            return {
              type: AgentChatActions.GET_AGENT_CLOSE_CHAT_SUCCESS,
              payload: res.response
            };
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

}
