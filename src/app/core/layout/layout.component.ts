import { Component, OnInit , OnDestroy} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import { ChatService } from './inner-pages/chat/chat.service';

import * as fromAfterLogin from './store/after-login.reducers';
import * as fromChat from './store/chat/chat.reducers';
import * as ChatActions from './store/chat/chat.actions';

@Component({
  selector: 'app-layout.component.ts',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy {

  /** Variable declaration */
  hovered: boolean = false;
  mobileViewClicked: boolean = false;
  chatState: Observable<fromChat.ChatState>;
  isAgent : boolean = false;
  currentYear : any;

  constructor(private store: Store<fromAfterLogin.AfterLoginFeatureState>,private chatService: ChatService) { }

  ngOnInit() {
    this.store.select('auth')
      .take(1)
      .map(data => data.isAgent)
      .subscribe(
        (data) => {
          if (data) {
            this.isAgent = true;
            this.chatState = this.store.select('afterLogin')
              .map(data => data.chat);
            this.store.dispatch(new ChatActions.ConnectAttempt());
          }
        }
      );
      this.getYear();
  }

  /** Function to toggle sidebar in desktop view */
  toggleLeftSidebar($event){
    if ($event.type == 'click') {
      this.hovered = !this.hovered;
    } else {
      this.hovered = $event.type == 'mouseover';
    }
  }

  /** Function to toggle sidebar in mobile view */
  toggleLeftSidebarMobile($event) {
    if ($event.type == 'click') {
      this.mobileViewClicked = !this.mobileViewClicked;
    }
  }

  ngOnDestroy() {
    console.log("layout destroy");
    if(this.isAgent) {
      this.chatService.socketDisconnect();
    }
  }

  /** function get the current year for the footer*/
  getYear(){
      this.currentYear = new Date().getFullYear();
  }

}
