import {Component, OnInit, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import * as fromAuth from '../../../store/auth/auth.reducers';
import * as fromAfterLogin from '../../store/after-login.reducers';
import {Subscription} from 'rxjs/Subscription';
import * as DashboardActions from '../../store/dashboard/dashboard.actions';
import * as fromChat from '../../store/chat/chat.reducers';
import {ChatService} from '../chat/chat.service';
import {environment} from '../../../../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {SpinnerService} from '../../../shared/spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  /** Variable declaration */
  afterLoginState: Observable<fromAfterLogin.FeatureState>;
  authSubscription: Subscription;
  admin: any;
  agent: any;
  depertment: any;
  widgets: any;
  pendingChatCount: any;
  ongoingChatCount: any;
  closedChatCount: any;
  rejectedChatCount: any;
  authState: Observable<fromAuth.State>;
  chatState: Observable<fromChat.ChatState>;
  agentId: number;
  initiateError: boolean;
  initiateMessage: string;
  isMMS = false;
  fileType = '';
  fileUrl = '';
  fileName = '';
  widgetLists: any;
  constructor(private store: Store<fromAfterLogin.AfterLoginFeatureState>,
              private chatService: ChatService, private httpClient: HttpClient,
              private spinnerService: SpinnerService) {
  }

  ngOnInit() {
    this.initiateError = false;
    this.initiateMessage = '';
    this.authState = this.store.select('auth');       // auth user info
    this.authSubscription = this.store.select('auth')
      .subscribe(
        (data) => {
          if (data.isAuthenticated !== false && data.isAdmin) {
            this.store.dispatch(new DashboardActions.GetDashboardItemsCountAttempt({userId: data.userId}));
          } else if (data.isAuthenticated !== false && data.isSuperAdmin) {
            this.store.dispatch(new DashboardActions.GetDashboardItemsCountAttempt({userId: null}));
          } else if (data.isAuthenticated !== false && data.isAgent) {
            this.store.dispatch(new DashboardActions.GetDashboardItemsCountAttempt({userId: data.userId}));
            this.agentId = data.userId;
            this.chatService.connect();
            this.chatState = this.store.select('afterLogin').map(data => data.chat);
          }
        }
      );

    this.store.select('afterLogin', 'dashboard').subscribe(
      (changes) => {
        if (changes.widgets !== undefined) {
          this.widgetLists = changes.widgets;
        }
        if (changes.list[0] !== undefined) {
          this.admin = changes.list[0][0].adminCount;
          this.agent = changes.list[0][0].agentCount;
          this.depertment = changes.list[0][0].departmentCount;
          this.widgets = changes.list[0][0].widgetCount;
          this.pendingChatCount = changes.list[0][0].pendingChatCount;
          this.ongoingChatCount = changes.list[0][0].ongoingChatCount;
          this.closedChatCount = changes.list[0][0].closedChatCount;
          this.rejectedChatCount = changes.list[0][0].rejectedChatCount;
        }
      }, (error) => {
        console.log(error);
      }
    );

    this.afterLoginState = this.store.select('afterLogin');
  }

  /** Show chats id status is 1*/
  showChats() {
    return this.store.select('afterLogin')
      .map(data => data.chat)
      .map(chats => chats.ongoing.filter(chat => chat.status == 1));
  }

  onSomeMsgAction(status: number, currentChatRoom: number) {
    switch (status) {
      case 2:
        this.chatService.takeAction({agentId: this.agentId, status: status, chatRoomId: currentChatRoom});
        /** redirect to the ongoing chat page */
        location.href = '/chat/ongoing';
        break;
      case 3:
        this.chatService.takeAction({agentId: this.agentId, status: status, chatRoomId: currentChatRoom});
        this.authSubscription = this.store.select('auth')
          .subscribe(
            (data) => {
                if (data.isAuthenticated !== false && data.isAgent) {
                this.store.dispatch(new DashboardActions.GetDashboardItemsCountAttempt({userId: data.userId}));
              }
            }
          );
        break;
      case 5:
        this.chatService.takeAction({agentId: this.agentId, status: status, chatRoomId: currentChatRoom});
        break;
      default:
        console.log(status, currentChatRoom);
    }
  }

  uploadFile(event) {
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
    this.spinnerService.show();
    this.httpClient.post(apiUrl, formData, config)
      .subscribe((res: any) => {
        this.spinnerService.hide();
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


  sendMessage(number, message, widgetSelect) {
    if (number !== '' && message !== '' && widgetSelect !== '') {
      this.initiateError = false;
      this.initiateMessage = '';
      if (this.isNumber(number) && number.length === 10) {

        const formData: FormData = new FormData();
        formData.append('to', number);
        formData.append('widget_uuid', widgetSelect);
        formData.append('widget_uuid', widgetSelect);
        formData.append('userId', <any>this.agentId);
        formData.append('body', message);
        if (this.isMMS) {
          formData.append('file', '1');
        } else {
          formData.append('file', '0');
        }
        formData.append('fileUrl', <any>this.fileUrl);
        formData.append('fileType', <any>this.fileType);
        const apiUrl = environment.API_BASE_URL + 'ini-chat';
        const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest').set('enctype', 'multipart/form-data');
        const config = {
          headers: headers
        };
        this.spinnerService.show();
        this.httpClient.post(apiUrl, formData, config)
          .subscribe((res: any) => {
            this.spinnerService.hide();
            if (res.status) {
              location.href = '/chat/ongoing';
            } else {
              this.initiateError = true;
              this.initiateMessage = res.message;
            }
          });
      } else {
        this.initiateError = true;
        this.initiateMessage = 'Please enter a valid phone number.';
      }
    } else {
      this.initiateError = true;
      this.initiateMessage = 'Please enter number, message and widget to send a sms.';
    }
  }
  isNumber(value: string | number): boolean {
    return !isNaN(Number(value.toString()));
  }
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

}
