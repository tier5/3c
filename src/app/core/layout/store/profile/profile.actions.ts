import { Action } from '@ngrx/store';

export const GET_PROFILE_ATTEMPT = 'GET_PROFILE_ATTEMPT';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';

export const EDIT_PROFILE_ATTEMPT = 'EDIT_PROFILE_ATTEMPT';
export const EDIT_PROFILE_SUCCESS = 'EDIT_PROFILE_SUCCESS';

export const EDIT_PROFILE_CHANGE_PASSWORD_ATTEMPT = 'EDIT_PROFILE_CHANGE_PASSWORD_ATTEMPT';
export const EDIT_PROFILE_CHANGE_PASSWORD_SUCCESS = 'EDIT_PROFILE_CHANGE_PASSWORD_SUCCESS';

export class GetProfileAttempt implements Action {
  readonly type = GET_PROFILE_ATTEMPT;
}

export class GetProfileSuccess implements Action {
  readonly type = GET_PROFILE_SUCCESS;
  constructor(public payload: any) { }
}

export class EditProfileAttempt implements Action {
  readonly type = EDIT_PROFILE_ATTEMPT;
  constructor(public payload: any) { }
}

export class EditProfileSuccess implements Action {
  readonly type = EDIT_PROFILE_SUCCESS;
  constructor(public payload: any) { }
}

export class EditProfileChangePasswordAttempt implements Action {
  readonly type = EDIT_PROFILE_CHANGE_PASSWORD_ATTEMPT;
  constructor(public payload: {password: string, confPassword: string}) { }
}

export class EditProfileChangePasswordSuccess implements Action {
  readonly type = EDIT_PROFILE_CHANGE_PASSWORD_SUCCESS;
  constructor(public payload: boolean) { }
}

export type ProfileActions =
  GetProfileAttempt | GetProfileSuccess |
  EditProfileAttempt | EditProfileSuccess |
  EditProfileChangePasswordAttempt | EditProfileChangePasswordSuccess;