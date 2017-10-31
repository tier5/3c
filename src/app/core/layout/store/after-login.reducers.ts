import { ActionReducerMap } from '@ngrx/store';

import * as fromApp from '../../store/core.reducers';
import * as fromProfile from './profile/profile.reducers';
import * as fromTwilio from './twilio/twilio.reducers';
import * as fromDepartment from './department/department.reducers';
import * as fromAdmin from './admin/admin.reducers';
import * as fromAgent from './agent/agent.reducers';
import * as fromwidget from './widget/widget.reducers';

export interface AfterLoginFeatureState extends fromApp.AppState {
  afterLogin: FeatureState
}

export interface FeatureState {
  profile: fromProfile.ProfileState,
  twilio: fromTwilio.TwilioState,
  department: fromDepartment.DepartmentState,
  admin: fromAdmin.AdminState,
  agent: fromAgent.AgentState,
  widget: fromwidget.WidgetState,
};

export const reducers: ActionReducerMap<FeatureState>  = {
  profile: fromProfile.profileReducer,
  twilio: fromTwilio.twilioReducer,
  department: fromDepartment.departmentReducer,
  admin: fromAdmin.adminReducer,
  agent: fromAgent.agentReducer,
  widget: fromwidget.widgetReducer
};
