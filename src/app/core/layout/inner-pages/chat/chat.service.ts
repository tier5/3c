import { Injectable } from '@angular/core';
import io from 'socket.io-client';

@Injectable()
export class ChatService {

  socket: any;
  constructor() { }

  connect() {
    console.log('here');
    return this.socket = io('http://localhost:3000');
  }

}
