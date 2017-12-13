import * as ChatActions from './chat.actions';

export interface ChatState {
  ongoing: any,
  connected: boolean
}

const initialState: ChatState = {
  ongoing: [],
  connected: false
};

export function chatReducer(state = initialState, action: ChatActions.ChatActions) {
  switch (action.type) {
    case ChatActions.CONNECT_SUCCESS:
      return {
        ...state,
        connected: true
      };
    case ChatActions.ADD_TO_CHAT_LIST:
      const obj = {
        room: action.payload.name,
        status: action.payload.status,
        chats: []
      };
      return {
        ...state,
        ongoing: [...state.ongoing, { ...obj }]
      };
    case ChatActions.DELETE_FROM_CHAT_LIST:
      const index = state.ongoing.indexOf(chat => chat.room === action.payload.name);
      const oldChats = { ...state.ongoing }
      oldChats.splice(index, 1)
      return {
        ...state,
        ongoing: [...oldChats]
      };
    default:
      return state;
  }
}