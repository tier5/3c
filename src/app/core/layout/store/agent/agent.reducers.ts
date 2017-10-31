import * as AgentActions from './agent.actions';

export interface AgentState {
  info: any,
  list: any,
  resetAgentForm: boolean
}

const initialState: AgentState = {
  info: null,
  list: [],
  resetAgentForm: false
};

export function agentReducer(state = initialState, action: AgentActions.AgentActions) {
    switch (action.type) {
        case (AgentActions.ADD_AGENT_SUCCESS):
            return {
                ...state,
                list: [ ...state.list, action.payload ],
                resetAgentForm: true
            };
        case (AgentActions.GET_AGENT_LIST_SUCCESS):
            return {
                ...state,
                list: action.payload
            };
        case (AgentActions.EDIT_AGENT_SUCCESS):
            const index = state.list.indexOf(agent => agent.id === action.payload.id);
            const someAgent = state.list[index];
            const updatedAgent = { ...someAgent, ...action.payload };
            const admins = [...state.list];
            admins[index] = updatedAgent;
            return {
                ...state,
                list: [ ...state.list, ...admins ]
            };
        default:
            return state;
    }
}
