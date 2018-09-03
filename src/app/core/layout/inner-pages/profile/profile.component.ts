import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core'
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import * as fromAfterLogin from '../../store/after-login.reducers';
import * as ProfileActions from '../../store/profile/profile.actions';
import * as fromAuth from '../../../store/auth/auth.reducers';
import * as fromApp from '../../../store/core.reducers';
import * as AuthActions from '../../../store/auth/auth.actions';
import { Router, ActivatedRoute, Data } from '@angular/router';

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
  authState: Observable<fromAuth.State>;
  loader: boolean = false;
  loader1: boolean = false;
  valueChange: any;

  /** Service injection */
  constructor(private formBuilder: FormBuilder,
              private store: Store<fromAfterLogin.AfterLoginFeatureState>,
              private storeAuth: Store<fromApp.AppState>, private router: Router) { }

  /** Function to be executed when component initializes */
  ngOnInit () {
    this.authState = this.storeAuth.select('auth');
    this.store.dispatch(new ProfileActions.GetProfileAttempt());
    /** Profile form initialization */
    this.profileForm = new FormGroup({
      'userId': new FormControl(null, Validators.required),
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
       'company': new FormControl(null),
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
              company: uInfo.company,
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
      control.get('confPassword').setErrors({confirmPassword: true })
      return {confirmPassword: true }
    }
  }

  /** Function call to update info */
  onUpdateInfo() {
    this.loader1 = true;
    this.store.dispatch(new ProfileActions.EditProfileAttempt(this.profileForm.value));
    this.store.dispatch(new AuthActions.UpdateAttempt(this.profileForm.value));
      /** Loader Show/Hide */
      this.store.select('alert')
          .map(data => data)
          .subscribe(
              (data) => {
                  if(data.show && data.type === 'danger') {
                      this.loader1 = false;
                  } else if(data.show && data.type === 'success') {
                      this.loader1 = false;
                  }
              }, (error) => { console.error(error); this.loader1 = false; } , () => {this.loader1 = false; });
  }

  /** Function call to update password */
  onUpdatePassword() {
    this.loader = true;
    this.store.dispatch(new ProfileActions.EditProfileChangePasswordAttempt(this.passwordForm.value));
      /** Loader Show/Hide */
    this.store.select( 'afterLogin', 'profile', 'resetChangePasswordForm').subscribe(
      (value) => {
        if (value) {
          this.loader = false;
        }
      }, (error) => { console.error(error); this.loader = false; } , () => {this.loader = false; });
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
