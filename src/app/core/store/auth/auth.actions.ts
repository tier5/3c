import { Action } from '@ngrx/store';

export const SIGNUP_ATTEMPT = 'SIGNUP_ATTEMPT';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILED = 'SIGNUP_FAILED';
export const SIGNIN_ATTEMPT = 'SIGNIN_ATTEMPT';
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNOUT_ATTEMPT = 'SIGNOUT_ATTEMPT';
export const SIGNOUT_SUCCESS = 'SIGNOUT_SUCCESS';
export const FORGOT_PASSWORD_ATTEMPT = 'FORGOT_PASSWORD_ATTEMPT';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ATTEMPT = 'RESET_PASSWORD_ATTEMPT';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const CHECK_TOKEN = 'CHECK_TOKEN';
export const CHECK_TWILIO_ACTIVE_ATTEMPT = 'CHECK_TWILIO_ACTIVE_ATTEMPT';
export const CHECK_TWILIO_ACTIVE_SUCCESS = 'CHECK_TWILIO_ACTIVE_SUCCESS';
export const UPDATE_ATTEMPT = 'UPDATE_ATTEMPT';


export class SignUpAttempt implements Action {
  readonly type = SIGNUP_ATTEMPT;
  constructor(public payload: { firstName: string, lastName: string, email: string, password: string, conf_pass: string }) {}
}

export class SignUpSuccess implements Action {
  readonly type = SIGNUP_SUCCESS;
  constructor(public payload: boolean) {}
}

export class SignInAttempt implements Action {
  readonly type = SIGNIN_ATTEMPT;
  constructor(public payload: { email: string, password: string }) {}
}

export class SignInSuccess implements Action {
  readonly type = SIGNIN_SUCCESS;
  constructor(public payload: any) {}
}

export class SignOutAttempt implements Action {
  readonly type = SIGNOUT_ATTEMPT;
}

export class SignOutSuccess implements Action {
  readonly type = SIGNOUT_SUCCESS;
}

export class ForgotPasswordAttempt implements Action {
  readonly type = FORGOT_PASSWORD_ATTEMPT;
  constructor(public payload: { email: string }) {}
}

export class ForgotPasswordSuccess implements Action {
  readonly type = FORGOT_PASSWORD_SUCCESS;
  constructor(public payload: boolean) {}
}

export class ResetPasswordAttempt implements Action {
  readonly type = RESET_PASSWORD_ATTEMPT;
  constructor(public payload: { password: string, conf_pass: string, id: string }) {}
}

export class ResetPasswordSuccess implements Action {
  readonly type = RESET_PASSWORD_SUCCESS;
  constructor(public payload: boolean) {}
}

export class CheckToken implements Action {
  readonly type = CHECK_TOKEN;
}

export class CheckTwilioActiveAttempt implements Action {
  readonly type = CHECK_TWILIO_ACTIVE_ATTEMPT;
}

export class CheckTwilioActiveSuccess implements Action {
  readonly type = CHECK_TWILIO_ACTIVE_SUCCESS;
  constructor(public payload: boolean) {}
}

export class UpdateAttempt implements Action {
  readonly type = UPDATE_ATTEMPT;
  constructor(public payload: any) {}
}

export type AuthActions = CheckToken |
  SignUpAttempt | SignUpSuccess |
  SignInAttempt | SignInSuccess |
  SignOutAttempt | SignOutSuccess |
  ForgotPasswordAttempt | ForgotPasswordSuccess |
  ResetPasswordAttempt | ResetPasswordSuccess |
  CheckTwilioActiveAttempt | CheckTwilioActiveSuccess |
  UpdateAttempt ;
