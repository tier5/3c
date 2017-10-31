import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as fromApp from '../../store/core.reducers';
import * as AuthActions from '../../store/auth/auth.actions';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  /** Variable declaration */
  @ViewChild('form') form: NgForm;
  forgotPasswordSubscription: Subscription;

  /** Service injection */
  constructor (private store: Store<fromApp.AppState>) { }

  /** Function to be executed when component initializes */
  ngOnInit () {
    /** SignIn subscription */
    this.forgotPasswordSubscription = this.store.select('auth')
      .subscribe(
        (state) => {
          if (state.resetForgotPasswordForm) {
            this.form.reset();
            this.store.dispatch(new AuthActions.ForgotPasswordSuccess(false));
          }
        }
      )
  }

  /** Function to be called on forgot password form submission */
  onSubmit (form: NgForm) {
    this.store.dispatch(new AuthActions.ForgotPasswordAttempt(form.value));
  }

  /** Un-subscribing from all custom made events when component is destroyed */
  ngOnDestroy() {
    this.forgotPasswordSubscription.unsubscribe();
  }

}
