import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from './auth/auth.reducers';
import * as fromAlert from './alert/alert.reducers';
import * as fromDepartment from './../layout/store/department/department.reducers'
export interface AppState {
  auth: fromAuth.State
  alert: fromAlert.AlertState,
    department: fromDepartment.DepartmentState
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  alert: fromAlert.alertReducer,
    department : fromDepartment.departmentReducer
};
