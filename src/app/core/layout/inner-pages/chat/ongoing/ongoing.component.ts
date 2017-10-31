import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
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
import {filterQueryId} from '../../../../../../../node_modules/@angular/core/src/view/util';
import { SweetAlertService } from 'ngx-sweetalert2';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {environment} from '../../../../../../environments/environment';
import {of} from 'rxjs/observable/of';
import * as AlertActions from '../../../../store/alert/alert.actions';
import {BsModalService} from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import * as DepartmentActions from '../../../store/department/department.actions';
import * as AgentActions from '../../../store/agent/agent.actions';
import {SpinnerService} from '../../../../shared/spinner';
@Component({
  selector: 'app-ongoing',
  templateUrl: './ongoing.component.html',
  styleUrls: ['./ongoing.component.css']
})
export class OngoingComponent implements OnInit, OnDestroy {

  chatState: Observable<fromChat.ChatState>;
  currentChatIndex = 0;
  currentChatRoom = '';
  chatRoomSubscription: Subscription;
  agentId: number;
  toAgentId: number;
  departmentId: number;
  transferData: any;
  chatRoomIdChangeDetection = false;
  openStatus = false;
  isMMS = false;
  fileType = '';
  fileUrl = '';
  fileName = '';
  bsModalRef: BsModalRef;
  transferTo: string;
  transferToDepartment: any;
  transferToAgent: any;
  transferAgentList: any;
  constructor(private store: Store<fromAfterLogin.AfterLoginFeatureState>,
              private chatService: ChatService, private activatedRoute: ActivatedRoute,
              private router: Router, private _swal2: SweetAlertService,
              private httpClient: HttpClient, private modalService: BsModalService, private spinnerService: SpinnerService) {  }

  ngOnInit() {
    this.transferTo = 'department';
    this.transferToDepartment = '';
    this.transferToAgent = '';
    this.transferAgentList = [];
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
      this.getAgentDepartmentList();
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

  chatTransferModal(template:  TemplateRef<any>) {
    this.bsModalRef = this.modalService.show(template);
    this.transferTo = 'department';
    this.transferToDepartment = '';
    this.transferToAgent = '';
    this.transferAgentList = [];
  }

  transferChat(form: NgForm) {
    if (form.value.transferTo === 'agent') {
        this.transferChatToAgent(form.value.transferToAgent);
    } else {
        this.transferChatToDepartment(form.value.transferToDepartment);
    }
    this.bsModalRef.hide();
  }

  transferChange(event) {
    this.transferTo = event.target.value;
  }

  transferChangeDepartment(event) {
    this.transferToDepartment = event.target.value;
    this.store.dispatch(new DepartmentActions.GetToEditDepartmentAttempt({departmentId: this.transferToDepartment}));
    this.store.select('department')
      .distinctUntilChanged()
      .subscribe(
        (dep) => {
          if (dep) {
            if (dep.toEdit.department !== undefined) {
              this.transferAgentList = dep.toEdit.agents;
            }
          }
        }
      );
  }

  onSomeMsgAction(status: number) {
              switch (status) {
                  case 2:
                      this.chatService.takeAction({ agentId: this.agentId, status: status, chatRoomId: this.currentChatRoom });
                      break;
                  case 3:
                      this.chatService.takeAction({ agentId: this.agentId, status: status, chatRoomId: this.currentChatRoom });
                      break;
                  case 4:
                      this.chatService.takeAction(this.transferData);
                      this.changeCurrentChat(0);
                      this.spinnerService.show();
                      setInterval(a => {
                        this.spinnerService.hide();
                      }, 5000, []);
                      break;
                  case 5:
                      this._swal2.warning({
                          title: 'Are you sure?',
                          text: 'You won\'t be able to revert this!',
                          type: 'warning',
                          showCancelButton: true,
                          confirmButtonColor: '#3085d6',
                          cancelButtonColor: '#d33',
                          confirmButtonText: 'Yes'
                      }).then((result) => {
                          console.log(result);
                          if (result) {
                              this.chatService.takeAction({
                                  agentId: this.agentId,
                                  status: status,
                                  chatRoomId: this.currentChatRoom
                              });
                              this.changeCurrentChat(0);
                              location.href = '/chat/resolve';
                          }
                      }, (dismiss) => {
                          // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
                          if (dismiss === 'cancel') {
                              console.log('cancel');
                          }
                      });
                      break;
                  default:
                      console.log(status);
              }
          }


  getAgentDepartmentList() {
      this.chatRoomSubscription = this.store.select(s => s.afterLogin.chat.ongoing[this.currentChatIndex])
          .subscribe(
              data => {
                  if (data){
                      this.store.dispatch(new ChatActions.GetTransferAgentListAttempt({ chatRoomId : data.room}));
                  }
              });
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
    this.chatService.sendMsg({ ...form.value, chatRoomId: this.currentChatRoom, file: this.isMMS,
      fileURL: this.fileUrl, fileType: this.fileType });
    form.reset();
    this.isMMS = false;
    this.fileName = '';
    this.fileType = '';
    this.fileUrl = '';
  }

  /** Show chats id status is not 3 or 5 */
  showChats() {
    return this.store.select('afterLogin')
      .map(data => data.chat)
      .map(chats => chats.ongoing.filter(chat => chat.status !== 3 && chat.status !== 5 ));
  }

  getLoggedInAgentDetails() {
    return this.chatService.getLoggedInAgentDetails();
  }

  openDropdown() {
      this.openStatus = !this.openStatus;
  }

  triggerFileInput() {
    document.getElementById('fileInput').click();
  }

  fileSelected(event) {
    const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    const files: FileList = target.files;

    const formData: FormData = new FormData();
    formData.append('file', files[0]);
    const apiUrl = environment.API_BASE_URL + 'file-upload';
    const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest').set('enctype', 'multipart/form-data');
    const config = {
      headers: headers
    };
    this.httpClient.post(apiUrl, formData, config)
      .subscribe((res: any) => {
        if (res.status) {
          this.isMMS = true;
          this.fileUrl = res.response.url;
          this.fileType = res.response.type;
          this.fileName = files[0].name;
        } else {
          this.isMMS = false;
          this.fileName = '';
          this.fileType = '';
          this.fileUrl = '';
        }
      });
  }
  ngOnDestroy() {
    this.chatRoomSubscription.unsubscribe();
  }
}
