import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router'

import { LayoutComponent } from './layout/layout.component';
import { NotAuthGuard } from './auth/not-auth.guard';
import { AuthGuard } from './auth/auth.guard';

const coreRoutes: Routes = [
  { path: '',  pathMatch: 'full', redirectTo: 'sign-in' },
  { path: 'sign-in', canActivate: [ NotAuthGuard ], loadChildren: './auth/sign-in/sign-in.module#SignInModule' },
  { path: 'sign-up', canActivate: [ NotAuthGuard ], loadChildren: './auth/sign-up/sign-up.module#SignUpModule' },
  { path: '', canActivate: [ AuthGuard ], component: LayoutComponent, children: [
    { path: 'dashboard', loadChildren: './inner-pages/dashboard/dashboard.module#DashboardModule'}
  ] },
  { path: '**', redirectTo: 'sign-in' }
];

@NgModule({
  imports: [RouterModule.forRoot(coreRoutes, { preloadingStrategy: PreloadAllModules, enableTracing: false }) ],
  exports: [RouterModule]
})
export class CoreRoutingModule { }

