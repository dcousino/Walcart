import { CartItem } from '../../models/cart-item';
import * as fromCart from '../actions/cart.action';
export interface CartState {
  data: CartItem[];
  loading: boolean;
}

export const initialState: CartState = {
  data: [
    {
      id: 'cart1'
    }
  ],
  loading: false
};

export function reducer(
  state = initialState,
  action: fromCart.CartAction
): CartState {
  switch (action.type) {
    case fromCart.ADD_TO_CART: {
      return {
        ...state,
        loading: true
      };
    }

    default:
      return state;
  }
}
