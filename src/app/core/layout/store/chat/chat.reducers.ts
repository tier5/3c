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
    case (ChatActions.ADD_NEW_MSG_TO_CHAT_LIST):
        const indexOfChat = state.ongoing.findIndex(chat => chat.room === action.payload.roomNo);
        const oldChatList = [...state.ongoing];
        const someChatList = {...oldChatList[indexOfChat]};
        someChatList.chats = [...someChatList.chats, {...action.payload}];

        oldChatList[indexOfChat] = {...someChatList};
        return {
          ...state,
          ongoing: [...oldChatList]
        };
    case (ChatActions.EDIT_FROM_CHAT_LIST):
      const indexToEdit = state.ongoing.findIndex(chat => chat.room === action.payload.room_number);
      const someChat = state.ongoing[indexToEdit];
      const updatedChat = { ...someChat, status: action.payload.status };
      const chats = [...state.ongoing];
      chats[indexToEdit] = updatedChat;
      return {
        ...state,
        ongoing: [...chats]
      };
    case ChatActions.DELETE_FROM_CHAT_LIST:
      const indexToDelete = state.ongoing.findIndex(chat => chat.room === action.payload.name);
      const oldChats = [...state.ongoing]
      oldChats.splice(indexToDelete, 1);
      return {
        ...state,
        ongoing: [...oldChats]
      };
    default:
      return state;
  }
}