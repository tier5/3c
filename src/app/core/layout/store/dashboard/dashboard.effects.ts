import { Actions, Effect } from '@ngrx/effects';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';

import * as AuthActions from '../../../store/auth/auth.actions';
import * as DashboardActions from '../dashboard/dashboard.actions';
import * as AlertActions from '../../../store/alert/alert.actions';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class DashboardEffects {

    constructor(private actions$: Actions,
                private httpClient: HttpClient) {}
    @Effect()
    getDashboardItemsCount = this.actions$
        .ofType(DashboardActions.GET_DASHBOARD_ITEMS_COUNT_ATTEMPT)
        .switchMap((action: DashboardActions.GetDashboardItemsCountAttempt) => {
            const apiUrl = environment.API_BASE_URL + 'get-dashboard-count';
            const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest')
            const config = {
                headers: headers
            }
            return this.httpClient.post(apiUrl, action.payload, config)
                .mergeMap((res: any) => {
                    if (res.status) {
                        return [
                            {
                                type: DashboardActions.GET_DASHBOARD_ITEMS_COUNT_SUCCESS,
                                payload: res
                            }
                        ]
                    } else {
                        return [
                            {
                                type: AlertActions.ALERT_SHOW,
                                payload: { message: res.message, type: 'danger' }
                            }
                        ]
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
        });

}
