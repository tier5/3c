import * as AdminActions from './admin.actions';

export interface AdminState {
  info: any,
  list: any,
  toEdit: any,
  resetAdminForm: boolean,
}

const initialState: AdminState = {
  info: null,
  list: [],
  toEdit: {},
  resetAdminForm: false,
};

export function adminReducer(state = initialState, action: AdminActions.AdminActions) {
    switch (action.type) {
    case (AdminActions.ADD_ADMIN_SUCCESS):
      return {
        ...state,
        list: [ ...state.list, action.payload ],
        resetAdminForm: true
      };
    case (AdminActions.EDIT_ADMIN_SUCCESS):
      const index = state.list.indexOf(admin => admin.id === action.payload.id);
      const someAdmin = state.list[index];
      const updatedAdmin = { ...someAdmin, ...action.payload };
      const admins = [...state.list];
      admins[index] = updatedAdmin;
      return {
        ...state,
        list: [ ...state.list, ...admins ]
      };
    case (AdminActions.GET_ADMIN_LIST_SUCCESS):
      return {
        ...state,
        list: action.payload
      };
    case (AdminActions.RESET_ADMIN_FORM):
      return {
        ...state,
        resetAdminForm: false
      };
    case (AdminActions.CREATE_TWILIO_SID_SUCCESS):
      const dataIndex = state.list.findIndex(admin => admin.id === action.payload.id);
      const someAdminData = state.list[dataIndex];
      const updatedAdminData = { ...someAdminData, ...action.payload };
      const adminsData = [...state.list];
      adminsData[dataIndex] = updatedAdminData;
      return {
        ...state,
        list: [...adminsData ]
      };
    case (AdminActions.BLOCK_ADMIN_USER_SUCCESS):
      const blockIndex = state.list.findIndex(admin => admin.id === action.payload.id);
      const someBlockAdmin = state.list[blockIndex];
      const updatedBlockAdmin = { ...someBlockAdmin, ...action.payload };
      const blockAdminData = [...state.list];
      blockAdminData[blockIndex] = updatedBlockAdmin;
      return {
        ...state,
        list: [...blockAdminData ]
      };
    case (AdminActions.UNBLOCK_ADMIN_USER_SUCCESS):
      const unblockIndex = state.list.findIndex(admin => admin.id === action.payload.id);
      const someUnblockAdmins = state.list[unblockIndex];
      const updatedUnblockAdmin = { ...someUnblockAdmins, ...action.payload };
      const unblockAdminData = [...state.list];
      unblockAdminData[unblockIndex] = updatedUnblockAdmin;
      return {
        ...state,
        list: [...unblockAdminData ]
      };
    case (AdminActions.GET_TO_EDIT_ADMIN_SUCCESS):
      return {
        ...state,
        toEdit: { ...action.payload }
      };
    default:
      return state;
  }
}
