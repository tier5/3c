import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'
import * as fromAfterLogin from '../../../store/after-login.reducers';
import * as TwilioActions from '../../../store/twilio/twilio.actions';
import { Observable } from 'rxjs/Observable'
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-list-twilio',
  templateUrl: './list-twilio.component.html',
  styleUrls: ['./list-twilio.component.css']
})
export class ListTwilioComponent implements OnInit {

  /** Variable declaration */
  afterLoginState: Observable<fromAfterLogin.FeatureState>;
    order: string = 'info.name';
    reverse: boolean = false;
    sortedCollection: any[];
    page: number;
    term: any;
  /** Service injection */
  constructor(private store: Store<fromAfterLogin.AfterLoginFeatureState>, private orderPipe: OrderPipe) {
      this.sortedCollection = orderPipe.transform(this.afterLoginState, 'info.name');
  }

  /** Function to be executed when component initializes */
  ngOnInit() {
    this.page = 1;
    this.store.dispatch(new TwilioActions.GetTwilioListAttempt());
    this.afterLoginState = this.store.select('afterLogin');
  }

    /**
     * Function for ordering the table
     * @param {string} value
     */
    setOrder(value: string) {
        if (this.order === value) {
            this.reverse = !this.reverse;
        }
        this.order = value;
    }

}
