import { Action } from '@ngrx/store';

export const GET_ADMIN_ATTEMPT = 'GET_ADMIN_ATTEMPT';
export const GET_ADMIN_SUCCESS = 'GET_ADMIN_SUCCESS';

export const ADD_ADMIN_ATTEMPT = 'ADD_ADMIN_ATTEMPT';
export const ADD_ADMIN_SUCCESS = 'ADD_ADMIN_SUCCESS';

export const EDIT_ADMIN_ATTEMPT = 'EDIT_ADMIN_ATTEMPT';
export const EDIT_ADMIN_SUCCESS = 'EDIT_ADMIN_SUCCESS';

export const GET_ADMIN_LIST_ATTEMPT = 'GET_ADMIN_LIST_ATTEMPT';
export const GET_ADMIN_LIST_SUCCESS = 'GET_ADMIN_LIST_SUCCESS';

export const RESET_ADMIN_FORM = 'RESET_ADMIN_FORM';

export const CREATE_TWILIO_SID_ATTEMPT = 'CREATE_TWILIO_SID_ATTEMPT';
export const CREATE_TWILIO_SID_SUCCESS = 'CREATE_TWILIO_SID_SUCCESS';

export const BLOCK_ADMIN_USER_ATTEMPT = 'BLOCK_ADMIN_USER_ATTEMPT';
export const BLOCK_ADMIN_USER_SUCCESS = 'BLOCK_ADMIN_USER_SUCCESS';

export const UNBLOCK_ADMIN_USER_ATTEMPT = 'UNBLOCK_ADMIN_USER_ATTEMPT';
export const UNBLOCK_ADMIN_USER_SUCCESS = 'UNBLOCK_ADMIN_USER_SUCCESS';

export const GET_TO_EDIT_ADMIN_ATTEMPT = 'GET_TO_EDIT_ADMIN_ATTEMPT';
export const GET_TO_EDIT_ADMIN_SUCCESS = 'GET_TO_EDIT_ADMIN_SUCCESS';


export class GetAdminAttempt implements Action {
  readonly type = GET_ADMIN_ATTEMPT;
}

export class GetAdminSuccess implements Action {
  readonly type = GET_ADMIN_SUCCESS;
  constructor(public payload: any) { }
}

export class AddAdminAttempt implements Action {
  readonly type = ADD_ADMIN_ATTEMPT;
  constructor(public payload: { firstName: string, lastName: string, password: string, phone: string, company: string }) { }
}

export class AddAdminSuccess implements Action {
  readonly type = ADD_ADMIN_SUCCESS;
  constructor(public payload: any) { }
}

export class EditAdminAttempt implements Action {
  readonly type = EDIT_ADMIN_ATTEMPT;
  constructor(public payload: any) { }
}

export class EditAdminSuccess implements Action {
  readonly type = EDIT_ADMIN_SUCCESS;
  constructor(public payload: any) { }
}

export class GetAdminListAttempt implements Action {
  readonly type = GET_ADMIN_LIST_ATTEMPT;
}

export class GetAdminListSuccess implements Action {
  readonly type = GET_ADMIN_LIST_SUCCESS;
  constructor(public payload: any) { }
}

export class ResetAdminForm implements Action {
  readonly type = RESET_ADMIN_FORM;
}

export class CreateTwilioSidAttempt implements Action {
  readonly type = CREATE_TWILIO_SID_ATTEMPT;
  constructor(public payload: any) { }
}

export class CreateTwilioSidSuccess implements Action {
  readonly type = CREATE_TWILIO_SID_SUCCESS;
  constructor(public payload: any) { }
}

export class BlockAdminUserAttempt implements Action {
  readonly type = BLOCK_ADMIN_USER_ATTEMPT;
  constructor(public payload: any) { }
}

export class BlockAdminUserSuccess implements Action {
  readonly type = BLOCK_ADMIN_USER_SUCCESS;
  constructor(public payload: any) { }
}

export class UnblockAdminUserAttempt implements Action {
  readonly type = UNBLOCK_ADMIN_USER_ATTEMPT;
  constructor(public payload: any) { }
}

export class UnblockAdminUserSuccess implements Action {
  readonly type = UNBLOCK_ADMIN_USER_SUCCESS;
  constructor(public payload: any) { }
}

export class GetToEditAdminAttempt implements Action {
  readonly type = GET_TO_EDIT_ADMIN_ATTEMPT;
  constructor(public payload: any) { }
}

export class GetToEditAdminSuccess implements Action {
  readonly type = GET_TO_EDIT_ADMIN_SUCCESS;
  constructor(public payload: any) { }
}

export type AdminActions = ResetAdminForm |
  GetAdminAttempt | GetAdminSuccess |
  AddAdminAttempt | AddAdminSuccess |
  EditAdminAttempt | EditAdminSuccess |
  GetAdminListAttempt | GetAdminListSuccess |
  CreateTwilioSidAttempt | CreateTwilioSidSuccess |
  BlockAdminUserAttempt | BlockAdminUserSuccess |
  UnblockAdminUserAttempt | UnblockAdminUserSuccess |
  GetToEditAdminAttempt | GetToEditAdminSuccess;
