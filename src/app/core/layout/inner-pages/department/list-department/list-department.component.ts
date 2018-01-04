import { Component, OnDestroy, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { NgForm } from '@angular/forms';

import * as fromAfterLogin from '../../../store/after-login.reducers'
import { Observable } from 'rxjs/Observable'
import * as DepartmentActions from '../../../store/department/department.actions'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'app-list-department',
  templateUrl: './list-department.component.html',
  styleUrls: ['./list-department.component.css']
})
export class ListDepartmentComponent implements OnInit, OnDestroy {

  /** Variable declaration */
  afterLoginState: Observable<fromAfterLogin.FeatureState>;
  authSubscription: Subscription;
  p: number = 1;

  constructor(private store: Store<fromAfterLogin.AfterLoginFeatureState>,
              private router: Router) { }

  /** Function to be executed when component initializes */
  ngOnInit() {
    this.authSubscription = this.store.select('auth')
      .subscribe(
        (data) => {
          if(data.isAdmin) {
            this.store.dispatch(new DepartmentActions.GetDepartmentListAttempt({userId: data.userId}));
          } else {
            this.store.dispatch(new DepartmentActions.GetDepartmentListAttempt({}));
          }
        }
      );

    this.afterLoginState = this.store.select('afterLogin');
  }

  /** Function call to start editing a department */
  onEdit(depId: number) {
    this.router.navigate([ 'department/edit/', depId ])
  }

  onSubmit(form: NgForm) {
    this.store.dispatch(new DepartmentActions.GetDepartmentListAttempt(form.value));
  }

  ngOnDestroy (): void {
    this.authSubscription.unsubscribe();
  }

}
