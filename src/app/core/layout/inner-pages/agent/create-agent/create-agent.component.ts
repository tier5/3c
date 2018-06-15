import { ActivatedRoute, Data, Router } from '@angular/router';
import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/distinctUntilChanged';

import * as AdminActions from '../../../store/admin/admin.actions';
import * as AgentActions from '../../../store/agent/agent.actions';
import * as DepartmentActions from '../../../store/department/department.actions';
import * as fromAuth from '../../../../store/auth/auth.reducers';
import * as fromAfterLogin from '../../../store/after-login.reducers';

@Component({
  selector: 'app-create-agent',
  templateUrl: './create-agent.component.html',
  styleUrls: ['./create-agent.component.css']
})
export class CreateAgentComponent implements OnInit, AfterViewChecked, OnDestroy {

    /** Variable Declaration */
    @ViewChild('form') form: NgForm;
    authState: Observable<fromAuth.State>;
    afterLoginState: Observable<fromAfterLogin.FeatureState>;
    afterLoginSubscription: Subscription;
    authSubscription: Subscription;
    editMode: boolean = false;
    userId: number;
    updateAgent: any;
    selectAdmin: boolean = false;
    selectDept: boolean = false;

    mask: Array<string | RegExp> = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    loggedInAdminId: number;
    agent = {
      userId: 0,
      parentId: 0,
      departmentId: 0,
      firstName: '',
      lastName: '',
      email: '',
      userName: '',
      phone: ''
    };

    departments : any;
    loader: boolean = false;

    /** Service injection */
    constructor(private store: Store<fromAfterLogin.AfterLoginFeatureState>,
                private activatedRoute: ActivatedRoute,
                private cdr: ChangeDetectorRef, private router: Router) { }

    /** Function to be executed when component initializes */
    ngOnInit() {
      this.store.dispatch(new AdminActions.GetAdminListAttempt());
      this.authState = this.store.select('auth');
      this.afterLoginState = this.store.select('afterLogin');

      this.authSubscription = this.store.select('auth')
        .subscribe(
          (data) => {
            if(data.isAdmin) {
              this.agent.parentId = data.userId;
              this.loggedInAdminId = data.userId;
              this.store.dispatch(new DepartmentActions.GetDepartmentListAttempt({userId: data.userId}));
            }
          }
        );

        this.activatedRoute.data
          .subscribe(
            (data: Data) => {
              this.editMode = data['editMode'];
              if(this.editMode) {
                /** Perform operation is present mode is edit mode */
                this.selectDept = true;
                this.userId = this.activatedRoute.snapshot.params['id'];
                this.store.dispatch(new AgentActions.GetToEditAgentAttempt({agentId: this.userId}));
                this.updateAgent = this.store.select('afterLogin')
                  .map(data => data.agent.toEdit)
                  .distinctUntilChanged()
                  .subscribe(
                  (agent) => {
                      if (agent) {
                        this.store.dispatch(new DepartmentActions.GetDepartmentListAttempt({userId: agent.parent_id}));
                        this.agent.parentId = agent.parent_id;
                        this.agent.firstName = agent.first_name;
                        this.agent.lastName = agent.last_name;
                        this.agent.userName = agent.username;
                        this.agent.email = agent.email;
                        this.agent.phone = agent.phone;
                        this.agent.departmentId = agent.department_id;
                      }
                    }
                  );
                  this.selectAdmin = true;
              }
            }
        );
        this.afterLoginSubscription = this.store.select('afterLogin')
          .map(data => data.agent.resetAgentForm)
          .subscribe(
            (data) => {
              if(data) {
                this.loader = false;
                this.form.reset();
                this.selectDept = false;
                this.store.dispatch(new AgentActions.ResetAgentForm());
                if(!!this.loggedInAdminId) {
                  this.form.form.patchValue({ parentId: this.loggedInAdminId, departmentId: 0 });
                }
              }
            }
          );
    }

    ngAfterViewChecked() {
      this.cdr.detectChanges();
    }

    /** Function call to create or edit a admin */
    onSubmit(form: NgForm) {
        this.loader = true;
      if(this.editMode) {
        const data = { ...form.value, userId: this.userId };
        this.store.dispatch(new AgentActions.EditAgentAttempt({...data}));
          this.router.navigate(['/agent/list']);
      } else {
          /** Create Agent */
        this.store.dispatch(new AgentActions.AddAgentAttempt(form.value));
      }
    }

    /** Un-subscribing from all custom made events when component is destroyed */
    ngOnDestroy() {
      this.afterLoginSubscription.unsubscribe();
      this.authSubscription.unsubscribe();
    }

    /** Function to fetch department list with respect to adminId/userId */
    adminChanged(id: number) {
      if (!!id) {
        this.store.dispatch(new DepartmentActions.GetDepartmentListAttempt({userId: id}));
      }
    }

    /** Function to check if valid department is selected */
    deptChanged(id: number) {
      this.selectDept = id > 0;
    }

}
