import * as ProfileActions from './profile.actions';

export interface ProfileState {
  data: any;
  formLoader: boolean;
  resetChangePasswordForm: boolean;
}

const initialState: ProfileState = {
  data: null,
  formLoader: false,
  resetChangePasswordForm: false
};

export function profileReducer(state = initialState, action: ProfileActions.ProfileActions) {
  switch (action.type) {
    case (ProfileActions.GET_PROFILE_SUCCESS):
      return {
        ...state,
        data: { ...action.payload }
      };
    case (ProfileActions.EDIT_PROFILE_SUCCESS):
      return {
        ...state,
        data: { ...action.payload },
        formLoader: true,
      };
    case (ProfileActions.EDIT_PROFILE_CHANGE_PASSWORD_SUCCESS):
      return {
        ...state,
        resetChangePasswordForm: action.payload
      };
    default:
      return state;
  }
}

