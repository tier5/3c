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
    this.currentChatIndex = i;
    this.getChatRoom();
  }

  onAccept() {
    this.chatService.accept({ agentId: this.agentId, status: 2, chatRoomId: this.currentChatRoom });
  }

  onDecline() {
    console.log();
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
