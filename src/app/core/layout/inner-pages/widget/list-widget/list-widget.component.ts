import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromAfterLogin from '../../../store/after-login.reducers';
import * as WidgetActions from '../../../store/widget/widget.actions';

@Component({
  selector: 'app-list-widget',
  templateUrl: './list-widget.component.html',
  styleUrls: ['./list-widget.component.css']
})
export class ListWidgetComponent implements OnInit {

    /** Variable declaration */
  afterLoginState: Observable<fromAfterLogin.FeatureState>;

    /** Service injection */
  constructor(private store: Store<fromAfterLogin.AfterLoginFeatureState>,
                private router: Router) { }
    /** Function to be executed when component initializes */
  ngOnInit() {
      this.store.dispatch(new WidgetActions.GetWidgetListAttempt());
      this.afterLoginState = this.store.select('afterLogin');
  }
    /* Function to Edit Widget */
  onEditWidget(id: number) {
    this.router.navigate([ 'widget/edit/', id ]);
  }

}
