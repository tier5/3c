import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import * as fromAuth from '../../../../store/auth/auth.reducers';
import * as fromAfterLogin from '../../../store/after-login.reducers';
import * as TwilioActions from '../../../store/twilio/twilio.actions';

@Component({
  selector: 'app-create-twilio',
  templateUrl: './create-twilio.component.html',
  styleUrls: ['./create-twilio.component.css']
})
export class CreateTwilioComponent implements OnInit {

  /** Variable declaration */
  authState: Observable<fromAuth.State>;
  twilio = {
    twilio_sid: '',
    twilio_token: '',
  };

  /** Service injection */
  constructor(private store: Store<fromAfterLogin.AfterLoginFeatureState>) { }

  /** Function to be executed when component initializes */
  ngOnInit() {
    this.store.dispatch(new TwilioActions.GetTwilioAttempt());
    this.authState = this.store.select('auth');
    this.store.select('afterLogin')
      .map(data => data.twilio.info)
      .subscribe(
        (afterLogin) => {
          if (afterLogin !== null) {
            this.twilio.twilio_sid = afterLogin.twilio_sid;
            this.twilio.twilio_token = afterLogin.twilio_token;
          }
        }
      );
  }

  /** Function call to submit the form */
  onSubmit(form: NgForm) {
    this.store.dispatch(new TwilioActions.AddTwilioAttempt(form.value));
  }

}
