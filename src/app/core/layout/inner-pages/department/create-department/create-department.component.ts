import { ActivatedRoute, Data, Router } from '@angular/router';
import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, TemplateRef } from '@angular/core'
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/distinctUntilChanged';

import * as AdminActions from '../../../store/admin/admin.actions';
import * as fromAuth from '../../../../store/auth/auth.reducers';
import * as fromAfterLogin from '../../../store/after-login.reducers';
import * as DepartmentActions from '../../../store/department/department.actions';
import * as DepartmentReducer from '../../../store/department/department.reducers';
import { Subscription } from 'rxjs/Subscription';
import * as AgentActions from '../../../store/agent/agent.actions';
import {BsModalService} from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

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
  createAgentLoader: boolean = false;   /** Loader for add agent button */
  adminUserId:number;                 /** admin user id from admin selection droupdown */
  adminId:number;
  changedDepFlag: boolean = false;
  adminList: Subscription;
  listOfAdmins = [];
  updatedlistOfAdmins = [];
  adminName:any;
  showThis: boolean = false;
  dropdownSettings = {};
  bsModalRef: BsModalRef;             /** bootstrap modal */
  agent: any;                            /** initialize the agent object */
  mask: Array<string | RegExp> = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  /** Service injection */
  constructor(private store: Store<fromAfterLogin.AfterLoginFeatureState>,
              private activatedRoute: ActivatedRoute,
              private cdr: ChangeDetectorRef, private router: Router, private modalService: BsModalService) { }

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
            if (!!this.loggedInAdminId) {
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
             this.updateDep = this.store.select('department')
                 .distinctUntilChanged()
                .subscribe(
                  (dep) => {
                    if(dep) {
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
    this.dropdownSettings = {
      singleSelection: false,
      text:"Select Agents",
      selectAllText:'Select All',
      unSelectAllText:'UnSelect All',
      enableSearchFilter: false,
      classes:"myclass custom-class",
      primaryKey: 'id',
      labelKey: 'name'
    };

    /** Empty Agent option */
    this.agent = {
        userId: '',
        firstName: '',
        lastName: '',
        email:'',
        phone:'',
        isemailNotification:true,
        isPhoneNotification:true,
    };
  }

  /** Your code to update the model */
  ngAfterViewChecked(){
    this.cdr.detectChanges();
  }

  /** Un-subscribe from all subscription when component destroys */
  ngOnDestroy(){
    this.authSubscription.unsubscribe();
    this.afterLoginSubscription.unsubscribe();
    this.adminList.unsubscribe();
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

  /** Function to filter by admin names */
    checkAdminname($event){
        this.showThis = true;
        return this.updatedlistOfAdmins = this.listOfAdmins.filter(item => item.first_name.toLowerCase().indexOf($event) !== -1);
    }

    /** function to assign value to the hidden field */
    assignValue(id,first_name,last_name){
        this.dep.userId = id;
        this.adminName = first_name+' '+last_name;
        this.showThis = false;
        this.adminChanged(id);
    }

    /** Function to reset the admin list when click on close */
    resetList(){
        this.adminName = "";
        this.showThis = true;
        this.dep.userId = 0;
    }
    /** Function to create agent modal*/
    CreateAgent(template:  TemplateRef<any>) {
        console.log(this.dep.userId);
        this.bsModalRef = this.modalService.show(template);
    }

    /** Function to create agent */
    onCreateAgentSubmit(form){
        this.createAgentLoader = true;
        /** Create Agent */
        this.store.dispatch(new AgentActions.AddAgentAttempt(form.value));
        /** Loader Show/Hide */
        this.store.select('alert')
            .map(data => data)
            .subscribe(
                (data) => {
                    if (data.show && data.type === 'danger') {
                        this.createAgentLoader = false;
                    }else if (data.show && data.type === 'success') {
                        this.bsModalRef.hide();
                        this.store.select('afterLogin','agent','newAgentInfo')
                            .subscribe(data=> {
                                this.dep.agents.push({id:data.id, first_name:data.first_name, last_name: data.last_name});
                            })
                    }
                }, (error) => { console.error(error); this.createAgentLoader = false; } , () => {this.createAgentLoader = false; });
    }

}
