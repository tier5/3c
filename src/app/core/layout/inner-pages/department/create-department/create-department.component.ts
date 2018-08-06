import { ActivatedRoute, Data, Router } from '@angular/router';
import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/distinctUntilChanged';

import * as AdminActions from '../../../store/admin/admin.actions';
import * as fromAuth from '../../../../store/auth/auth.reducers';
import * as fromAfterLogin from '../../../store/after-login.reducers';
import * as DepartmentActions from '../../../store/department/department.actions';
import * as DepartmentReducer from '../../../store/department/department.reducers';
import { Subscription } from 'rxjs/Subscription'
import * as AgentActions from '../../../store/agent/agent.actions';

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
    departmentDetails: '',
    agents: []
  };
  loader: boolean = false;
  adminUserId:number;                 /** admin user id from admin selection droupdown */
  adminId:number;
  changedDepFlag: boolean = false;
    adminList: Subscription;
    listOfAdmins = [];
    updatedlistOfAdmins = [];
    adminName:any;
    showThis: boolean = false;
  /** Service injection */
  constructor(private store: Store<fromAfterLogin.AfterLoginFeatureState>,
              private activatedRoute: ActivatedRoute,
              private cdr: ChangeDetectorRef, private router: Router,
            private deptStore : Store<DepartmentReducer.DepartmentState>) { }

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
    if(this.dep.userId !== 0 ){
        this.store.dispatch(new AgentActions.GetAdminAgentListAttempt( { userId: this.dep.userId}));
    }

    this.afterLoginSubscription = this.store.select('afterLogin')
      .map(data => data.department.resetDepartmentForm)
      .subscribe(
        (data) => {
          if(data) {
            this.loader = false;
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
             // console.log(this.deptStore.select('toEdit'))
             this.updateDep = this.store.select('department')
                 .distinctUntilChanged()
                .subscribe(
                  (dep) => {
                    if(dep) {
                        // console.log('dipertment Info',dep);
                        // console.log('DEP --- > ',dep.toEdit.department);
                        if (dep.toEdit.department !== undefined) {
                                this.changedDepFlag = true;
                                this.dep.userId = dep.toEdit.department.user_id;
                                this.dep.departmentName = dep.toEdit.department.department_name;
                                this.dep.departmentDetails = dep.toEdit.department.department_details;
                                this.dep.agents = dep.toEdit.agents;
                                this.store.dispatch(new AgentActions.GetAdminAgentListAttempt( { userId: this.dep.userId}));
                                this.adminName = dep.toEdit.department.user_details.first_name+' '+dep.toEdit.department.user_details.last_name;

                        }
                    }
                  }
                );
        }
      }
    );

      this.adminList = this.store.select('afterLogin').map(data => data)
          .subscribe(
              (data) => {
                  if(data.admin.list) {
                      this.listOfAdmins = data.admin.list;
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
    //this.store.dispatch(new DepartmentActions.ResetEditDepartment({}));
  }

  /** Function call to create a new department */
  onCreateDep(form: NgForm) {
    this.loader = true;
    if(this.editMode) {
      const data = { ...form.value, departmentId: this.depId };
      this.store.dispatch(new DepartmentActions.EditDepartmentAttempt({...data}));
        /** Loader Show/Hide */
        this.store.select('alert')
            .map(data => data)
            .subscribe(
                (data) => {
                    if(data.show && data.type === 'danger') {
                        this.loader = false;
                    } else if(data.show && data.type === 'success') {
                        this.router.navigate(['/department/list']);
                    }
                }, (error) => { console.error(error); this.loader = false; } , () => {this.loader = false; });
    } else {
      this.store.dispatch(new DepartmentActions.AddDepartmentAttempt(form.value));
    }
  }

  /** Function to get agent list depending on the selected admin */
  adminChanged(id: number) {
      if (!!id) {
          this.store.dispatch(new AgentActions.GetAdminAgentListAttempt( { userId: id }));
      }
  }

    checkAdminname($event){
        this.showThis = true;
        return this.updatedlistOfAdmins = this.listOfAdmins.filter(item => item.first_name.indexOf($event) !== -1);
    }

    assignValue(id,first_name,last_name){
        this.dep.userId = id;
        this.adminName = first_name+' '+last_name;
        this.showThis = false;
        this.adminChanged(id);
    }

    resetList(){
        this.adminName = "";
        this.showThis = true;
        this.dep.userId = 0;
    }

}
