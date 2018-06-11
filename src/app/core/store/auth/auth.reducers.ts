import * as AuthActions from './auth.actions';

export interface State {
  token: string;
  registered: boolean;
  resetForgotPasswordForm: boolean;
  isAuthenticated: boolean;
  name: string;
  email: string;
  userId: number;
  userType: number;
  twilioIsActive: boolean;
  isSuperAdmin: boolean;
  isAdmin: boolean;
  isAgent: boolean;
}

const initialState: State = {
  token: null,
  registered: false,
  resetForgotPasswordForm: false,
  isAuthenticated: false,
  name: null,
  email: null,
  userId: null,
  userType: null,
  twilioIsActive: false,
  isSuperAdmin: false,
  isAdmin: false,
  isAgent: false
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case (AuthActions.SIGNUP_SUCCESS):
      return {
        ...state,
        registered: action.payload
      };
    case (AuthActions.FORGOT_PASSWORD_SUCCESS):
      return {
        ...state,
        resetForgotPasswordForm: action.payload
      };
    case (AuthActions.SIGNIN_SUCCESS):
      localStorage.setItem('data', JSON.stringify(action.payload));
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.userToken,
        userId: action.payload.userId,
        userType: action.payload.userType,
        isSuperAdmin: action.payload.userType == 1,
        isAdmin: action.payload.userType == 2,
        isAgent: action.payload.userType == 3,
        name: action.payload.firstName + ' ' + action.payload.lastName,
        email: action.payload.email
      };
    case (AuthActions.SIGNOUT_SUCCESS):
      localStorage.removeItem('data');
      return {
        ...state,
        token: null,
        userId: null,
        userType: null,
        isSuperAdmin: false,
        isAdmin: false,
        isAgent: false,
        isAuthenticated: false,
      };
    case (AuthActions.CHECK_TOKEN):
      if(localStorage.getItem('data') !== null && localStorage.getItem('data') !== undefined) {
        const data = JSON.parse(localStorage.getItem('data'));
        return {
          ...state,
          isAuthenticated: true,
          token: data.userToken,
          userId: data.userId,
          userType: data.userType,
          isSuperAdmin: data.userType == 1,
          isAdmin: data.userType == 2,
          isAgent: data.userType == 3,
          name: data.firstName + ' ' + data.lastName,
          email: data.email
        }
      } else {
        return state;
      }
    case (AuthActions.CHECK_TWILIO_ACTIVE_SUCCESS):
      return {
        ...state,
        twilioIsActive: action.payload
      }
    case (AuthActions.UPDATE_ATTEMPT):
      const data = JSON.parse(localStorage.getItem('data'));
      const obj = {
        email : data.email,
        firstName : action.payload.firstName,
        lastName : action.payload.lastName,
        userId : data.userId,
        userToken : data.userToken,
        userType : data.userType
      };
      localStorage.removeItem('data');
      localStorage.setItem('data', JSON.stringify(obj));
      return {
        ...state,
        name: action.payload.firstName + ' ' + action.payload.lastName,
      }
    default:
      return state;
  }
}
