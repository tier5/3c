import * as ProfileActions from './profile.actions';

export interface ProfileState {
  data: any
}

const initialState: ProfileState = {
  data: null
};

export function profileReducer(state = initialState, action: ProfileActions.ProfileActions) {
  switch (action.type) {
    case (ProfileActions.GET_PROFILE_SUCCESS):
      return {
        ...state,
        data: action.payload
      };
    case (ProfileActions.EDIT_PROFILE_SUCCESS):
      return {
        ...state
      };
    default:
      return state;
  }
}

