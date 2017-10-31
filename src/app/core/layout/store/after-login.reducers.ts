import { ActionReducerMap } from '@ngrx/store';
import * as fromApp from '../../store/core.reducers';
import * as fromProfile from './profile/profile.reducers';
import * as fromTwilio from './twilio/twilio.reducers';
import * as fromDepartment from './department/department.reducers';
import * as fromAdmin from './admin/admin.reducers';
import * as fromAgent from './agent/agent.reducers';
import * as fromWidget from './widget/widget.reducers';
import * as fromChat from './chat/chat.reducers';
import * as fromDashboard from './dashboard/dashboard.reducers';
import * as fromAgentChat from './agent-chat/agent-chat.reducers';

export interface AfterLoginFeatureState extends fromApp.AppState {
  afterLogin: FeatureState;
}

export interface FeatureState {
  profile: fromProfile.ProfileState;
  twilio: fromTwilio.TwilioState;
  department: fromDepartment.DepartmentState;
  admin: fromAdmin.AdminState;
  agent: fromAgent.AgentState;
  widget: fromWidget.WidgetState;
  chat: fromChat.ChatState;
  dashboard: fromDashboard.DashboardState;
  agentChats: fromAgentChat.AgentChatState;

}

export const reducers: ActionReducerMap<FeatureState> = {
  profile: fromProfile.profileReducer,
  twilio: fromTwilio.twilioReducer,
  department: fromDepartment.departmentReducer,
  admin: fromAdmin.adminReducer,
  agent: fromAgent.agentReducer,
  widget: fromWidget.widgetReducer,
  chat: fromChat.chatReducer,
  dashboard: fromDashboard.dashboardReducer,
  agentChats: fromAgentChat.agentChatReducer,
};
