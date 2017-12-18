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
      )
  }

  changeCurrentChat(i: number) {
    console.log('in change current chat');
    console.log('Current Chat: ', this.currentChatIndex);
    this.currentChatIndex = i;

    console.log('Current Chat: ', this.currentChatIndex);
    this.getChatRoom();
  }

  onSomeMsgAction(status: number) {
    console.log(status);
    switch(status) {
      case 2:
        this.chatService.takeAction({ agentId: this.agentId, status: status, chatRoomId: this.currentChatRoom });
        break;
      case 3:
      case 5:
        this.chatService.takeAction({ agentId: this.agentId, status: status, chatRoomId: this.currentChatRoom });
        this.changeCurrentChat(0);
        break;
      default:
        console.log(status);
    }
  }

  getChatRoom() {
    console.log('in get chatroom');
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
