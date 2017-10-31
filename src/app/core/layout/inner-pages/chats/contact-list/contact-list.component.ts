import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Data ,Router} from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import * as fromAfterLogin from '../../../store/after-login.reducers';
import * as ChatActions from '../../../store/chat/chat.actions';
import * as fromChat from '../../../store/chat/chat.reducers';

@Component({
  selector: 'app-chats-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  /** Variable declaration */
    chatState: Observable<fromChat.ChatState>;
    agentId : number;
    page: number;
    term:any;
  /** Service injection */
  constructor(private store: Store<fromAfterLogin.AfterLoginFeatureState>,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  /** Function to be executed when component initializes */
  ngOnInit() {
    this.page = 1;
    this.chatState = this.store.select('afterLogin')
        .map(data => data.chat);

    this.activatedRoute.params
        .subscribe(
            (id: any) => {
              this.agentId = this.activatedRoute.snapshot.params['id'];
              this.store.dispatch(new ChatActions.GetContactListAttempt({ agentId : id}));
            }
        );

  }

  /** Function to Edit Agent */
  onViewChat(id: number) {
    this.router.navigate([ 'chats/list-chat/', id ]);
  }


}
