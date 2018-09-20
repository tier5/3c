import * as AgentChatActions from './agent-chat.action';

export interface AgentChatState {
  list: any;
}

const initialState: AgentChatState = {
  list: [],
};

export function agentChatReducer(state = initialState, action: AgentChatActions.AgentChatActions) {
  switch (action.type) {
    case (AgentChatActions.GET_AGENT_LIVE_CHAT_SUCCESS):
      return {
        ...state,
        list: action.payload
      };
      case (AgentChatActions.GET_AGENT_CLOSE_CHAT_SUCCESS):
        return {
            ...state,
            list: action.payload
        }
    default:
      return state;
  }
}
