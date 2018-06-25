import { Router, ActivatedRoute, Data } from '@angular/router';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';

import * as AdminActions from '../../../store/admin/admin.actions';
import * as fromAuth from '../../../../store/auth/auth.reducers';
import * as fromAfterLogin from '../../../store/after-login.reducers';
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css']
})
export class CreateAdminComponent implements OnInit, OnDestroy {

  /** Variable Declaration */
  @ViewChild('form') form: NgForm;
  authState: Observable<fromAuth.State>;
  afterLoginSubscription: Subscription;
  editMode: boolean = false;
  userId: number;
  updateAdmin: any;
  mask: Array<string | RegExp> = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  admin = {
    userId: 0,
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
    phone: '',
    company: '',
  };
  loader: boolean = false;
  /** Service injection */
  constructor(private store: Store<fromAfterLogin.AfterLoginFeatureState>,
    private activatedRoute: ActivatedRoute, private router: Router) { }

  /** Function to be executed when component initializes */
  ngOnInit() {
    this.authState = this.store.select('auth');
    this.activatedRoute.data.subscribe(
      (data: Data) => {
        this.editMode = data['editMode'];
        /** Perform operation is present mode is edit mode */
        if(this.editMode) {
          /** Checking route params to get id of department to edit */
          this.userId = this.activatedRoute.snapshot.params['id'];
          this.store.dispatch(new AdminActions.GetToEditAdminAttempt({adminId: this.userId}));
          this.updateAdmin = this.store.select('afterLogin')
            .map(data => data.admin.toEdit)
            .distinctUntilChanged()
            .subscribe(
              (admin) => {
                  if (admin) {
                    this.admin.userId = admin.id;
                    this.admin.firstName = admin.first_name;
                    this.admin.lastName = admin.last_name;
                    this.admin.userName = admin.username;
                    this.admin.email = admin.email;
                    this.admin.phone = admin.phone;
                    this.admin.company = admin.company;
                  }
              }
            );
        }
      }
    );
    this.afterLoginSubscription = this.store.select('afterLogin')
      .map(data => data.admin.resetAdminForm)
      .subscribe(
        (data) => {
          if(data) {
            this.loader = false;
            this.form.reset();
            this.store.dispatch(new AdminActions.ResetAdminForm());
          }
        }
      );
  }

  /** Function call to create or edit a admin */
  onSubmit(form: NgForm) {
     this.loader = true;
    if (this.editMode) {
        /** Edit admin */
      const data = { ...form.value, userId: this.userId };
      this.store.dispatch(new AdminActions.EditAdminAttempt({...data}));
        /** Loader Show/Hide */
        this.store.select('alert')
            .map(data => data)
            .subscribe(
                (data) => {
                    if(data.show && data.type === 'danger') {
                        this.loader = false;
                    } else if(data.show && data.type === 'success') {
                                this.router.navigate(['/admin/list']);
                    }
                }, (error) => { console.error(error); this.loader = false; } , () => {this.loader = false; });
    } else {
      /** Create admin */
      this.store.dispatch(new AdminActions.AddAdminAttempt(form.value));
      /** Loader Show/Hide */
            this.store.select('alert')
                .map(data => data)
                .subscribe(
                    (data) => {
                        if(data.show && data.type === 'danger') {
                            this.loader = false;
                        } else if(data.show && data.type === 'success') {
                                    this.router.navigate(['/admin/list']);
                        }
                    }, (error) => { console.error(error); this.loader = false; } , () => {this.loader = false; });
     }
  }

  /** Un-subscribing from all custom made events when component is destroyed */
  ngOnDestroy() {
    this.afterLoginSubscription.unsubscribe();
  }

}
