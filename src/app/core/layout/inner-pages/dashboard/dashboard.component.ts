import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromApp from '../../../store/core.reducers';
import * as fromAuth from '../../../store/auth/auth.reducers';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  admin:any;
    authState: Observable<fromAuth.State>;
  constructor( private store: Store<fromApp.AppState> ) { }

  ngOnInit() {
      this.admin = 10;
      this.authState = this.store.select('auth');       // auth user info
  }

}
