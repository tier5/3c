import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';

import * as fromAfterLogin from '../../../store/after-login.reducers';
import * as AgentActions from '../../../store/agent/agent.actions';

@Component({
  selector: 'app-list-agent',
  templateUrl: './list-agent.component.html',
  styleUrls: ['./list-agent.component.css']
})
export class ListAgentComponent implements OnInit {

  /** Variable declaration */
  afterLoginState: Observable<fromAfterLogin.FeatureState>;
  p: number = 1;

  /** Service injection */
  constructor(private store: Store<fromAfterLogin.AfterLoginFeatureState>,
              private router: Router) { }
  /** Function to be executed when component initializes */
  ngOnInit() {
    this.store.dispatch(new AgentActions.GetAgentListAttempt({}));
    this.afterLoginState = this.store.select('afterLogin');
  }

  /** Function to Edit Agent */
  onEditAgent(id: number) {
    this.router.navigate([ 'agent/edit/', id ]);
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.store.dispatch(new AgentActions.GetAgentListAttempt(form.value));
  }

}