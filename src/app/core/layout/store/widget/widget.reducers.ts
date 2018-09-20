import * as WidgetActions from './widget.actions';
import * as AgentActions from '../agent/agent.actions';

export interface WidgetState {
  info: any;
  toEdit: any;
  list: any;
  resetWidgetForm: boolean;
  timezoneList: any;
  numbers: any;
  newSuccessBuyNumberCall: boolean;
  numberError: boolean;
  numberMessage: any;
  buttonLoader:any;
}

const initialState: WidgetState = {
  info: null,
  list: [],
  toEdit: {},
  resetWidgetForm: false,
  timezoneList: [],
  numbers: [],
  newSuccessBuyNumberCall: false,
  numberError: false,
  numberMessage: '',
  buttonLoader: ''
};

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
    case (WidgetActions.GET_NUMBER_LIST_SUCCESS):
      return {
        ...state,
        numbers: action.payload.res,
        newSuccessBuyNumberCall: true,
        buttonLoader: action.payload.type,
      }
      case (WidgetActions.GET_NUMBER_LIST_ERROR):
      return {
        ...state,
        numbers: [],
        newSuccessBuyNumberCall: false,
        numberError: true,
        numberMessage: action.payload.message,
        buttonLoader: action.payload.type
      }
    case (WidgetActions.WIDGET_DELETE_SUCCESS):
      const deleteIndex = state.list.findIndex(widget => widget.id === action.payload);
      const deleteWidgetData = [...state.list];
      deleteWidgetData.splice(deleteIndex, 1);
      return {
        ...state,
        list: [...deleteWidgetData ]
      };
    default:
      return state;
  }
}
