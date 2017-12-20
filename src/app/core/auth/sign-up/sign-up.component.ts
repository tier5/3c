import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as AuthActions from '../../store/auth/auth.actions';
import * as fromApp from '../../store/core.reducers';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {

  /** Variable declarations */
  form: FormGroup;
  signUpSubscription: Subscription;
  mask: Array<string | RegExp> = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  /** Service injection */
  constructor (private formBuilder: FormBuilder,
               private store: Store<fromApp.AppState>) { }

  /** Function to be executed when component initializes */
  ngOnInit () {
    /** SignUp subscription */
    this.signUpSubscription = this.store.select('auth')
      .subscribe(
        (state) => {
          if (state.registered) {
            this.form.reset();
            this.store.dispatch(new AuthActions.SignUpSuccess(false));
          }
        }
      )
    /** SignUp form initialization */
    this.form = this.formBuilder.group({
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
      'phone': new FormControl(null, [Validators.required, Validators.minLength(14)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'conf_pass': new FormControl(null, Validators.required)
    }, {validator: this.confirmPassword})
  }

  /** Custom confirm password validator */
  confirmPassword = (control: AbstractControl): { [key: string]: boolean } => {
    const pass = control.get('password');
    const cnfPass = control.get('conf_pass');
    if (!pass || !cnfPass) {
      return null
    }
    if (pass.value === cnfPass.value) {
      return null
    } else {
      control.get('conf_pass').setErrors({confirmPassword: true});
      return {confirmPassword: true}
    }
  }

  /** Function to submit the sign up form */
  onSignUp () {
    this.store.dispatch(new AuthActions.SignUpAttempt(this.form.value))
  }

  /** Un-subscribing from all custom made events when component is destroyed */
  ngOnDestroy () {
    this.signUpSubscription.unsubscribe();
  }

}
