import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store';

import * as fromAfterLogin from './store/after-login.reducers';
import * as fromChat from './store/chat/chat.reducers'
import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'app-layout.component.ts',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  /** Variable declaration */
  hovered: boolean = false;
  mobileViewClicked: boolean = false
  chatState: Observable<fromChat.ChatState>;

  constructor(private store: Store<fromAfterLogin.AfterLoginFeatureState>) { }

  ngOnInit() {
    if(this.store.select('auth').map(data => data.isAgent)) {
      this.chatState = this.store.select('afterLogin')
        .map(data => data.chat);
    }
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

}
