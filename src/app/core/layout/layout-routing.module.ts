import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'

const routes: Routes = [
  { path: '', children: [
    { path: 'dashboard', loadChildren: './inner-pages/dashboard/dashboard.module#DashboardModule'},
    { path: 'profile', loadChildren: './inner-pages/profile/profile.module#ProfileModule'},
    { path: 'admin', loadChildren: './inner-pages/admin/admin.module#AdminModule'},
    { path: 'agent', loadChildren: './inner-pages/agent/agent.module#AgentModule'},
    { path: 'widget', loadChildren: './inner-pages/widget/widget.module#WidgetModule'},
    { path: 'twilio', loadChildren: './inner-pages/twilio/twilio.module#TwilioModule'},
    { path: 'chat', loadChildren: './inner-pages/chat/chat.module#ChatModule'}
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
