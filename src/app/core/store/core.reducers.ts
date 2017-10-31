import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from './auth/auth.reducers';
import * as fromAlert from './alert/alert.reducers';

export interface AppState {
  auth: fromAuth.State
  alert: fromAlert.AlertState,
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  alert: fromAlert.alertReducer
};
