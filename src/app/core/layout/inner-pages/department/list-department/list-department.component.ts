import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAfterLogin from '../../../store/after-login.reducers';
import { Observable } from 'rxjs/Observable';
import * as DepartmentActions from '../../../store/department/department.actions';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import * as fromAuth from '../../../../store/auth/auth.reducers';
import * as AgentActions from '../../../store/agent/agent.actions';
import {BsModalService} from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-list-department',
  templateUrl: './list-department.component.html',
  styleUrls: ['./list-department.component.css']
})
export class ListDepartmentComponent implements OnInit, OnDestroy {

  /** Variable declaration */
    afterLoginState: Observable<fromAfterLogin.FeatureState>;
    authSubscription: Subscription;
    authState: Observable<fromAuth.State>;
    preDeleteSubscription: Subscription;
    order = 'info.name';
    sortedCollection: any[];
    page: number;
    term: any;
    companySearch: any;
    companyList: any[];
    companySubscription: Subscription;
    bsModalRef: BsModalRef;
    deleteCheckList: any[];
  constructor(private store: Store<fromAfterLogin.AfterLoginFeatureState>,
              private router: Router,  private modalService: BsModalService) { }

  /** Function to be executed when component initializes */
  ngOnInit() {
      this.page = 1;
      this.companySearch = '';
      this.authState = this.store.select('auth');
      this.authSubscription = this.store.select('auth')
      .subscribe(
        (data) => {
          if (data.isAdmin) {
            this.store.dispatch(new DepartmentActions.GetDepartmentListAttempt({userId: data.userId}));
          } else {
            this.store.dispatch(new DepartmentActions.GetDepartmentListAttempt({}));
          }
        }
      );

    this.afterLoginState = this.store.select('afterLogin');

      this.authSubscription = this.store.select('auth')
          .subscribe(
              (data) => {
                  if(data.isSuperAdmin) {
                      this.store.dispatch(new AgentActions.GetCompanyListAttempt({userId: data.token}));
                  }
              }
          );

      /* Company List droupdown */
      this.companySubscription = this.store.select('afterLogin', 'agent').subscribe(
          (data) => {
              this.companyList = data.comapnyList;
          }
      );

  }

  /** Function call to start editing a department */
  onEdit(depId: number) {
    this.router.navigate([ 'department/edit/', depId ]);
  }

  preDelete(dept_id, template: TemplateRef<any>) {
    this.store.dispatch(new DepartmentActions.PreDeleteAttempt({deptId: dept_id}));
    this.preDeleteSubscription = this.store.select('afterLogin', 'department', 'preDelete').subscribe(
      (data) => {
        this.deleteCheckList = data;
      }
    );
    this.bsModalRef = this.modalService.show(template);
  }
  deleteDepartment(id) {
    this.bsModalRef.hide();
    this.store.dispatch(new DepartmentActions.DepartmentDeleteAttempt({deptId: id}));
  }
  ngOnDestroy (): void {
    this.companyList = null;
    this.authSubscription.unsubscribe();
    this.companySubscription.unsubscribe();
  }

}
