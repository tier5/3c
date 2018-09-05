import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromAfterLogin from '../../../store/after-login.reducers';
import * as WidgetActions from '../../../store/widget/widget.actions';
import { Subscription } from 'rxjs/Subscription';
import * as fromAuth from '../../../../store/auth/auth.reducers';
import * as AgentActions from '../../../store/agent/agent.actions';

@Component({
  selector: 'app-list-widget',
  templateUrl: './list-widget.component.html',
  styleUrls: ['./list-widget.component.css']
})
export class ListWidgetComponent implements OnInit, OnDestroy {

  /** Variable declaration */
  afterLoginState: Observable<fromAfterLogin.FeatureState>;
  authState: Observable<fromAuth.State>;
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
    this.authState = this.store.select('auth');
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
    // this.companySubscription = this.store.select('afterLogin')
    //   .subscribe(
    //     (data) => {
    //       this.companyList = data.widget.list.map(item => item.company)
    //         .filter((value, index, self) => self.indexOf(value) === index && value !== null && value !== '');
    //     }
    //   );

      this.authSubscription = this.store.select('auth')
          .subscribe(
              (data) => {
                  if (data.isSuperAdmin) {
                      this.store.dispatch(new AgentActions.GetCompanyListAttempt({userId: data.token}));
                  }
              }
          );

      /* Company List droupdown */
      this.companySubscription = this.store.select('afterLogin', 'agent').subscribe(
          (data) => {
              this.companyList = data.comapnyList;
          }
      );


  }

  /** Function to Edit Widget */
  onEditWidget(id: number) {
    this.router.navigate([ 'widget/edit/', id ]);
  }

  /**
   * Delete Widget
   * @param id
   * @constructor
   */
  DeleteWidget(id) {
    this.store.dispatch(new WidgetActions.DeleteWidgetAttempt({widget_id: id}));
  }

  ngOnDestroy () {
    this.authSubscription.unsubscribe();
  }

}
