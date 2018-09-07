import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Store} from '@ngrx/store';
import * as fromAfterLogin from '../../../store/after-login.reducers';
import {ChatService} from '../../chat/chat.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as AgentChatActions from '../../../store/agent-chat/agent-chat.action';

@Component({
  selector: 'app-agent-rejected',
  templateUrl: './agent-rejected.component.html',
  styleUrls: ['./agent-rejected.component.css']
})
export class AgentRejectedComponent implements OnInit {
  agentChatSubscription: Subscription;
  agentList: any[];
  allAgentList: any[];
  agentIndex: any;
  clientIndex: any;
  searchKeywords: any;
  rejected: boolean;
  constructor(private store: Store<fromAfterLogin.AfterLoginFeatureState>,
              private chatService: ChatService, private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.agentIndex = 0;
    this.clientIndex = 0;
    this.rejected = false;
    this.store.dispatch(new AgentChatActions.GetAgentLiveChatAttempt);
    this.agentChatSubscription = this.store.select('afterLogin', 'agentChats').subscribe(
      (data) => {
        if (data.list.length > 0) {
          this.agentList = data.list;
          this.allAgentList = data.list;
          data.list.forEach(item => {
            if (item.rejectedStatus) {
              this.rejected = true;
            }
          });
        }
      }
    );
  }
  changeAgent(i: number) {
    this.agentIndex = i;
  }
  changeClient(i: number) {
    this.clientIndex = i;
  }
  agentFilterKeyUp() {
    const that = this;
    this.agentIndex = 0;
    this.clientIndex = 0;
    this.agentList = this.allAgentList.filter(function (el) {
      const termLower = that.searchKeywords.toLowerCase().trim();
      if (el.agent.name != null && el.agent.name.toLowerCase().indexOf(termLower) > -1) {
        return true;
      }
    });
  }
}
