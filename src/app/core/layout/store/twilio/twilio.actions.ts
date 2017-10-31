import { Action } from '@ngrx/store';

export const GET_TWILIO_ATTEMPT = 'GET_TWILIO_ATTEMPT';
export const GET_TWILIO_SUCCESS = 'GET_TWILIO_SUCCESS';
export const ADD_TWILIO_ATTEMPT = 'ADD_TWILIO_ATTEMPT';
export const ADD_TWILIO_SUCCESS = 'ADD_TWILIO_SUCCESS';
export const EDIT_TWILIO_ATTEMPT = 'EDIT_TWILIO_ATTEMPT';
export const EDIT_TWILIO_SUCCESS = 'EDIT_TWILIO_SUCCESS';
export const GET_TWILIO_LIST_ATTEMPT = 'GET_TWILIO_LIST_ATTEMPT';
export const GET_TWILIO_LIST_SUCCESS = 'GET_TWILIO_LIST_SUCCESS';

export class GetTwilioAttempt implements Action {
  readonly type = GET_TWILIO_ATTEMPT;
}

export class GetTwilioSuccess implements Action {
  readonly type = GET_TWILIO_SUCCESS;
  constructor(public payload: any) { }
}

export class AddTwilioAttempt implements Action {
  readonly type = ADD_TWILIO_ATTEMPT;
  constructor(public payload: { twilio_sid: string, twilio_token: string }) { }
}

export class AddTwilioSuccess implements Action {
  readonly type = ADD_TWILIO_SUCCESS;
  constructor(public payload: any) { }
}

export class EditTwilioAttempt implements Action {
  readonly type = EDIT_TWILIO_ATTEMPT;
  constructor(public payload: any) { }
}

export class EditTwilioSuccess implements Action {
  readonly type = EDIT_TWILIO_SUCCESS;
  constructor(public payload: any) { }
}

export class GetTwilioListAttempt implements Action {
  readonly type = GET_TWILIO_LIST_ATTEMPT;
}

export class GetTwilioListSuccess implements Action {
  readonly type = GET_TWILIO_LIST_SUCCESS;
  constructor(public payload: any) { }
}

export type TwilioActions =
  GetTwilioAttempt | GetTwilioSuccess |
  AddTwilioAttempt | AddTwilioSuccess |
  EditTwilioAttempt | EditTwilioSuccess |
  GetTwilioListAttempt | GetTwilioListSuccess;
