import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { Store } from '@ngrx/store'

import * as fromApp from '../../store/core.reducers';
import * as AuthActions from '../../store/auth/auth.actions';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.store.dispatch(new AuthActions.SignInAttempt(form.value));
  }

}
