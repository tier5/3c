import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'

import * as fromApp from '../core/store/core.reducers';
import * as AuthActions from '../core/store/auth/auth.actions';

@Component({
  selector: 'app-core',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.dispatch(new AuthActions.CheckToken());
  }

}
