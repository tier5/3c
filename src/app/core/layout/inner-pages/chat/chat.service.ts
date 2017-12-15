import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store'
import io from 'socket.io-client';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import * as moment from 'moment';

import * as fromAfterLogin from '../../store/after-login.reducers';
import * as ChatActions from '../../store/chat/chat.actions';
import 'rxjs/add/operator/take'

@Injectable()
export class ChatService {

  socket: any;
  loggedInAgentId: number;
  loggedInAgentName: string;

  constructor(private store: Store<fromAfterLogin.AfterLoginFeatureState>) {
    this.socket = io('http://localhost:3000');
    this.store.select('auth')
      .map(data => data.userId)
      .distinctUntilChanged()
      .take(1)
      .subscribe(
        (id) => {
          this.loggedInAgentId = id;
          this.socket.on('connect', () => {
            this.socket.emit('get-added-rooms');
            this.socket.on('new-rooms-added', (data) => {
              console.log('Angular: New Room Added ', data);
              for (let i = 0, len = data.length; i < len; i++) {
                if(data[i].agent_id == id) {
                  console.log('Angular : Agent Added to room', JSON.stringify(data[i].rooms,null,4));
                  this.socket.emit('add-agent-to-rooms', data[i].rooms);
                  break;
                }
              }

            });
            this.socket.on('agent-added-to-room', (data) => {
              console.log('Agent Added To Room', data.name);
              this.store.dispatch(new ChatActions.AddToChatList(data));
            });

            this.socket.on('msg-of-acceptance', (data) => {
              console.log(data);
            });
            this.socket.on('which-agent-accepted', (data) => {
              console.log('In which agent accepted');
              if (data.agent_id == id) {
                this.store.dispatch(new ChatActions.EditFromChatList({ status: data.status, room_number: data.room_number }));
              } else {
                this.socket.emit('remove-agent-from-room', { room_number: data.room_number });
                this.store.dispatch(new ChatActions.DeleteFromChatList({ room_number: data.room_number }));
              }
            });
            this.socket.on('newmsg', (data) => {
              console.log(data);
              this.store.dispatch(new ChatActions.AddNewMsgToChatList(data));
            });
          });
        }
      );

    this.store.select('auth')
      .subscribe(
        (data) => {
          this.loggedInAgentName = data.name;
        }
      );
  }

  connect() {

  }

  accept(data: { agentId: number, status: number, roomNumber: string }) {
    this.socket.emit('agent-accepts-msg', data);
  }

  sendMsg(data: { message: string }) {
    const obj = {
      ...data,
      user: this.loggedInAgentName,
      direction: 2,
      time : moment()
    };
    console.log(obj);
    this.socket.emit('msg', obj);
  }

}
