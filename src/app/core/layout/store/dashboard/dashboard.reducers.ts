import * as DashboardActions from './dashboard.actions';

export interface DashboardState {
    list:any
}

const initialState: DashboardState = {
    list:[]
};

export function dashboardReducer(state = initialState, action: DashboardActions.DashboardActions) {
    switch (action.type) {
        case (DashboardActions.GET_DASHBOARD_ITEMS_COUNT_SUCCESS):
            return {
                ...state,
                list: [ action.payload ]
            };
        default:
            return state;
    }

}
