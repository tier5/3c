/**
 * Guard to prevent non super admin users to visit routes that are only allowed for super admins
 */
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/map';

import * as fromApp from '../store/core.reducers';
import * as fromAuth from '../store/auth/auth.reducers';

@Injectable()
export class IsSuperAdminGuard implements CanActivate, CanActivateChild {

  /** Service injection */
  constructor(private store: Store<fromApp.AppState>,
              private router: Router ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.store.select('auth')
      .map((authState: fromAuth.State) => {
        if(authState.isSuperAdmin) {
          return true;
        } else {
          this.router.navigate(['/dashboard']);
          return false;
        }
      });
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.canActivate(next, state);
  }
}