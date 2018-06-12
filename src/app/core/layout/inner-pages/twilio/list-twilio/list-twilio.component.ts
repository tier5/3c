import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'

import * as fromAfterLogin from '../../../store/after-login.reducers';
import * as TwilioActions from '../../../store/twilio/twilio.actions';
import { Observable } from 'rxjs/Observable'
declare var $;
@Component({
  selector: 'app-list-twilio',
  templateUrl: './list-twilio.component.html',
  styleUrls: ['./list-twilio.component.css']
})
export class ListTwilioComponent implements OnInit {

  /** Variable declaration */
  afterLoginState: Observable<fromAfterLogin.FeatureState>;

  /** Service injection */
  constructor(private store: Store<fromAfterLogin.AfterLoginFeatureState>) {
      $( function () {
          $('#twilioTable').DataTable();
      });
  }

  /** Function to be executed when component initializes */
  ngOnInit() {
    this.store.dispatch(new TwilioActions.GetTwilioListAttempt());
    this.afterLoginState = this.store.select('afterLogin');
  }

}
