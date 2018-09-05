import { Action } from '@ngrx/store';

export const GET_WIDGET_ATTEMPT = 'GET_WIDGET_ATTEMPT';
export const GET_WIDGET_SUCCESS = 'GET_WIDGET_SUCCESS';

export const ADD_WIDGET_ATTEMPT = 'ADD_WIDGET_ATTEMPT';
export const ADD_WIDGET_SUCCESS = 'ADD_WIDGET_SUCCESS';

export const EDIT_WIDGET_ATTEMPT = 'EDIT_WIDGET_ATTEMPT';
export const EDIT_WIDGET_SUCCESS = 'EDIT_WIDGET_SUCCESS';

export const GET_WIDGET_LIST_ATTEMPT = 'GET_WIDGET_LIST_ATTEMPT';
export const GET_WIDGET_LIST_SUCCESS = 'GET_WIDGET_LIST_SUCCESS';

export const RESET_WIDGET_FORM = 'RESET_WIDGET_FORM';

export const GET_WIDGET_TO_EDIT_ATTEMPT = 'GET_WIDGET_TO_EDIT_ATTEMPT';
export const GET_WIDGET_TO_EDIT_SUCCESS = 'GET_WIDGET_TO_EDIT_SUCCESS';

export const GET_TIMEZONE_LIST_SUCCESS = 'GET_TIMEZONE_LIST_SUCCESS';
export const GET_TIMEZONE_LIST_ATTEMPT = 'GET_TIMEZONE_LIST_ATTEMPT';

export const GET_NUMBER_LIST_SUCCESS = 'GET_NUMBER_LIST_SUCCESS';
export const GET_NUMBER_LIST_ATTEMPT = 'GET_NUMBER_LIST_ATTEMPT';
export const GET_NUMBER_LIST_ERROR = 'GET_NUMBER_LIST_ERROR';

export const WIDGET_DELETE_ATTEMPT = 'WIDGET_DELETE_ATTEMPT';
export const WIDGET_DELETE_SUCCESS = 'WIDGET_DELETE_SUCCESS';

export class GetWidgetAttempt implements Action {
  readonly type = GET_WIDGET_ATTEMPT;
}

export class GetWidgetSuccess implements Action {
  readonly type = GET_WIDGET_SUCCESS;
  constructor (public payload: any) { }
}

export class AddWidgetAttempt implements Action {
  readonly type = ADD_WIDGET_ATTEMPT;
  constructor (public payload: any) { }
}

export class AddWidgetSuccess implements Action {
  readonly type = ADD_WIDGET_SUCCESS;
  constructor (public payload: any) { }
}

export class EditWidgetAttempt implements Action {
  readonly type = EDIT_WIDGET_ATTEMPT;
  constructor (public payload: any) { }
}

export class EditWidgetSuccess implements Action {
  readonly type = EDIT_WIDGET_SUCCESS;
  constructor (public payload: any) { }
}

export class GetWidgetListAttempt implements Action {
  readonly type = GET_WIDGET_LIST_ATTEMPT;
  constructor (public payload: any) { }
}

export class GetWidgetListSuccess implements Action {
  readonly type = GET_WIDGET_LIST_SUCCESS;
  constructor (public payload: any) { }
}

export class ResetWidgetForm implements Action {
  readonly type = RESET_WIDGET_FORM;
}

export class GetTimeZoneListAttempt implements Action {
  readonly type = GET_TIMEZONE_LIST_ATTEMPT;
}

export class GetTimeZoneListSuccess implements Action {
  readonly type = GET_TIMEZONE_LIST_SUCCESS;
  constructor (public payload: any) { }
}

export class GetWidgetToEditAttempt implements Action {
  readonly type = GET_WIDGET_TO_EDIT_ATTEMPT;
  constructor (public payload: any) { }
}

export class GetWidgetToEditSuccess implements Action {
  readonly type = GET_WIDGET_TO_EDIT_SUCCESS;
  constructor (public payload: any) { }
}

export class GetNumberListAttempt implements Action {
  readonly type = GET_NUMBER_LIST_ATTEMPT;
  constructor (public payload: any) { }
}

export class GetNumberListSuccess implements Action {
  readonly type = GET_NUMBER_LIST_SUCCESS;
  constructor (public payload: any) { }
}
export class GetNumberListError implements Action {
  readonly type = GET_NUMBER_LIST_ERROR;
  constructor (public payload: any) { }
}
export class DeleteWidgetAttempt implements Action {
  readonly type = WIDGET_DELETE_ATTEMPT;
  constructor(public payload: any) { }
}

export class DeleteWidgetSuccess implements Action {
  readonly type = WIDGET_DELETE_SUCCESS;
  constructor(public payload: any) { }
}
export type WidgetActions = ResetWidgetForm |
  GetWidgetAttempt | GetWidgetSuccess |
  AddWidgetAttempt | AddWidgetSuccess |
  EditWidgetAttempt | EditWidgetSuccess |
  GetWidgetListAttempt | GetWidgetListSuccess |
  GetTimeZoneListAttempt | GetTimeZoneListSuccess |
  GetWidgetToEditAttempt | GetWidgetToEditSuccess |
  GetNumberListAttempt | GetNumberListSuccess |
  GetNumberListError | DeleteWidgetAttempt | DeleteWidgetSuccess ;
