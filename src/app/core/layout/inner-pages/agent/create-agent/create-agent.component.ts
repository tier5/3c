import { ActivatedRoute, Data } from '@angular/router';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import * as AdminActions from '../../../store/admin/admin.actions';
import * as AgentActions from '../../../store/agent/agent.actions';
import * as DepartmentActions from '../../../store/department/department.actions';
import * as fromAuth from '../../../../store/auth/auth.reducers';
import * as fromAfterLogin from '../../../store/after-login.reducers';
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'app-create-agent',
  templateUrl: './create-agent.component.html',
  styleUrls: ['./create-agent.component.css']
})
export class CreateAgentComponent implements OnInit, OnDestroy {

    /** Variable Declaration */
    @ViewChild('form') form: NgForm;    /** Variable Declaration */
    authState: Observable<fromAuth.State>;
    afterLoginState: Observable<fromAfterLogin.FeatureState>;
    afterLoginSubscription: Subscription;
    editMode: boolean = false;
    userId: number;
    parentId: number;
    updateAgent: any;
    selectAdmin: boolean = false;
    selectDept: boolean = false;

    mask: Array<string | RegExp> = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    agent = {
        userId: 0,
        parentId: 0,
        departmentId: 0,
        firstName: '',
        lastName: '',
        email: '',
        userName: '',
        phone: '',
    };

    DepartmentAfterChangeEvent : any;
    departments : any;


    /** Service injection */
    constructor(private store: Store<fromAfterLogin.AfterLoginFeatureState>,
                private activatedRoute: ActivatedRoute,
                private http: HttpClient) { }

    /** Function to be executed when component initializes */
    ngOnInit() {
        const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest')
        const config = {
          headers: headers
        }
        this.http.post(environment.API_BASE_URL + 'department-list',config).subscribe(data => {
          this.departments = data['response'];
        });
        // this.store.dispatch(new DepartmentActions.GetDepartmentListAttempt);
        this.store.dispatch(new AdminActions.GetAdminListAttempt());
        this.authState = this.store.select('auth');
        this.afterLoginState = this.store.select('afterLogin');
        this.store.select('afterLogin')

        this.activatedRoute.data.subscribe(
            (data: Data) => {
                this.editMode = data['editMode'];
                /** Perform operation is present mode is edit mode */
                    if(this.editMode) {
                      const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest')
                      const config = {
                        headers: headers
                      }
                      this.http.post(environment.API_BASE_URL + 'department-list',config).subscribe(data => {
                          this.DepartmentAfterChangeEvent = data['response'];
                      });
                      this.userId = this.activatedRoute.snapshot.params['id'];
                      this.updateAgent = this.store.select('afterLogin')
                        .map(data => data.agent.list)
                        .subscribe(
                            (list) => {
                                list.filter(agent => {
                                    if (agent.id == this.userId) {
                                        this.agent.parentId = agent.parent_id;
                                        this.agent.firstName = agent.first_name;
                                        this.agent.lastName = agent.last_name;
                                        this.agent.userName = agent.username;
                                        this.agent.email = agent.email;
                                        this.agent.phone = agent.phone;
                                        this.agent.departmentId = agent.department_agent_mapping.department_id;
                                    }
                                });
                            }
                        );
                        this.selectAdmin = true;
                        this.selectDept = true;
                        // console.log(this.agent);
                }
            }
        );
        this.afterLoginSubscription = this.store.select('afterLogin')
            .map(data => data.agent.resetAgentForm)
            .subscribe(
                (data) => {
                    if(data) {
                        this.form.reset();
                        this.store.dispatch(new AgentActions.ResetAgentForm());
                    }
                }
            );
    }

    /** Function call to create or edit a admin */
    onSubmit(form: NgForm) {
        if(this.editMode) {
            const data = { ...form.value, userId: this.userId };
            this.store.dispatch(new AgentActions.EditAgentAttempt({...data}));
        } else {
            this.store.dispatch(new AgentActions.AddAgentAttempt(form.value));
        }
    }

    /** Un-subscribing from all custom made events when component is destroyed */
    ngOnDestroy() {
        this.afterLoginSubscription.unsubscribe();
    }

    /* Function to fetch department list with respect to adminId/userId */
    adminChanged(id:number) {
        if(id>0) {
            this.selectAdmin = true;
            this.selectDept = false;
        } else {
            this.selectAdmin = false;
            this.selectDept = false;
        }

        this.DepartmentAfterChangeEvent = this.departments.filter(dip => dip.user_id == id );
    }

    /* Function to check if valid department is selected */
    deptChanged(id:number) {
        if(id>0) {
            this.selectDept = true;
        } else {
            this.selectDept = false;
        }

    }

}
