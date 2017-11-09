import { Component, EventEmitter, OnInit, Output } from '@angular/core'

import * as fromApp from '../../store/core.reducers';
import * as AuthActions from '../../store/auth/auth.actions';
import { Store } from '@ngrx/store'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() tls: EventEmitter<any> = new EventEmitter();
  @Output() mtls: EventEmitter<any> = new EventEmitter();

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }

  toggleLeftSidebar() {
    if(window.screen.width <= 767) {
      this.mtls.emit(event);
    } else {
      this.tls.emit(event);
    }
  }

  onSignOut() {
    this.store.dispatch(new AuthActions.SignOutAttempt());
  }

}
