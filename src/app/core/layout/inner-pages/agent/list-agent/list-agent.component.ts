import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromAfterLogin from '../../../store/after-login.reducers';
import * as AgentActions from '../../../store/agent/agent.actions';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-list-agent',
  templateUrl: './list-agent.component.html',
  styleUrls: ['./list-agent.component.css']
})
export class ListAgentComponent implements OnInit {

  /** Variable declaration */
  afterLoginState: Observable<fromAfterLogin.FeatureState>;
    order: string = 'info.name';
    reverse: boolean = false;
    sortedCollection: any[];
    page: number;
    term: any;
  /** Service injection */
  constructor(private store: Store<fromAfterLogin.AfterLoginFeatureState>,
              private router: Router, private orderPipe: OrderPipe) {
      this.sortedCollection = orderPipe.transform(this.afterLoginState, 'info.name');
  }
  /** Function to be executed when component initializes */
  ngOnInit() {
    this.store.dispatch(new AgentActions.GetAgentListAttempt());
    this.page = 1;
    this.afterLoginState = this.store.select('afterLogin');
  }

  /** Function to Edit Agent */
  onEditAgent(id: number) {
    this.router.navigate([ 'agent/edit/', id ]);
  }

    /**
     * Function for ordering the table
     * @param {string} value
     */
    setOrder(value: string) {
        if (this.order === value) {
            this.reverse = !this.reverse;
        }
        this.order = value;
    }

}
