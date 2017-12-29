import {Injectable, Component, NgModule, OnInit,OnDestroy} from '@angular/core'
import { Store } from '@ngrx/store'
import io from 'socket.io-client'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/map'
import * as moment from 'moment'
import { environment } from '../../../../../environments/environment'

import * as fromAfterLogin from '../../store/after-login.reducers'
import * as ChatActions from '../../store/chat/chat.actions'
import 'rxjs/add/operator/take'

@Injectable()
export class ChatService implements OnInit, OnDestroy {

  socket: any
  loggedInAgentId: number
  loggedInAgentName: string

  constructor (private store: Store<fromAfterLogin.AfterLoginFeatureState>) {
    console.log('IN SERVICE');
  }
    

  connect () {
    this.socket = io(environment.SOCKET_URL);
    console.log('connect chat service',this.store);
    this.store.select('auth')
        .map(authData => authData.userId)
        .distinctUntilChanged()
        .subscribe(
            (id) => {
              console.log(id);
              if(id!=null) {

                  this.loggedInAgentId = id;
                  // To get all the agents and the rooms they are assigned to
                  this.socket.emit('get-added-rooms');

                  // On getting the list of rooms all the agents are assigned to
                  this.socket.on('new-rooms-added', (data) => {
                      console.log('new-rooms-added: ', data);
                      for (let i = 0, len = data.length; i < len; i++) {
                          if (data[i].agent_id == this.loggedInAgentId) {
                              // To add current agent to room
                              this.socket.emit('add-agent-to-rooms', data[i].rooms);
                              break;
                          }
                      }
                  });

                  // When agent added to any room
                  this.socket.on('agent-added-to-room', (data) => {
                      console.log('agent-added-to-room', data.name);
                      this.store.dispatch(new ChatActions.AddToChatList(data));
                  });

                  this.socket.on('msg-of-acceptance', (data) => {
                      console.log(data);
                  });

                  // Which agent accepted
                  this.socket.on('which-agent-accepted', (data) => {
                      console.log('which-agent-accepted: ', data);
                      if (data.agentId == this.loggedInAgentId) {
                          this.store.dispatch(new ChatActions.EditFromChatList({
                              status: data.status,
                              room_number: data.chatRoomId
                          }))
                      } else {
                          this.socket.emit('remove-agent-from-room', {room_number: data.chatRoomId})
                          this.store.dispatch(new ChatActions.DeleteFromChatList({room_number: data.chatRoomId}))
                      }
                  });

                  // Which agent rejected
                  this.socket.on('which-agent-rejected', (data) => {
                      console.log('which-agent-rejected: ', data);
                      if (data.agentId == this.loggedInAgentId) {
                          this.store.dispatch(new ChatActions.DeleteFromChatList({room_number: data.chatRoomId}))
                          this.socket.emit('remove-agent-from-room', {room_number: data.chatRoomId});
                      }
                  });

                  this.socket.on('which-agent-resolved', (data) => {
                      console.log('In which agent resolved');
                      console.log(data);
                      if (data.agentId == this.loggedInAgentId) {
                          this.store.dispatch(new ChatActions.EditFromChatList({
                              status: data.status,
                              room_number: data.chatRoomId
                          }))
                          this.socket.emit('remove-agent-from-room', {room_number: data.chatRoomId});
                      }
                  })

                  this.socket.on('which-agent-transferred', (data) => {
                      console.log('which-agent-transferred: ', data);
                      if (data.agentId == this.loggedInAgentId) {
                          this.socket.emit('remove-agent-from-room', {room_number: data.chatRoomId})
                          this.store.dispatch(new ChatActions.DeleteFromChatList({room_number: data.chatRoomId}))
                      }
                  })

                  this.socket.on('newmsg', (data) => {
                      this.store.dispatch(new ChatActions.AddNewMsgToChatList(data))
                  })

              }

            }
        )

    this.store.select('auth')
        .subscribe(
            (data) => {
              this.loggedInAgentName = data.name;
              this.loggedInAgentId = data.userId;
            }
        )
  }
  ngOnInit() {
    
  }
  
  takeAction (data: any) {
    console.log(data);
    this.socket.emit('agent-performed-some-action', data);
  }

  sendMsg (data: { messageBody: string, chatRoomId: string }) {
    const obj = {
      ...data,
      user: this.loggedInAgentName,
      direction: 2,
      time: moment()
    }
    this.socket.emit('msg', obj)
  }

  sendResolveConfirmation (data) {
    this.socket.emit('resolve-chat-request', data)
  }

  getLoggedInAgentDetails() {
    return {
      loggedInAgentId: this.loggedInAgentId,
      loggedInAgentName: this.loggedInAgentName
    }
  }

  socketDisconnect() {
    console.log("disconnecting");
     if(this.socket) {
        this.socket.emit('agent-disconnected');
     }

  }
 ngOnDestroy() {
   console.log("chat destroy");
 }
}