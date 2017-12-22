import * as ChatActions from './chat.actions';

export interface ChatState {
  ongoing: any,
  connected: boolean,
  chatList : any,
  agentList : any,
  contactList : any
}

const initialState: ChatState = {
  ongoing: [],
  connected: false,
  chatList : [],
  agentList : [],
  contactList : []
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
        client: action.payload.client_name,
        status: action.payload.status,
        chats: action.payload.chats
      };
      return {
        ...state,
        ongoing: [...state.ongoing, { ...obj }]
      };
    case (ChatActions.ADD_NEW_MSG_TO_CHAT_LIST):
        const indexOfChat = state.ongoing.findIndex(chat => chat.room == action.payload.roomNo);
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
      const chats = [...state.ongoing];
      const someChat = chats[indexToEdit];
      const updatedChat = { ...someChat, status: action.payload.status };
      chats[indexToEdit] = updatedChat;
      return {
        ...state,
        ongoing: [...chats]
      };
    case ChatActions.DELETE_FROM_CHAT_LIST:
      const indexToDelete = state.ongoing.findIndex(chat => chat.room === action.payload.room_number);
      const oldChats = [...state.ongoing]
      oldChats.splice(indexToDelete, 1);
      return {
        ...state,
        ongoing: [...oldChats]
      };
    case (ChatActions.GET_AGENT_LIST_SUCCESS):
      return {
        ...state,
        agentList: action.payload
      };
    case (ChatActions.GET_CHAT_LIST_SUCCESS):
      return {
        ...state,
        chatList: action.payload
      };
    case (ChatActions.GET_CONTACT_LIST_SUCCESS):
      return {
        ...state,
        contactList: action.payload
      };
    case (ChatActions.GET_TRANSFER_AGENT_LIST_SUCCESS):
      return {
        ...state,
        agentList: action.payload
      };
    default:
      return state;
  }
}