import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'

import { IsSuperAdminGuard } from '../auth/is-super-admin.guard'
import { IsAdminOrSuperAdminGuard } from '../auth/is-admin-or-super-admin.guard'
import { IsAgentGuard } from '../auth/is-agent.guard'

const routes: Routes = [
  { path: '', children: [
    { path: 'dashboard', loadChildren: './inner-pages/dashboard/dashboard.module#DashboardModule' },
    { path: 'profile', loadChildren: './inner-pages/profile/profile.module#ProfileModule' },
    { path: 'twilio', canActivate: [ IsSuperAdminGuard ], canActivateChild: [ IsSuperAdminGuard ], loadChildren: './inner-pages/twilio/twilio.module#TwilioModule' },
    { path: 'admin', canActivate: [ IsSuperAdminGuard ], canActivateChild: [ IsSuperAdminGuard ], loadChildren: './inner-pages/admin/admin.module#AdminModule' },
    { path: 'agent', canActivate: [ IsAdminOrSuperAdminGuard ], canActivateChild: [ IsAdminOrSuperAdminGuard ], loadChildren: './inner-pages/agent/agent.module#AgentModule' },
    { path: 'widget', canActivate: [ IsAdminOrSuperAdminGuard ], canActivateChild: [ IsAdminOrSuperAdminGuard ], loadChildren: './inner-pages/widget/widget.module#WidgetModule' },
    { path: 'department', canActivate: [ IsAdminOrSuperAdminGuard ], canActivateChild: [ IsAdminOrSuperAdminGuard ], loadChildren: './inner-pages/department/department.module#DepartmentModule' },
    { path: 'chat', canActivate: [ IsAgentGuard ], canActivateChild: [ IsAgentGuard ], loadChildren: './inner-pages/chat/chat.module#ChatModule' },
    { path: 'chats', canActivate: [ IsAdminOrSuperAdminGuard ], canActivateChild: [ IsAdminOrSuperAdminGuard ], loadChildren: './inner-pages/chats/chats.module#ChatsModule' },
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
