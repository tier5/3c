import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromApp from '../../store/core.reducers';
import * as fromAuth from '../../store/auth/auth.reducers';
import * as AuthActions from '../../store/auth/auth.actions';
import {ChatService} from "../inner-pages/chat/chat.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  /** Variable declaration */
  @Output() tls: EventEmitter<any> = new EventEmitter();
  @Output() mtls: EventEmitter<any> = new EventEmitter();
  authState: Observable<fromAuth.State>;

  /** Service injection */
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  /** Function call to toggle left sidebar */
  toggleLeftSidebar(event) {
    if (window.screen.width <= 767) {
      this.mtls.emit(event);
    } else {
      this.tls.emit(event);
    }
  }

  /** Function call to sign out */
  onSignOut() {
    this.store.dispatch(new AuthActions.SignOutAttempt());

  }

}
