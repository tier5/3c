import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromAfterLogin from '../../../store/after-login.reducers';
import * as ChatActions from '../../../store/chat/chat.actions';

@Component({
  selector: 'app-chats-list-agent',
  templateUrl: './list-agent.component.html',
  styleUrls: ['./list-agent.component.css']
})
export class ListAgentComponent implements OnInit {

  /** Variable declaration */
  afterLoginState: Observable<fromAfterLogin.FeatureState>;

  /** Service injection */
  constructor(private store: Store<fromAfterLogin.AfterLoginFeatureState>,
              private router: Router) { }

  /** Function to be executed when component initializes */
  ngOnInit() {
    this.store.dispatch(new ChatActions.GetAgentListAttempt());
    this.afterLoginState = this.store.select('afterLogin');
  }

  /** Function to Edit Agent */
  onViewChat(id: number) {
    console.log(id);
    this.router.navigate([ 'chats/list-chat/', id ]);
  }


}
