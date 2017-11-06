import { Component, OnDestroy, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs/Subscription'

import * as fromApp from '../../store/core.reducers'
import * as AuthActions from '../../store/auth/auth.actions'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {

  /** Variable declarations */
  form: FormGroup
  signUpSubscription: Subscription
  mask: Array<string | RegExp> = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  /** Custom confirm password validator */
  confirmPassword = (control: AbstractControl): { [key: string]: boolean } => {

    const pass = control.get('password')
    const cnfPass = control.get('conf_pass')

    if (!pass || !cnfPass) {
      return null
    }

    if (pass.value === cnfPass.value) {
      return null
    } else {
      control.get('conf_pass').setErrors({confirmPassword: true})
      return {confirmPassword: true}
    }
  }

  /** Service injection */
  constructor (private formBuilder: FormBuilder,
               private store: Store<fromApp.AppState>) { }

  /** Function to be executed when component initializes */
  ngOnInit () {
    this.signUpSubscription = this.store.select('auth')
      .subscribe(
        (state) => {
          if (state.registered) {
            this.form.reset()
            this.store.dispatch(new AuthActions.SignUpSuccess(false))
          }
        }
      )

    this.form = this.formBuilder.group({
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
      'userName': new FormControl(null, Validators.required),
      'phone': new FormControl(null, [Validators.required, Validators.minLength(14)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'conf_pass': new FormControl(null, Validators.required)
    }, {validator: this.confirmPassword})
  }

  /** Function call on submit */
  onSignUp () {
    this.store.dispatch(new AuthActions.SignUpAttempt(this.form.value))
  }

  ngOnDestroy () {
    this.signUpSubscription.unsubscribe()
  }

}
