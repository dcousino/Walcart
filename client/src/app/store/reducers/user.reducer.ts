import { User } from '../../models/user';
import * as fromUser from '../actions/user.action';
export interface UserState {
  user: User;
  loading: boolean;
  error: any;
}

export const initialState: UserState = {
  user: null,
  loading: false,
  error: null
};

export function reducer(
  state = initialState,
  action: fromUser.UserAction
): UserState {
  switch (action.type) {
    case fromUser.CREATE_OR_LOAD_USER: {
      return {
        ...state,
        loading: true
      };
    }
    case fromUser.CREATE_OR_LOAD_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        user: action.payload
      };
    }
    case fromUser.CREATE_OR_LOAD_USER_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    case fromUser.UPDATE_USER: {
      return {
        ...state,
        loading: true,
        user: action.payload
      };
    }
    case fromUser.UPDATE_USER_SUCCESS: {
      return {
        ...state,
        loading: false
      };
    }
    case fromUser.UPDATE_USER_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    case fromUser.UPDATE_USER_WITH_ID: {
      return {
        ...state,
        loading: false,
        user: { ...state.user, id: action.payload }
      };
    }

    default:
      return state;
  }
}
