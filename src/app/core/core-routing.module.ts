import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router'

import { LayoutComponent } from './layout/layout.component';
import { NotAuthGuard } from './auth/not-auth.guard';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '',  pathMatch: 'full', redirectTo: 'sign-in' },
  { path: 'sign-in', canActivate: [ NotAuthGuard ], loadChildren: './auth/sign-in/sign-in.module#SignInModule' },
  { path: 'sign-up', canActivate: [ NotAuthGuard ], loadChildren: './auth/sign-up/sign-up.module#SignUpModule' },
  { path: 'forgot-password', canActivate: [ NotAuthGuard ], loadChildren: './auth/forgot-password/forgot-password.module#ForgotPasswordModule' },
  { path: 'reset-password/:id', canActivate: [ NotAuthGuard ], loadChildren: './auth/reset-password/reset-password.module#ResetPasswordModule' },
  { path: '', canActivate: [ AuthGuard ], canActivateChild: [ AuthGuard ], component: LayoutComponent, loadChildren: './layout/layout.module#LayoutModule' },
  { path: '**', redirectTo: 'sign-in' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
