import * as WidgetActions from './widget.actions'

export interface WidgetState {
  info: any,
  toEdit: any,
  list: any,
  resetWidgetForm: boolean,
  timezoneList: any
}

const initialState: WidgetState = {
  info: null,
  list: [],
  toEdit: {},
  resetWidgetForm: false,
  timezoneList: []
}

export function widgetReducer (state = initialState, action: WidgetActions.WidgetActions) {
  switch (action.type) {
    case (WidgetActions.ADD_WIDGET_SUCCESS):
      return {
        ...state,
        list: [...state.list, action.payload],
        resetWidgetForm: true
      };
    case (WidgetActions.GET_WIDGET_LIST_SUCCESS):
      return {
        ...state,
        list: action.payload
      };
    case (WidgetActions.GET_TIMEZONE_LIST_SUCCESS):
      return {
        ...state,
        timezoneList: [...action.payload]
      };
    case (WidgetActions.RESET_WIDGET_FORM):
      return {
        ...state,
        resetWidgetForm: false
      };
    case (WidgetActions.GET_WIDGET_TO_EDIT_SUCCESS):
      return {
        ...state,
        toEdit: action.payload
      };
    default:
      return state
  }
}
