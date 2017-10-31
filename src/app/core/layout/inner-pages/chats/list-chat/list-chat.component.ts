import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Data ,Router} from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import * as fromAfterLogin from '../../../store/after-login.reducers';
import * as ChatActions from '../../../store/chat/chat.actions';
import * as fromChat from '../../../store/chat/chat.reducers';

@Component({
  selector: 'app-list-chat',
  templateUrl: './list-chat.component.html',
  styleUrls: ['./list-chat.component.css']
})
export class ListChatComponent implements OnInit {

  /** Variable declaration */
  agentId : number;
  currentChatIndex: number = 0;
  chatState: Observable<fromChat.ChatState>;

  /** Service injection */
  constructor(private store: Store<fromAfterLogin.AfterLoginFeatureState>,
              private activatedRoute: ActivatedRoute,private router: Router) { }


  ngOnInit() {
    this.chatState = this.store.select('afterLogin')
          .map(data => data.chat);

    this.activatedRoute.params
        .subscribe(
            (id: any) => {
              this.agentId = this.activatedRoute.snapshot.params['id'];
              this.store.dispatch(new ChatActions.GetChatListAttempt({ agentId : id}));
            }
        );

  }

  changeCurrentChat(i: number) {
    this.currentChatIndex = i;
  }

  showChats() {
    return this.store.select('afterLogin')
        .map(data => data.chat)
        .map(chats => chats.chatList);
  }

}
