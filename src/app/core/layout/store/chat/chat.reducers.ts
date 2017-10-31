import * as ChatActions from './chat.actions';

export interface ChatState {
  ongoing: any;
  resolve: any;
  connected: boolean;
  chatList: any;
  agentList: any;
  contactList: any;
  messageSend: boolean;
  messageError: boolean;
  closedChats: any;
}

const initialState: ChatState = {
  ongoing: [],
  resolve: [],
  connected: false,
  chatList : [] ,
  agentList : [],
  contactList : [],
  messageSend: false,
  messageError: false,
  closedChats: [],
};

export function chatReducer(state = initialState, action: ChatActions.ChatActions) {
    switch (action.type) {
    case ChatActions.CONNECT_SUCCESS:
      return {
        ...state,
        ongoing : [],
        resolve : [],
        closedChats : [],
        connected   : true
      };
    case ChatActions.ADD_TO_CHAT_LIST:
        // console.log('chat', action.payload);
      const obj = {
        room: action.payload.name,
        client: action.payload.client_name,
        chatTime: action.payload.chat_time,
        status: action.payload.status,
        chats: action.payload.chats,
        transferInfo: action.payload.transfer_from_agent,
        isMMS: action.payload.isMMS,
        fileType: action.payload.fileType,
        fileUrl: action.payload.fileUrl
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
      console.log(oldChatList);
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
      const oldChats = [...state.ongoing];
      oldChats.splice(indexToDelete, 1);
      return {
        ...state,
        ongoing: [...oldChats]
      };
    case (ChatActions.GET_AGENT_LIST_SUCCESS):
      return {
        ...state,
        agentList: action.payload,
        chatList: action.payload
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
      case (ChatActions.INI_CHAT_SUCCESS):
        return {
          ...state,
          messageSend: true
        };
      case (ChatActions.INI_CHAT_ERROR):
        return {
          ...state,
          messageError: true
        };
        case (ChatActions.GET_AGENT_CLOSED_CHATS_SUCCESS):
          return {
          ...state,
          closedChats: action.payload
        };
    default:
      return state;
  }
}
