import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromAfterLogin from '../../../store/after-login.reducers';
import * as WidgetActions from '../../../store/widget/widget.actions';
import { Subscription } from 'rxjs/Subscription';
import * as fromAuth from '../../../../store/auth/auth.reducers';
import * as AgentActions from '../../../store/agent/agent.actions';
import {SweetAlertService} from 'ngx-sweetalert2/src/index';

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
              private router: Router, private _swal2: SweetAlertService) { }
  /** Function to be executed when component initializes */
  ngOnInit() {
    this.companySearch = '';
    this.authState = this.store.select('auth');
    // this.authSubscription = this.store.select('auth')
    //   .subscribe(
    //     (data) => {
    //         console.log('WidgetData-->',data);
    //       if (data.isAdmin) {
    //         console.log('Calling This ');
    //         this.store.dispatch(new WidgetActions.GetWidgetListAttempt({ userId: data.userId }));
    //       } else {
    //           console.log('Calling This ELSE');
    //           this.store.dispatch(new WidgetActions.GetWidgetListAttempt({}));
    //       }
    //     }
    //   );

    this.store.dispatch(new WidgetActions.GetWidgetListAttempt());

    this.afterLoginState = this.store.select('afterLogin');

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
    const that = this;
    this._swal2.warning({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result) {
        this.store.dispatch(new WidgetActions.DeleteWidgetAttempt({widget_id: id}));
      }
    }, (dismiss) => {
      // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
      if (dismiss === 'cancel') {
        console.log('cancel');
      }
    });
  }

  ngOnDestroy () {
    this.companyList = null;
    this.authSubscription.unsubscribe();
    this.companySubscription.unsubscribe();
  }

}
