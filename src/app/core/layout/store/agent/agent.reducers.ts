import * as AgentActions from './agent.actions';

export interface AgentState {
  info: any;
  list: any;
  toEdit: any;
  //resetAgentForm: boolean;
  comapnyList: any;
  blockAgent: boolean;
  unblockAgent: boolean;
  newAgentInfo:any;
}

const initialState: AgentState = {
  info: null,
  list: [],
  toEdit: {},
  //resetAgentForm: false,
  comapnyList: [],
  blockAgent: false,
  unblockAgent: false,
  newAgentInfo:[],
};

export function agentReducer(state = initialState, action: AgentActions.AgentActions) {
  switch (action.type) {
    case (AgentActions.ADD_AGENT_SUCCESS):
      return {
        ...state,
        list: [...state.list, action.payload],
        //resetAgentForm: true,
        newAgentInfo:action.payload
      };
    case (AgentActions.GET_AGENT_LIST_SUCCESS):
      return {
        ...state,
        list: action.payload
      };
    case (AgentActions.EDIT_AGENT_SUCCESS):
      const index = state.list.indexOf(agent => agent.id === action.payload.id);
      const someAgent = state.list[index];
      const updatedAgent = {...someAgent, ...action.payload};
      const admins = [...state.list];
      admins[index] = updatedAgent;
      return {
        ...state,
        list: [...state.list, ...admins]
      };
    case (AgentActions.GET_TO_EDIT_AGENT_SUCCESS):
      return {
        ...state,
        toEdit: {...action.payload}
      };
    case (AgentActions.RESET_AGENT_FORM):
      return {
        ...state,
        //resetAgentForm: false
      };
    case (AgentActions.GET_ADMIN_AGENT_LIST_SUCCESS):
      return {
        ...state,
        list: action.payload
      };
    case (AgentActions.GET_COMPANY_LIST_SUCCESS):
      return {
        ...state,
        comapnyList: action.payload
      };
    case (AgentActions.AGENT_BLOCK_SUCCESS):
      const unblockIndex = state.list.findIndex(admin => admin.id === action.payload.id);
      const someUnblockAdmins = state.list[unblockIndex];
      const updatedUnblockAdmin = { ...someUnblockAdmins, ...action.payload };
      const unblockAdminData = [...state.list];
      unblockAdminData[unblockIndex] = updatedUnblockAdmin;
      return {
        ...state,
        list: [...unblockAdminData ]
      };
    case (AgentActions.AGENT_UNBLOCK_SUCCESS):
      const unblockIndex1 = state.list.findIndex(admin => admin.id === action.payload.id);
      const someUnblockAdmins1 = state.list[unblockIndex1];
      const updatedUnblockAdmin1 = { ...someUnblockAdmins1, ...action.payload };
      const unblockAdminData1 = [...state.list];
      unblockAdminData1[unblockIndex1] = updatedUnblockAdmin1;
      return {
        ...state,
        list: [...unblockAdminData1 ]
      };
    case (AgentActions.AGENT_DELETE_SUCCESS):
      const deleteIndex = state.list.findIndex(admin => admin.id === action.payload);
      const deleteAdminData = [...state.list];
      deleteAdminData.splice(deleteIndex, 1);
      return {
        ...state,
        list: [...deleteAdminData ]
      };
    default:
      return state;
  }
}
