import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';


import * as fromAfterLogin from '../../../store/after-login.reducers';
import * as ChatActions from '../../../store/chat/chat.actions';
import * as fromChat from '../../../store/chat/chat.reducers';

@Component({
  selector: 'app-ongoing',
  templateUrl: './ongoing.component.html',
  styleUrls: ['./ongoing.component.css']
})
export class OngoingComponent implements OnInit, OnDestroy {

  chatState: Observable<fromChat.ChatState>;
  currentChatIndex: number = 0;
  currentChatRoom: string;
  chatRoomSubscription: Subscription;
  agentId: number;
  agentList : any;
  toAgentId : number;

  constructor(private store: Store<fromAfterLogin.AfterLoginFeatureState>,
              private chatService: ChatService) { }

  ngOnInit() {
    this.chatState = this.store.select('afterLogin')
      .map(data => data.chat);
    this.getChatRoom();

    this.store.select('auth')
      .take(1)
      .map(data => data.userId)
      .distinctUntilChanged()
      .subscribe(
        (id) => {
          this.agentId = id;
        }
      );
    this.agentList = [
      {
        "department": 9,
        "agents": [
          {
            'agent_id' : 1
          },
          {
            'agent_id' : 2
          },
          {
            'agent_id' : 3
          }
        ]
      },
      {
        "department": 10,
        "agents": [
          {
            'agent_id' : 4
          },
          {
            'agent_id' : 11
          },
          {
            'agent_id' : 12
          }
        ]
      }
    ];
    console.log(this.agentList);

  }

  changeCurrentChat(i: number) {
    this.currentChatIndex = i;
    this.getChatRoom();
  }

  transferCurrentChat(i: number) {
    this.toAgentId = i;
    console.log(this.toAgentId);
    this.onSomeMsgAction(4);
  }

  onSomeMsgAction(status: number) {
    console.log(status);
    switch(status) {
      case 2:
        this.chatService.takeAction({ agentId: this.agentId, status: status, chatRoomId: this.currentChatRoom });
        break;
      case 3:
      case 4:
        this.chatService.takeAction({ agentId: this.agentId, status: status, chatRoomId: this.currentChatRoom , toAgentId : this.toAgentId});
        this.changeCurrentChat(0);
        break;
      case 5:
        this.chatService.takeAction({ agentId: this.agentId, status: status, chatRoomId: this.currentChatRoom });
        this.changeCurrentChat(0);
        break;
      default:
        console.log(status);
    }
  }

  getChatRoom() {
    this.chatRoomSubscription = this.store.select('afterLogin')
      .subscribe(
        data => {
          if (data.chat.ongoing[this.currentChatIndex] && !data.chat.ongoing[this.currentChatIndex].length) {
            this.currentChatRoom = data.chat.ongoing[this.currentChatIndex].room;
          }
      });
  }

  sendMsg(form: NgForm) {
    this.chatService.sendMsg({ ...form.value, chatRoomId: this.currentChatRoom });
    form.reset();
  }

  ngOnDestroy() {
    this.chatRoomSubscription.unsubscribe();
  }
}
