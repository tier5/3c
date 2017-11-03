import { Actions, Effect } from '@ngrx/effects';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';

import * as AuthActions from './auth.actions';
import { environment } from '../../../../environments/environment'

@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private router: Router) {}

  // @Effect()
  // authSignup = this.actions$
  //   .ofType(AuthActions.TRY_SIGNUP)
  //   .map((action: AuthActions.TrySignup) => {
  //     return action.payload;
  //   })
  //   .switchMap((authData: {username: string, password: string}) => {
  //     return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
  //   })
  //   .switchMap(() => {
  //     return fromPromise(firebase.auth().currentUser.getIdToken());
  //   })
  //   .mergeMap((token: string) => {
  //     return [
  //       {
  //         type: AuthActions.SIGNUP
  //       },
  //       {
  //         type: AuthActions.SET_TOKEN,
  //         payload: token
  //       }
  //     ];
  //   });

  @Effect()
  authSignIn = this.actions$
    .ofType(AuthActions.SIGNIN_ATTEMPT)
    .switchMap((action: AuthActions.SignInAttempt) => {
      const apiUrl = environment.API_BASE_URL + 'userlogin';
      const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest');
      const config = {
        // headers: headers
      };
      return this.httpClient.post( apiUrl, action.payload, config );
    })
    .map(
      (res: any) => {
        if(res.status) {
          this.router.navigate(['/dashboard']);
          return {
            type: AuthActions.SIGNIN_SUCCESS,
            payload: res.response.userToken
          }
        } else {
          return {
            type: AuthActions.SIGNIN_FAILED
          }
        }
      }
    );


  // @Effect({dispatch: false})
  // authLogout = this.actions$
  //   .ofType(AuthActions.LOGOUT)
  //   .do(() => {
  //     this.router.navigate(['/']);
  //   });


}
