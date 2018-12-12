import { CognitoUserSession } from 'amazon-cognito-identity-js';
import * as fromAuth from '../actions/auth.action';
import { createFeatureSelector } from '@ngrx/store';
import { ApplicationState } from '.';

export interface AuthState {
  isAuth: boolean;
  token: string;
  loading: boolean;
  error?: any;
  id: string;
}

export const initialState: AuthState = {
  isAuth: false,
  id: null,
  token: null,
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
        loading: true,
        error: null
      };
    }
    case fromAuth.LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        token: action.payload,
        isAuth: true
      };
    }
    case fromAuth.LOGIN_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuth: false
      };
    }
    case fromAuth.REGISTER: {
      return {
        ...state,
        loading: true,
        error: null,
        id: null
      };
    }
    case fromAuth.REGISTER_SUCCESS: {
      return {
        ...state,
        id: action.payload,
        loading: false,
        error: false
      };
    }
    case fromAuth.REGISTER_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload,
        id: null
      };
    }
    case fromAuth.LOGOUT: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case fromAuth.LOGOUT_SUCCESS: {
      return {
        ...state,
        token: null,
        loading: false,
        error: null,
        isAuth: false
      };
    }
    case fromAuth.LOGOUT_FAIL: {
      return {
        ...state,
        error: action.payload,
        // Still clear out auth
        token: null,
        loading: false
      };
    }
    case fromAuth.CONFIRM: {
      return {
        ...state,
        loading: false,
        error: null
      };
    }
    default:
      return state;
  }
}
