import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const coreRoutes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'sign-in', loadChildren: './auth/sign-in/sign-in.module#SignInModule' },
  { path: 'sign-up', loadChildren: './auth/sign-up/sign-up.module#SignUpModule' },
  { path: '**', redirectTo: 'sign-in' }
];

@NgModule({
  imports: [RouterModule.forRoot(coreRoutes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
