import { Action } from '@ngrx/store';

export const CONNECT_ATTEMPT = 'CONNECT_ATTEMPT';
export const CONNECT_SUCCESS = "CONNECT_SUCCESS";

export const ADD_TO_CHAT_LIST = "ADD_TO_CHAT_LIST";
export const EDIT_FROM_CHAT_LIST = "EDIT_FROM_CHAT_LIST";
export const DELETE_FROM_CHAT_LIST = "DELETE_FROM_CHAT_LIST";

export class ConnectAttempt implements Action {
  readonly type = CONNECT_ATTEMPT;
}

export class ConnectSuccess implements Action {
  readonly type = CONNECT_SUCCESS;
}

export class AddToChatList implements Action {
  readonly type = ADD_TO_CHAT_LIST;
  constructor(public payload: any) {}
}

export class EditFromChatList implements Action {
  readonly type = EDIT_FROM_CHAT_LIST;
  constructor(public payload: any) {}
}

export class DeleteFromChatList implements Action {
  readonly type = DELETE_FROM_CHAT_LIST;
  constructor(public payload: any) {}
}

export type ChatActions = ConnectAttempt | ConnectSuccess |
  AddToChatList | EditFromChatList | DeleteFromChatList;
