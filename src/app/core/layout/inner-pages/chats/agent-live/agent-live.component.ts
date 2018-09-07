import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { ChatService } from '../../chat/chat.service';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import * as fromAfterLogin from '../../../store/after-login.reducers';
import * as ChatActions from '../../../store/chat/chat.actions';
import * as fromChat from '../../../store/chat/chat.reducers';
import {filterQueryId} from '../../../../../../../node_modules/@angular/core/src/view/util';
import * as  AgentChatActions from '../../../store/agent-chat/agent-chat.action';

@Component({
  selector: 'app-agent-live',
  templateUrl: './agent-live.component.html',
  styleUrls: ['./agent-live.component.css']
})
export class AgentLiveComponent implements OnInit, OnDestroy {
  agentChatSubscription: Subscription;
  agentList: any[];
  allAgentList: any[];
  agentIndex: any;
  clientIndex: any;
  searchKeywords: any;
  live: boolean;
  constructor(private store: Store<fromAfterLogin.AfterLoginFeatureState>,
              private chatService: ChatService, private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.agentIndex = 0;
    this.clientIndex = 0;
    this.live = false;
    this.store.dispatch(new AgentChatActions.GetAgentLiveChatAttempt);
    this.agentChatSubscription = this.store.select('afterLogin', 'agentChats').subscribe(
      (data) => {
        if (data.list.length > 0) {
          this.agentList = data.list;
          this.allAgentList = data.list;
          data.list.forEach(item => {
            if (item.liveStatus) {
              this.live = true;
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
  ngOnDestroy() {

  }
}
