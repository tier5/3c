import { ActivatedRoute, Data } from '@angular/router';
import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/distinctUntilChanged';

import * as AdminActions from '../../../store/admin/admin.actions';
import * as fromAuth from '../../../../store/auth/auth.reducers';
import * as fromAfterLogin from '../../../store/after-login.reducers';
import * as DepartmentActions from '../../../store/department/department.actions';
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.css']
})
export class CreateDepartmentComponent implements OnInit, AfterViewChecked, OnDestroy {

  /** Variable declaration */
  @ViewChild('form') form:NgForm;
  authState: Observable<fromAuth.State>;
  afterLoginState: Observable<fromAfterLogin.FeatureState>;
  authSubscription: Subscription;
  afterLoginSubscription: Subscription;
  editMode: boolean = false;
  depId: number;
  updateDep: any;
  loggedInAdminId: number;
  dep = {
    userId: 0,
    departmentName: '',
    departmentDetails: ''
  };

  /** Service injection */
  constructor(private store: Store<fromAfterLogin.AfterLoginFeatureState>,
              private activatedRoute: ActivatedRoute,
              private cdr: ChangeDetectorRef) { }

  /** Function to be executed when component initializes */
  ngOnInit() {
    this.store.dispatch(new AdminActions.GetAdminListAttempt());
    this.authState = this.store.select('auth');
    this.afterLoginState = this.store.select('afterLogin');

    this.authSubscription = this.store.select('auth')
      .subscribe(
        (data) => {
          if(data.isAdmin) {
            this.dep.userId = data.userId;
            this.loggedInAdminId = data.userId;
          }
        }
      );

    this.afterLoginSubscription = this.store.select('afterLogin')
      .map(data => data.department.resetDepartmentForm)
      .subscribe(
        (data) => {
          if(data) {
            this.form.reset();
            this.store.dispatch(new DepartmentActions.ResetDepartmentForm());
            if(!!this.loggedInAdminId) {
              this.form.form.patchValue({ userId: this.loggedInAdminId });
            }
          }
        }
      );

    this.activatedRoute.data
      .subscribe(
      (data: Data) => {
        this.editMode = data['editMode'];

        /** Perform operation is present mode is edit mode */
        if(this.editMode) {
          /** Checking route params to get id of department to edit */
          this.depId = this.activatedRoute.snapshot.params['id'];
          this.store.dispatch(new DepartmentActions.GetToEditDepartmentAttempt({departmentId: this.depId}));
          this.updateDep = this.store.select('afterLogin')
            .map(data => data.department.toEdit)
            .distinctUntilChanged()
            .subscribe(
              (dep) => {
                if(dep) {
                  //setTimeout(() => {
                    this.dep.userId = dep.user_id;
                    this.dep.departmentName = dep.department_name;
                    this.dep.departmentDetails = dep.department_details;
                  //}, 0)
                }
              }
            );
        }
      }
    );

  }

  /** Your code to update the model */
  ngAfterViewChecked(){
    this.cdr.detectChanges();
  }

  /** Un-subscribe from all subscription when component destroys */
  ngOnDestroy(){
    this.authSubscription.unsubscribe();
    this.afterLoginSubscription.unsubscribe();
  }

  /** Function call to create a new department */
  onCreateDep(form: NgForm) {
    if(this.editMode) {
      const data = { ...form.value, departmentId: this.depId };
      this.store.dispatch(new DepartmentActions.EditDepartmentAttempt({...data}));
    } else {
      this.store.dispatch(new DepartmentActions.AddDepartmentAttempt(form.value));
    }
  }

}
