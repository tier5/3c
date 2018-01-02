import { Action } from '@ngrx/store';

export const CONNECT_ATTEMPT = 'CONNECT_ATTEMPT';
export const CONNECT_SUCCESS = "CONNECT_SUCCESS";


export const ADD_NEW_MSG_TO_CHAT_LIST = "ADD_NEW_MSG_TO_CHAT_LIST";
export const ADD_TO_CHAT_LIST = "ADD_TO_CHAT_LIST";
export const EDIT_FROM_CHAT_LIST = "EDIT_FROM_CHAT_LIST";
export const DELETE_FROM_CHAT_LIST = "DELETE_FROM_CHAT_LIST";

export const GET_AGENT_LIST_ATTEMPT = 'GET_AGENT_LIST_ATTEMPT';
export const GET_AGENT_LIST_SUCCESS = 'GET_AGENT_LIST_SUCCESS';

export const GET_CHAT_LIST_ATTEMPT = 'GET_CHAT_LIST_ATTEMPT';
export const GET_CHAT_LIST_SUCCESS = 'GET_CHAT_LIST_SUCCESS';

export const GET_CONTACT_LIST_ATTEMPT = 'GET_CONTACT_LIST_ATTEMPT';
export const GET_CONTACT_LIST_SUCCESS = 'GET_CONTACT_LIST_SUCCESS';


export class ConnectAttempt implements Action {
  readonly type = CONNECT_ATTEMPT;
}

export class ConnectSuccess implements Action {
  readonly type = CONNECT_SUCCESS;
}

export class AddNewMsgToChatList implements Action {
  readonly type = ADD_NEW_MSG_TO_CHAT_LIST;
  constructor(public payload: any) {}
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

export class GetAgentListAttempt implements Action {
  readonly type = GET_AGENT_LIST_ATTEMPT;
}

export class GetAgentListSuccess implements Action {
  readonly type = GET_AGENT_LIST_SUCCESS;
  constructor(public payload: any) { }
}

export class GetChatListAttempt implements Action {
  readonly type = GET_CHAT_LIST_ATTEMPT;
  constructor(public payload: any) { }
}

export class GetChatListSuccess implements Action {
  readonly type = GET_CHAT_LIST_SUCCESS;
  constructor(public payload: any) { }
}

export class GetContactListAttempt implements Action {
  readonly type = GET_CONTACT_LIST_ATTEMPT;
  constructor(public payload: any) { }
}

export class GetContactListSuccess implements Action {
  readonly type = GET_CONTACT_LIST_SUCCESS;
  constructor(public payload: any) { }
}



export type ChatActions =
    ConnectAttempt | ConnectSuccess |
        AddToChatList | AddNewMsgToChatList |
        EditFromChatList | DeleteFromChatList |
        GetAgentListAttempt | GetAgentListSuccess |
        GetChatListAttempt | GetChatListSuccess |
        GetContactListAttempt | GetContactListSuccess ;