import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'

import * as fromProfile from '../../store/profile/profile.reducers';
import * as ProfileActions from '../../store/profile/profile.actions'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private store: Store<fromProfile.ProfileState>) { }

  ngOnInit() {
    this.store.dispatch(new ProfileActions.GetProfileAttempt());
  }

}
