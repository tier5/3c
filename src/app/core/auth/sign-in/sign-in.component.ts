import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as AuthActions from '../../store/auth/auth.actions';
import * as fromApp from '../../store/core.reducers';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  /** Service injection */
  constructor(private store: Store<fromApp.AppState>) { }

  /** Function to submit the sign in form */
  onSignIn(form: NgForm) {
    this.store.dispatch(new AuthActions.SignInAttempt(form.value));
  }

}
