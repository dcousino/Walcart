import { User } from '../../models/user';
import * as fromUser from '../actions/user.action';
export interface UserState {
  data: User;
  auth: boolean;
  loading: boolean;
}

export const initialState: UserState = {
  data: {
    firstName: 'Daniel',
    lastName: 'Cousino',
    email: 'Daniel.cousinoa',
    password: 'asdf'
  },
  auth: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromUser.UserAction
): UserState {
  switch (action.type) {
    case fromUser.LOGIN: {
      return {
        ...state,
        loading: true
      };
    }
    case fromUser.LOGIN_SUCCESS: {
      return {
        ...state,
        auth: true,
        loading: false
      };
    }
    case fromUser.LOGIN_FAIL: {
      return {
        ...state,
        auth: false,
        loading: false
      };
    }
    default:
      return state;
  }
}
