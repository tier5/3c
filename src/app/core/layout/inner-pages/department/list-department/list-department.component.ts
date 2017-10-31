import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'

import * as fromAfterLogin from '../../../store/after-login.reducers';
import { Observable } from 'rxjs/Observable'
import * as DepartmentActions from '../../../store/department/department.actions'
import { Router } from '@angular/router'

@Component({
  selector: 'app-list-department',
  templateUrl: './list-department.component.html',
  styleUrls: ['./list-department.component.css']
})
export class ListDepartmentComponent implements OnInit {

  /** Variable declaration */
  afterLoginState: Observable<fromAfterLogin.FeatureState>;
  constructor(private store: Store<fromAfterLogin.AfterLoginFeatureState>,
              private router: Router) { }

  /** Function to be executed when component initializes */
  ngOnInit() {
    this.store.dispatch(new DepartmentActions.GetDepartmentListAttempt({}));
    this.afterLoginState = this.store.select('afterLogin');
  }

  /** Function call to start editing a department */
  onEdit(depId: number) {
    this.router.navigate([ 'department/edit/', depId ]);
  }
}
