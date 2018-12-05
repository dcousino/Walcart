import { User } from '../../models/user';
import * as fromUser from '../actions/user.action';
import { error } from '@angular/compiler/src/util';
export interface UserState {
  user: User;
  auth: boolean;
  loading: boolean;
  error: any;
  persisted: boolean;
}

export const initialState: UserState = {
  user: null,
  auth: false,
  loading: false,
  error: null,
  persisted: false
};

export function reducer(
  state = initialState,
  action: fromUser.UserAction
): UserState {
  switch (action.type) {
    case fromUser.NEW_TEMP_USER: {
      return {
        ...state,
        loading: false,
        user: action.payload
      };
    }
    case fromUser.UPDATE_USER_WITH_ID: {
      console.log('user', state.user);
      console.log('id', action.payload);

      return {
        ...state,
        loading: false,
        user: { ...state.user, id: action.payload }
      };
    }
    case fromUser.PERSIST_USER: {
      return {
        ...state,
        loading: true,
        persisted: false
      };
    }
    case fromUser.PERSIST_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        persisted: action.payload
      };
    }
    case fromUser.PERSIST_USER_FAIL: {
      return {
        ...state,
        loading: false,
        persisted: false,
        error: action.payload
      };
    }
    default:
      return state;
  }
}
