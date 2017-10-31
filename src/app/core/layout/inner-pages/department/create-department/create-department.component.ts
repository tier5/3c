import { ActivatedRoute, Data } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core'
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/distinctUntilChanged';

import * as AdminActions from '../../../store/admin/admin.actions';
import * as fromAuth from '../../../../store/auth/auth.reducers';
import * as fromAfterLogin from '../../../store/after-login.reducers';
import * as DepartmentActions from '../../../store/department/department.actions';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.css']
})
export class CreateDepartmentComponent implements OnInit {

  /** Variable declaration */
  @ViewChild('form') form:NgForm;
  authState: Observable<fromAuth.State>;
  afterLoginState: Observable<fromAfterLogin.FeatureState>;
  editMode: boolean = false;
  depId: number;
  updateDep: any;
  dep = {
    userId: 0,
    departmentName: '',
    departmentDetails: ''
  };

  /** Service injetion */
  constructor(private store: Store<fromAfterLogin.AfterLoginFeatureState>,
              private activatedRoute: ActivatedRoute,
              private cdr: ChangeDetectorRef) { }

  /** Function to be executed when component initializes */
  ngOnInit() {
    this.store.dispatch(new AdminActions.GetAdminListAttempt());
    this.authState = this.store.select('auth');
    this.afterLoginState = this.store.select('afterLogin');

    this.store.select('afterLogin')
      .map(data => data.department.resetDepartmentForm)
      .subscribe(
        (data) => {
          if(data) {
            this.form.reset();
            this.store.dispatch(new DepartmentActions.ResetDepartmentForm());
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
                  setTimeout(() => {
                    this.dep.userId = dep.user_id;
                    //  this.cdr.detectChanges();
                    this.dep.departmentName = dep.department_name;
                    this.dep.departmentDetails = dep.department_details;
                  }, 0)
                }
              }
            );
        }
      }
    );

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
