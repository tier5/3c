import { Action } from '@ngrx/store';

export const GET_AGENT_ATTEMPT = 'GET_AGENT_ATTEMPT';
export const GET_AGENT_SUCCESS = 'GET_AGENT_SUCCESS';

export const ADD_AGENT_ATTEMPT = 'ADD_AGENT_ATTEMPT';
export const ADD_AGENT_SUCCESS = 'ADD_AGENT_SUCCESS';

export const EDIT_AGENT_ATTEMPT = 'EDIT_AGENT_ATTEMPT';
export const EDIT_AGENT_SUCCESS = 'EDIT_AGENT_SUCCESS';

export const GET_AGENT_LIST_ATTEMPT = 'GET_AGENT_LIST_ATTEMPT';
export const GET_AGENT_LIST_SUCCESS = 'GET_AGENT_LIST_SUCCESS';

export const RESET_AGENT_FORM = 'RESET_AGENT_FORM';

export const GET_TO_EDIT_AGENT_ATTEMPT = 'GET_TO_EDIT_AGENT_ATTEMPT';
export const GET_TO_EDIT_AGENT_SUCCESS = 'GET_TO_EDIT_AGENT_SUCCESS';

export const GET_AGENT_LIST_FILTER_ATTEMPT = 'GET_AGENT_LIST_FILTER_ATTEMPT';
export const GET_AGENT_LIST_FILTER_SUCCESS = 'GET_AGENT_LIST_FILTER_SUCCESS';

export class GetAgentAttempt implements Action {
  readonly type = GET_AGENT_ATTEMPT;
}

export class GetAgentSuccess implements Action {
  readonly type = GET_AGENT_SUCCESS;
  constructor(public payload: any) { }
}

export class AddAgentAttempt implements Action {
  readonly type = ADD_AGENT_ATTEMPT;
  constructor(public payload: { firstName: string, lastName: string, phone: string }) { }
}

export class AddAgentSuccess implements Action {
  readonly type = ADD_AGENT_SUCCESS;
  constructor(public payload: any) { }
}

export class EditAgentAttempt implements Action {
  readonly type = EDIT_AGENT_ATTEMPT;
  constructor(public payload: any) { }
}

export class EditAgentSuccess implements Action {
  readonly type = EDIT_AGENT_SUCCESS;
  constructor(public payload: any) { }
}

export class GetAgentListAttempt implements Action {
  readonly type = GET_AGENT_LIST_ATTEMPT;
}

export class GetAgentListSuccess implements Action {
  readonly type = GET_AGENT_LIST_SUCCESS;
  constructor(public payload: any) { }
}

export class ResetAgentForm implements Action {
  readonly type = RESET_AGENT_FORM;
}

export class GetToEditAgentAttempt implements Action {
  readonly type = GET_TO_EDIT_AGENT_ATTEMPT;
  constructor(public payload: any) { }
}

export class GetToEditAgentSuccess implements Action {
  readonly type = GET_TO_EDIT_AGENT_SUCCESS;
  constructor(public payload: any) { }
}

export class GetAgentListFilterAttempt implements Action {
  readonly type = GET_AGENT_LIST_FILTER_ATTEMPT;
  constructor(public payload: any) { }
}

export class GetAgentListFilterSuccess implements Action {
  readonly type = GET_AGENT_LIST_FILTER_SUCCESS;
  constructor(public payload: any) { }
}

export type AgentActions = ResetAgentForm |
  GetAgentAttempt | GetAgentSuccess |
  AddAgentAttempt | AddAgentSuccess |
  EditAgentAttempt | EditAgentSuccess |
  GetAgentListAttempt | GetAgentListSuccess |
  GetToEditAgentAttempt | GetToEditAgentSuccess |
  GetAgentListFilterAttempt | GetAgentListFilterSuccess;
