import { LOGOUT_SUCCESS } from '../actions';
export function clearState(reducer) {
  return function(state, action) {
    if (action.type === LOGOUT_SUCCESS) {
      state = undefined;
    }

    return reducer(state, action);
  };
}
