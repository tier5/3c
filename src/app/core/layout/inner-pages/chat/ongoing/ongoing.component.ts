import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
import {filterQueryId} from "../../../../../../../node_modules/@angular/core/src/view/util";
import { SweetAlertService } from 'ngx-sweetalert2';

@Component({
  selector: 'app-ongoing',
  templateUrl: './ongoing.component.html',
  styleUrls: ['./ongoing.component.css']
})
export class OngoingComponent implements OnInit, OnDestroy {

  chatState: Observable<fromChat.ChatState>;
  currentChatIndex: number = 0;
  currentChatRoom: string = '';
  chatRoomSubscription: Subscription;
  agentId: number;
  toAgentId : number;
  departmentId : number;
  transferData : any;
  chatRoomIdChangeDetection: boolean = false;
  openStatus:boolean = false;

  constructor(private store: Store<fromAfterLogin.AfterLoginFeatureState>,
              private chatService: ChatService,private activatedRoute: ActivatedRoute, private router: Router, private _swal2: SweetAlertService) {  }

  ngOnInit() {
    this.chatService.connect();
    this.chatState = this.store.select('afterLogin').map(data => data.chat);
    this.getChatRoom();
    // this.store.dispatch(new ChatActions.GetTransferAgentListAttempt({ chatRoomId : this.currentChatRoom}));
    this.store.select('auth')
        .take(1)
        .map(data => data.userId)
        .distinctUntilChanged()
        .subscribe(
            (id) => {
              this.agentId = id;
            }
        );
       this.changeCurrentChat(0);
      this.getAgentDepartmentList()
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
      this._swal2.warning({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
      }).then((result) => {
          if (result) {
              this._swal2.error([
                  'Chat Closed!',
                  'Your Chat is closed.',
                  'success']
              )
              switch(status) {
                  case 2:
                      this.chatService.takeAction({ agentId: this.agentId, status: status, chatRoomId: this.currentChatRoom });
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
                      location.href = '/chat/resolve';
                      break;
                  default:
                      console.log(status);
              }
          }
      })
  }

  getAgentDepartmentList(){
      this.chatRoomSubscription = this.store.select(s => s.afterLogin.chat.ongoing[this.currentChatIndex])
          .subscribe(
              data => {
                  if (data){
                      this.store.dispatch(new ChatActions.GetTransferAgentListAttempt({ chatRoomId : data.room}));
                  }
              });
  }

  getChatRoom() {
    this.chatRoomSubscription = this.store.select("afterLogin")
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

  /** Show chats id status is not 3 or 5 */
  showChats() {
    return this.store.select('afterLogin')
      .map(data => data.chat)
      .map(chats => chats.ongoing.filter(chat => chat.status != 3 && chat.status != 5 ));
  }

  getLoggedInAgentDetails() {
    return this.chatService.getLoggedInAgentDetails();
  }

  openDropdown() {
      this.openStatus = !this.openStatus;
  }

  ngOnDestroy() {
    this.chatRoomSubscription.unsubscribe();
  }
}
