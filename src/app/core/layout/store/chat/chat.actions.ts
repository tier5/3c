import { Action } from '@ngrx/store';

export const CONNECT_ATTEMPT = 'CONNECT_ATTEMPT';
export const CONNECT_SUCCESS = "CONNECT_SUCCESS"

export class ConnectAttempt implements Action {
  readonly type = CONNECT_ATTEMPT;
}

export class ConnectSuccess implements Action {
  readonly type = CONNECT_SUCCESS;
}

export type ChatActions = ConnectAttempt | ConnectSuccess;