import * as ChatActions from './chat.actions';

export interface ChatState {
  ongoing: any,
  list: any,
  connected: boolean
}

const initialState: ChatState = {
  ongoing: [],
  list: [],
  connected: false
};

export function chatReducer(state = initialState, action: ChatActions.ChatActions) {
  switch (action.type) {
    case ChatActions.CONNECT_SUCCESS:
      return {
        ...state,
        connected: true
      };
    default:
      return state;
  }
}