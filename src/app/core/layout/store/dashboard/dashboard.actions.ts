import { Action } from '@ngrx/store';

export const GET_DASHBOARD_ITEMS_COUNT_ATTEMPT = 'GET_DASHBOARD_ITEMS_COUNT_ATTEMPT';
export const GET_DASHBOARD_ITEMS_COUNT_SUCCESS = 'GET_DASHBOARD_ITEMS_COUNT_SUCCESS';

export class GetDashboardItemsCountAttempt implements Action {
    readonly type = GET_DASHBOARD_ITEMS_COUNT_ATTEMPT;
    constructor(public payload: any) { }
}

export class GetDashboardItemsCountSuccess implements Action {
    readonly type = GET_DASHBOARD_ITEMS_COUNT_SUCCESS;
    constructor(public payload: any) { }
}

export type DashboardActions = GetDashboardItemsCountAttempt | GetDashboardItemsCountSuccess;