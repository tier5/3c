import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
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
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements OnInit, OnDestroy {

    chatState: Observable<fromChat.ChatState>;
    currentChatIndex: number = 0;
    currentChatRoom: string = '';
    chatRoomSubscription: Subscription;
    agentId: number;
    toAgentId : number;
    departmentId : number;
    transferData : any;


    constructor(private store: Store<fromAfterLogin.AfterLoginFeatureState>,
                private chatService: ChatService,   private activatedRoute: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.chatService.connect();
        this.chatState = this.store.select('afterLogin').map(data => data.chat);
        this.getChatRoom();
        this.store.dispatch(new ChatActions.GetTransferAgentListAttempt({ chatRoomId : this.currentChatRoom}));
        this.store.select('auth')
            .take(1)
            .map(data => data.userId)
            .distinctUntilChanged()
            .subscribe(
                (id) => {
                    this.agentId = id;
                }
            );
    }

    changeCurrentChat(i: number) {
        this.currentChatIndex = i;
        this.getChatRoom();
        this.store.dispatch(new ChatActions.GetTransferAgentListAttempt({ chatRoomId : this.currentChatRoom}));

    }

    transferChatToAgent(i: number) {
        this.toAgentId = i;
        this.transferData = { agentId: this.agentId, status: 4, chatRoomId: this.currentChatRoom , toAgentId : this.toAgentId};
        this.onSomeMsgAction(4);
    }

    transferChatToDepartment(i: number) {
        this.departmentId = i;
        this.transferData = { agentId: this.agentId, status: 4, chatRoomId: this.currentChatRoom , departmentId : this.departmentId};
        this.onSomeMsgAction(4);
    }

    onSomeMsgAction(status: number) {
        switch(status) {
            case 2:
                this.chatService.takeAction({ agentId: this.agentId, status: status, chatRoomId: this.currentChatRoom });
                /** redirect to the ongoing chat page */
                location.href = '/chat/ongoing';
                break;
            case 3:
                this.chatService.takeAction({ agentId: this.agentId, status: status, chatRoomId: this.currentChatRoom });
                break;
            case 4:
                this.chatService.takeAction(this.transferData);
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

    /** Show chats id status is 1*/
    showChats() {
        return this.store.select('afterLogin')
            .map(data => data.chat)
            .map(chats => chats.ongoing.filter(chat => chat.status == 1 ));
    }

    getLoggedInAgentDetails() {
        return this.chatService.getLoggedInAgentDetails();
    }

    ngOnDestroy() {
        this.chatRoomSubscription.unsubscribe();
    }

}
