import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromAfterLogin from '../../../store/after-login.reducers';
import * as WidgetActions from '../../../store/widget/widget.actions';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-list-widget',
  templateUrl: './list-widget.component.html',
  styleUrls: ['./list-widget.component.css']
})
export class ListWidgetComponent implements OnInit, OnDestroy {

  /** Variable declaration */
  afterLoginState: Observable<fromAfterLogin.FeatureState>;
  authSubscription: Subscription;
  page: number;
  term: any;
  companySearch: any;
  companyList: any[];
  companySubscription: Subscription;
  /** Service injection */
  constructor(private store: Store<fromAfterLogin.AfterLoginFeatureState>,
              private router: Router) { }
  /** Function to be executed when component initializes */
  ngOnInit() {
    this.companySearch = '';
    this.authSubscription = this.store.select('auth')
      .subscribe(
        (data) => {
          if (data.isAdmin) {
            this.store.dispatch(new WidgetActions.GetWidgetListAttempt({userId: data.userId}));
          } else {
            this.store.dispatch(new WidgetActions.GetWidgetListAttempt({}));
          }
        }
      );

    this.afterLoginState = this.store.select('afterLogin');
    this.companySubscription = this.store.select('afterLogin')
      .subscribe(
        (data) => {
          this.companyList = data.widget.list.map(item => item.company)
            .filter((value, index, self) => self.indexOf(value) === index && value !== null && value !== '');
        }
      );
  }

  /** Function to Edit Widget */
  onEditWidget(id: number) {
    this.router.navigate([ 'widget/edit/', id ]);
  }

  ngOnDestroy () {
    this.authSubscription.unsubscribe();
  }

}
