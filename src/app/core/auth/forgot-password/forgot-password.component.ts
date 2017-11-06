import { Component, OnInit, ViewChild } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs/Subscription'

import * as fromApp from '../../store/core.reducers'
import * as AuthActions from '../../store/auth/auth.actions'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  @ViewChild('form') form: NgForm
  signUpSubscription: Subscription

  constructor (private store: Store<fromApp.AppState>) { }

  ngOnInit () {
    this.signUpSubscription = this.store.select('auth')
      .subscribe(
        (state) => {
          if (state.resetForgotPasswordForm) {
            this.form.reset();
            this.store.dispatch(new AuthActions.ForgotPasswordSuccess(false));
          }
        }
      )
  }

  onSubmit (form: NgForm) {
    this.store.dispatch(new AuthActions.ForgotPasswordAttempt(form.value));
  }

}
