import { User } from '../../models/user';
import * as fromUser from '../actions/user.action';
export interface UserState {
  user: User;
  auth: boolean;
  loading: boolean;
}

export const initialState: UserState = {
  user: null,
  auth: false,
  loading: false
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

    default:
      return state;
  }
}
