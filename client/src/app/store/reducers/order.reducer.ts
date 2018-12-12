import { Order } from 'src/app/models/order';
import {
  OrderAction,
  CREATE_ORDER,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL
} from '../actions/order.action';
export interface OrderState {
  currentOrder: Order;
  orderHistory: Order[];
  loading: boolean;
  error?: any;
}

export const initialState: OrderState = {
  currentOrder: null,
  orderHistory: [],
  loading: false
};

export function reducer(state = initialState, action: OrderAction): OrderState {
  switch (action.type) {
    case CREATE_ORDER: {
      return {
        ...state,
        loading: true,
        currentOrder: action.payload,
        error: undefined
      };
    }
    case CREATE_ORDER_SUCCESS: {
      return {
        ...state,
        loading: false
      };
    }
    case CREATE_ORDER_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    default:
      return state;
  }
}
