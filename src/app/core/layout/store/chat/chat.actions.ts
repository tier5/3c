import { Action } from '@ngrx/store';

export const CONNECT_TRY = 'CONNECT_TRY';
export const CONNECT_SUCCESS = "CONNECT_SUCCESS"

export class ConnectTry implements Action {
  readonly type = CONNECT_TRY;
  constructor(public payload: any) { }
}

export class ConnectSuccess implements Action {
  readonly type = CONNECT_SUCCESS;
  constructor(public payload: any) { }
}

export type ChatActions = ConnectTry | ConnectSuccess;