import * as DashboardActions from './dashboard.actions';

export interface DashboardState {
    list: any;
  widgets: any;
}

const initialState: DashboardState = {
    list: [],
    widgets: []
};

export function dashboardReducer(state = initialState, action: DashboardActions.DashboardActions) {
    switch (action.type) {
        case (DashboardActions.GET_DASHBOARD_ITEMS_COUNT_SUCCESS):
            return {
                ...state,
                list: [ action.payload.response ],
              widgets: action.payload.widgets
            };
        default:
            return state;
    }

}
