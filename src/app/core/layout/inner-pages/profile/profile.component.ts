import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core'
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as fromAfterLogin from '../../store/after-login.reducers';
import * as ProfileActions from '../../store/profile/profile.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  /** Variable declarations */
  profileForm: FormGroup;
  passwordForm: FormGroup;
  profileSubscription1: Subscription;
  profileSubscription2: Subscription;
  mask: Array<string | RegExp> = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  selectedTab: boolean = true;

  /** Service injection */
  constructor(private formBuilder: FormBuilder,
              private store: Store<fromAfterLogin.AfterLoginFeatureState>) { }

  /** Function to be executed when component initializes */
  ngOnInit () {
    this.store.dispatch(new ProfileActions.GetProfileAttempt());
    /** Profile form initialization */
    this.profileForm = new FormGroup({
      'userId': new FormControl(null, Validators.required),
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
      'phone': new FormControl(null, [Validators.required, Validators.minLength(14)]),
      'email': new FormControl({value: null, disabled: true}, [Validators.required, Validators.email])
    });
    /** Password form initialization */
    this.passwordForm = this.formBuilder.group({
      'userId': new FormControl(null),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'confPassword': new FormControl(null)
    }, {validator: this.confirmPassword});

    this.profileSubscription1 = this.store.select('afterLogin')
      .map(data => data.profile.resetChangePasswordForm)
      .subscribe(
        (afterLogin) => {
          if(afterLogin) {
            this.passwordForm.reset();
            this.store.dispatch(new ProfileActions.EditProfileChangePasswordSuccess(false));
          }
        }
      );

    this.profileSubscription2 = this.store.select('afterLogin')
      .map(data => data.profile.data)
      .subscribe(
        (afterLogin) => {
          this.passwordForm.reset();
          if(afterLogin && afterLogin.user_info) {
            const uInfo = afterLogin.user_info;
            this.profileForm.patchValue({
              userId: uInfo.id,
              firstName: uInfo.first_name,
              lastName: uInfo.last_name,
              userName: uInfo.username,
              phone: uInfo.phone,
              email: uInfo.email
            });
            this.passwordForm.patchValue({
              userId: uInfo.id
            });
          }
        }
      );
  }

  /** Custom confirm password validator */
  confirmPassword = (control: AbstractControl): { [key: string]: boolean } => {
    const pass = control.get('password')
    const cnfPass = control.get('confPassword')
    if (!pass || !cnfPass) {
      return null
    }
    if (pass.value === cnfPass.value) {
      return null
    } else {
      control.get('confPassword').setErrors({confirmPassword: true})
      return {confirmPassword: true}
    }
  }

  /** Function call to update info */
  onUpdateInfo() {
    this.store.dispatch(new ProfileActions.EditProfileAttempt(this.profileForm.value));
  }

  /** Function call to update password */
  onUpdatePassword() {
    this.store.dispatch(new ProfileActions.EditProfileChangePasswordAttempt(this.passwordForm.value));
  }

  /** Function call to highlight the selected tab */
  toggleSelectedTab() {
    this.selectedTab = !this.selectedTab;
  }

  /** Un-subscribing from all custom made events when component is destroyed */
  ngOnDestroy() {
    this.profileSubscription1.unsubscribe();
    this.profileSubscription2.unsubscribe();
  }
}
