import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromAfterLogin from '../../../store/after-login.reducers';
import * as AgentActions from '../../../store/agent/agent.actions';
import {OrderPipe} from 'ngx-order-pipe';
import {Subscription} from 'rxjs/Subscription';
import * as fromAuth from '../../../../store/auth/auth.reducers';
import * as DashboardActions from '../../../store/dashboard/dashboard.actions';
import {SweetAlertService} from 'ngx-sweetalert2/src/index';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-list-agent',
  templateUrl: './list-agent.component.html',
  styleUrls: ['./list-agent.component.css']
})
export class ListAgentComponent implements OnInit, OnDestroy {

  /** Variable declaration */
  afterLoginState: Observable<fromAfterLogin.FeatureState>;
  authState: Observable<fromAuth.State>;
  order: string = 'info.name';
  reverse: boolean = false;
  sortedCollection: any[];
  page: number;
  term: any;
  companySearch: any;
  companyList: any[];
  companySubscription: Subscription;
  agentListSubscription: Subscription;
  authSubscription: Subscription;
  agentList = [];
  /** Service injection */
  constructor(private store: Store<fromAfterLogin.AfterLoginFeatureState>,
              private router: Router, private orderPipe: OrderPipe,
              private _swal2: SweetAlertService) {
    this.sortedCollection = orderPipe.transform(this.afterLoginState, 'info.name');
  }

  /** Function to be executed when component initializes */
  ngOnInit() {
    this.store.dispatch(new AgentActions.GetAgentListAttempt());
    this.authState = this.store.select('auth');
    this.page = 1;
    this.companySearch = '';

    this.authSubscription = this.store.select('auth')
      .subscribe(
        (data) => {
          if (data.isSuperAdmin) {
            this.store.dispatch(new AgentActions.GetCompanyListAttempt({userId: data.token}));
          }
        }
      );

    /* Company List droupdown */
    this.agentListSubscription = this.store.select('afterLogin', 'agent', 'list')
      .filter((response) => response !== undefined && response.length > 0)
      .subscribe(
      (data) => {
            console.log(data);
            this.agentList = data;
      }
    );
    this.companySubscription = this.store.select('afterLogin', 'agent', 'comapnyList')
      .subscribe(
      (data) => {
        if (data) {
          if (data) {
            this.companyList = data;
          }
        }
      }
    );

  }

  /** Function to Edit Agent */
  onEditAgent(id: number) {
    this.router.navigate(['agent/edit/', id]);
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

  /**
   * Block a agent
   * @param user_id
   */
  blockUser(user_id) {
    this.store.dispatch(new AgentActions.BlockAgentAttempt({userId: user_id}));
  }

  /**
   * Unblock agent
   * @param user_id
   * @constructor
   */
  UnblockUser(user_id) {
    this.store.dispatch(new AgentActions.UnblockAgentAttempt({userId: user_id}));
  }

  /**
   * Delete a agent
   * @param user_id
   * @constructor
   */
  DeleteAgent(user_id) {
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
        that.store.dispatch(new AgentActions.DeleteAgentAttempt({userId: user_id}));
      }
    }, (dismiss) => {
      // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
      if (dismiss === 'cancel') {
        console.log('cancel');
      }
    });
  }

  /**
   * Show Chat List
   * @param id
   */
  chatList(id) {
    this.router.navigate(['chats/list-chat/', id]);
  }
  /** Un-subscribe from all subscription when component destroys */
  ngOnDestroy() {
     this.companySubscription.unsubscribe();
     this.authSubscription.unsubscribe();
     this.agentListSubscription.unsubscribe();
  }

}
