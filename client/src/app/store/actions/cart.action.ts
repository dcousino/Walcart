import { Action } from '@ngrx/store';
import { CartItem } from 'src/app/models/cart-item';

export const NEW_CART = '[Cart] New cart';
export const ADD_TO_CART = '[Cart] Add to cart';
export const REMOVE_FROM_CART = '[Cart] Remove from cart';
export const UPDATE_CART = '[Cart] Update cart';
export const SAVE_CART = '[Cart] Save cart';
export const CLEAR_CART = '[Cart] Clear cart';

export class NewCart implements Action {
  readonly type = NEW_CART;
}

export class AddToCart implements Action {
  readonly type = ADD_TO_CART;
}

export class RemoveFromCart implements Action {
  readonly type = REMOVE_FROM_CART;
  constructor(public payload: any) {}
}

export class UpdateCart implements Action {
  readonly type = UPDATE_CART;
  constructor(public payload: CartItem[]) {}
}

export class ClearCart implements Action {
  readonly type = CLEAR_CART;
}

// action types
export type CartAction =
  | NewCart
  | AddToCart
  | RemoveFromCart
  | UpdateCart
  | ClearCart;
