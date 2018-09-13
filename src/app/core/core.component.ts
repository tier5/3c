import { Component, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromApp from '../core/store/core.reducers';
import * as fromAlert from './store/alert/alert.reducers';
import * as AuthActions from '../core/store/auth/auth.actions';
import {Router} from '@angular/router';
import {NotificationAlertService} from './shared/notification.alert.service';
import { SpinnerService } from './shared';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})

export class CoreComponent implements OnInit {
  alertState: Observable<fromAlert.AlertState>;
  notification = false;
  constructor(private store: Store<fromApp.AppState>, protected _router: Router, protected _r: Router,
              private _isNotificationData: NotificationAlertService,
              private spinnerService: SpinnerService) {
    window.addEventListener('focus', function() {
      if (_router.url !== '/dashboard' || _r.url !== '/chat/pending') {
        _isNotificationData.setIsNotification(false);
      } else {
        _isNotificationData.setIsNotification(true);
      }
    });
    window.addEventListener('blur', function() {
      _isNotificationData.setIsNotification(true);
    });
  }

  ngOnInit() {
    this.alertState = this.store.select('alert');
    this.store.dispatch(new AuthActions.CheckToken());
    this.store.dispatch(new AuthActions.CheckTwilioActiveAttempt());
  }
}
