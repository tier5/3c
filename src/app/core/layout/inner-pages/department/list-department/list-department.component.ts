import { Component, OnDestroy, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import * as fromAfterLogin from '../../../store/after-login.reducers'
import { Observable } from 'rxjs/Observable'
import * as DepartmentActions from '../../../store/department/department.actions'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-list-department',
  templateUrl: './list-department.component.html',
  styleUrls: ['./list-department.component.css']
})
export class ListDepartmentComponent implements OnInit, OnDestroy {

  /** Variable declaration */
  afterLoginState: Observable<fromAfterLogin.FeatureState>
  authSubscription: Subscription
    order: string = 'info.name';
    reverse: boolean = false;
    sortedCollection: any[];
    page: number;
    term: any;
  constructor(private store: Store<fromAfterLogin.AfterLoginFeatureState>,
              private router: Router, private orderPipe: OrderPipe) {
      this.sortedCollection = orderPipe.transform(this.afterLoginState, 'info.name');
  }

  /** Function to be executed when component initializes */
  ngOnInit() {
      this.page = 1;
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

  ngOnDestroy (): void {
    this.authSubscription.unsubscribe();
  }

    /**
     * Function for ordering the table
     * @param {string} value
     */
    setOrder(value: string) {
        if (this.order === value) {
            this.reverse = !this.reverse;
        }
        this.order = value;
    }

}