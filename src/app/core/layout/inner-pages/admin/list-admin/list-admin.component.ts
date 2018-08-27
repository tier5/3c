import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromAfterLogin from '../../../store/after-login.reducers';
import * as AdminActions from '../../../store/admin/admin.actions';

@Component({
  selector: 'app-list-admin',
  templateUrl: './list-admin.component.html',
  styleUrls: ['./list-admin.component.css']
})
export class ListAdminComponent implements OnInit {

  /** Variable declaration */
  afterLoginState: Observable<fromAfterLogin.FeatureState>;
  reverse: boolean = false;
  page: number;
  term:any;
    /** Service injection */
  constructor(private store: Store<fromAfterLogin.AfterLoginFeatureState>,
              private router: Router ) {
  }

  /** Function to be executed when component initializes */
  ngOnInit() {
    this.store.dispatch(new AdminActions.GetAdminListAttempt());
    this.page = 1;
    this.afterLoginState = this.store.select('afterLogin');
  }
    
  /** Function call to start editing an admin*/
  onEdit(adminId: number) {
    this.router.navigate([ 'admin/edit/', adminId ]);
  }
  /** Function for create the twilio subaccount for admin*/
  createTwilioSid(userId: number){
    this.store.dispatch(new AdminActions.CreateTwilioSidAttempt({userId}));
  }
  /** Function for block a admin user account*/
  blockUser(userId: number){
    this.store.dispatch(new AdminActions.BlockAdminUserAttempt({userId}));
  }
  /** Function for block a admin user account*/
  UnblockUser(userId: number){
    this.store.dispatch(new AdminActions.UnblockAdminUserAttempt({userId}));
  }

}
