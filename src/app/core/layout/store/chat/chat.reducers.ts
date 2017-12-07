import * as ChatActions from './chat.actions';

export interface ChatState {
  list: any,
  connected: boolean
}

const initialState: ChatState = {
  list: [],
  connected: false
};

export function chatReducer(state = initialState, action: ChatActions.ChatActions) {
  switch (action.type) {
    case ChatActions.CONNECT_SUCCESS:
      return {
        ...state,
      //  connected: action.payload
        connected: true
      };
    default:
      return state;
  }
}