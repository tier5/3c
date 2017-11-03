import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'

import * as fromApp from '../core/store/core.reducers';
import * as AuthActions from '../core/store/auth/auth.actions';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>) { }

  public successText="Successful";
  public warningText="Warning";
  public dangerText="Danger";
  public successColor="#8ad919";
  public warningCOlor="#ffb53e";
  public dangerColor="#f9243f";
  public fontColor="#ececec";

  ngOnInit() {
    this.store.dispatch(new AuthActions.CheckToken());
  }

}
