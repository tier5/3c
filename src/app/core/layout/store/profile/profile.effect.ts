import { Actions, Effect } from '@ngrx/effects'
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { of } from 'rxjs/observable/of'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/switchMap'

import * as fromApp from '../../../store/core.reducers';
import * as ProfileActions from '../profile/profile.actions';
import * as AlertActions from '../../../store/alert/alert.actions';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class ProfileEffects {

  constructor (private actions$: Actions,
               private httpClient: HttpClient,
               private router: Router,
               private store: Store<fromApp.AppState>) {}

  @Effect()
  getProfile = this.actions$
    .ofType(ProfileActions.GET_PROFILE_ATTEMPT)
    .switchMap((action: ProfileActions.GetProfileAttempt) => {
      const apiUrl = environment.API_BASE_URL + 'userprofile'
      const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest')
      const config = {
        headers: headers
      }
      return this.httpClient.post(apiUrl, '', config)
        .map((res: any) => {
          if (res.status) {
            return {
              type: ProfileActions.GET_PROFILE_SUCCESS,
              payload: res.response
            }
          } else {
            return {
              type: AlertActions.ALERT_SHOW,
              payload: { message: res.message, type: 'danger' }
            }
          }
        })
        .catch((err: HttpErrorResponse) => {
          return of(
            {
              type: AlertActions.ALERT_SHOW,
              payload: { message: err.message, type: 'danger' }
            }
          )
        })
    })

}
