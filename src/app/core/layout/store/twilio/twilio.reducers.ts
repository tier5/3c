import * as TwilioActions from './twilio.actions';

export interface TwilioState {
  info: any,
  list: any
}

const initialState: TwilioState = {
  info: null,
  list: []
};

export function twilioReducer(state = initialState, action: TwilioActions.TwilioActions) {
  switch (action.type) {
    case (TwilioActions.GET_TWILIO_SUCCESS):
      return {
        ...state,
        info: action.payload
      };
    case (TwilioActions.GET_TWILIO_LIST_SUCCESS):
      return {
        ...state,
        list: action.payload
      };
    default:
      return state;
  }
}

