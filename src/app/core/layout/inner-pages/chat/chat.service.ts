import { Injectable } from '@angular/core';
import io from 'socket.io-client';

import * as fromAfterLogin from '../../store/after-login.reducers';
import { Store } from '@ngrx/store'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/map'

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
            this.socket.emit('get-added-rooms', { agentId: id });
            this.socket.on('new-rooms-added', (data) => {
              for (let i = 0, len = data.length; i < len; i++) {
                if(data[i].agent_id == id) {
                  this.socket.emit('add-to-rooms', {
                    rooms: data[i].rooms
                  });
                  break;
                }
              }

            })
          });
        }
      )
  }

}
