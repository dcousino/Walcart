import { CognitoUserSession } from 'amazon-cognito-identity-js';
import * as fromAuth from '../actions/auth.action';

export interface AuthState {
  auth: CognitoUserSession;
  loading: boolean;
  error?: any;
}

export const initialState: AuthState = {
  auth: null,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromAuth.AuthAction
): AuthState {
  switch (action.type) {
    case fromAuth.LOGIN: {
      return {
        ...state,
        loading: true
      };
    }
    case fromAuth.LOGIN_SUCCESS: {
      return {
        ...state,
        auth: action.payload,
        loading: false
      };
    }
    case fromAuth.LOGIN_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    case fromAuth.LOGOUT: {
      return {
        ...state,
        loading: true
      };
    }
    case fromAuth.LOGOUT_SUCCESS: {
      return {
        ...state,
        auth: null,
        loading: false
      };
    }
    case fromAuth.LOGOUT_FAIL: {
      return {
        ...state,
        error: action.payload,
        // Still clear out auth
        auth: null,
        loading: false
      };
    }
    case fromAuth.CONFIRM: {
      return {
        ...state,
        loading: false
      };
    }
    default:
      return state;
  }
}

export const getAuth = (state: AuthState) => state.auth;
