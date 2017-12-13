import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store'
import io from 'socket.io-client';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';

import * as fromAfterLogin from '../../store/after-login.reducers';
import * as ChatActions from '../../store/chat/chat.actions';

@Injectable()
export class ChatService {

  socket: any;
  constructor(private store: Store<fromAfterLogin.AfterLoginFeatureState>) { }

  connect() {
    this.socket = io('http://localhost:3000');
    console.log(this.socket);
    this.store.select('auth')
      .map(data => data.userId)
      .distinctUntilChanged()
      .subscribe(
        (id) => {
          this.socket.on('connect', () => {
            this.socket.emit('get-added-rooms');
            this.socket.on('new-rooms-added', (data) => {
              console.log('Angular: New Room Added ', data);
              for (let i = 0, len = data.length; i < len; i++) {
                console.log(data[i]);
                if(data[i].agent_id == id) {
                  this.socket.emit('add-agent-to-rooms', data[i].rooms);
                  break;
                }
              }

            });
            this.socket.on('agent-added-to-room', (data) => {
              console.log(data);
              this.store.dispatch(new ChatActions.AddToChatList(data));
            });
            this.socket.on('agent-removed-from-room', (data) => {
              console.log(data);
            });
          });
        }
      )
  }

}
