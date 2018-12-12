import { CartItem } from '../../models/cart-item';
import * as fromCart from '../actions/cart.action';
export interface CartState {
  cart: CartItem[];
  id: string;
  loading: boolean;
}

export const initialState: CartState = {
  id: '',
  cart: [],
  loading: false
};

export function reducer(
  state = initialState,
  action: fromCart.CartAction
): CartState {
  switch (action.type) {
    case fromCart.ADD_TO_CART: {
      if (state.cart.some(item => item.itemId === action.payload.itemId)) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.itemId === action.payload.itemId
              ? {
                  ...item,
                  quantity: ++item.quantity,
                  totalCost: item.quantity * item.salePrice
                }
              : item
          )
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, action.payload]
        };
      }
    }
    case fromCart.REMOVE_FROM_CART: {
      return {
        ...state,
        cart: state.cart.filter(item => item.itemId !== action.payload)
      };
    }
    case fromCart.UPDATE_CART_ITEM_QUANTITY: {
      console.log(action.payload);

      return {
        ...state,
        cart: state.cart.map(item =>
          item.itemId === action.payload.id
            ? {
                ...item,
                quantity: action.payload.quantity,
                totalCost: action.payload.quantity * item.salePrice
              }
            : item
        )
      };
    }
    default:
      return state;
  }
}
