import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromAuth from '../../../store/auth/auth.reducers';
import * as fromAfterLogin from "../../store/after-login.reducers";
import {Subscription} from "rxjs/Subscription";
import * as DashboardActions from "../../store/dashboard/dashboard.actions"

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
    /** Variable declaration */
    afterLoginState: Observable<fromAfterLogin.FeatureState>;
    authSubscription: Subscription;
    admin: any;
    agent: any;
    depertment: any;
    widgets: any;
    authState: Observable<fromAuth.State>;

  constructor( private store: Store<fromAfterLogin.AfterLoginFeatureState> ) { }

  ngOnInit() {
      this.authState = this.store.select('auth');       // auth user info
      this.authSubscription = this.store.select('auth')
          .subscribe(
              (data) => {
                  if(data.isAuthenticated !== false && data.isAdmin) {
                      this.store.dispatch(new DashboardActions.GetDashboardItemsCountAttempt({userId: data.userId}));
                  } else if (data.isAuthenticated !== false && data.isSuperAdmin) {
                       this.store.dispatch(new DashboardActions.GetDashboardItemsCountAttempt({userId: null}));
                  }
              }
          );

      this.store.select('afterLogin','dashboard').subscribe(
          (changes) => {
              if(changes.list[0] !== undefined ){
                  this.admin = changes.list[0][0].adminCount;
                  this.agent = changes.list[0][0].agentCount;
                  this.depertment = changes.list[0][0].departmentCount;
                  this.widgets = changes.list[0][0].widgetCount;
              }
          },(error) => {
              console.log(error);
          }
      );

      this.afterLoginState = this.store.select('afterLogin');
  }

    ngOnDestroy (): void {
        this.authSubscription.unsubscribe();
    }

}
