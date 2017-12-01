import * as AgentActions from './agent.actions'

export interface AgentState {
  info: any,
  list: any,
  toEdit: any,
  resetAgentForm: boolean
}

const initialState: AgentState = {
  info: null,
  list: [],
  toEdit: {},
  resetAgentForm: false
}

export function agentReducer (state = initialState, action: AgentActions.AgentActions) {
  switch (action.type) {
    case (AgentActions.ADD_AGENT_SUCCESS):
      return {
        ...state,
        list: [...state.list, action.payload],
        resetAgentForm: true
      }
    case (AgentActions.GET_AGENT_LIST_SUCCESS):
      return {
        ...state,
        list: action.payload
      }
    case (AgentActions.EDIT_AGENT_SUCCESS):
      const index = state.list.indexOf(agent => agent.id === action.payload.id)
      const someAgent = state.list[index]
      const updatedAgent = {...someAgent, ...action.payload}
      const admins = [...state.list]
      admins[index] = updatedAgent
      return {
        ...state,
        list: [...state.list, ...admins]
      }
    case (AgentActions.GET_TO_EDIT_AGENT_SUCCESS):
      return {
        ...state,
        toEdit: {...action.payload}
      }
    case (AgentActions.RESET_AGENT_FORM):
      return {
        ...state,
        resetAgentForm: false
      };
    default:
      return state
  }
}
