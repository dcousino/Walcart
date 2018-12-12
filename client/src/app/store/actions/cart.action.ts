import { Action } from '@ngrx/store';
import { CartItem } from 'src/app/models/cart-item';
import { Cart } from 'src/app/models/cart';

export const ADD_TO_CART = '[Cart] Add to cart';
export const REMOVE_FROM_CART = '[Cart] Remove from cart';
export const UPDATE_CART_ITEM_QUANTITY = '[Cart] Update cart item quantity';
export const SAVE_CART = '[Cart] Save cart';
export const SAVE_CART_SUCCESS = '[Cart] Save cart success';
export const SAVE_CART_FAIL = '[Cart] Save cart fail';
export const CLEAR_CART = '[Cart] Clear cart';
export const LOAD_CART = '[Cart] Load cart on login';

export class AddToCart implements Action {
  readonly type = ADD_TO_CART;
  constructor(public payload: CartItem) {}
}

export class RemoveFromCart implements Action {
  readonly type = REMOVE_FROM_CART;
  constructor(public payload: number) {}
}

export class UpdateCartItemQuantity implements Action {
  readonly type = UPDATE_CART_ITEM_QUANTITY;
  constructor(public payload: any) {}
}

export class ClearCart implements Action {
  readonly type = CLEAR_CART;
}

export class SaveCart implements Action {
  readonly type = SAVE_CART;
}

export class SaveCartSuccess implements Action {
  readonly type = SAVE_CART_SUCCESS;
}

export class SaveCartFail implements Action {
  readonly type = SAVE_CART_FAIL;
  constructor(public payload: any) {}
}

export class LoadCart implements Action {
  readonly type = LOAD_CART;
  constructor(public payload: CartItem[]) {}
}

// action types
export type CartAction =
  | SaveCart
  | SaveCartSuccess
  | SaveCartFail
  | AddToCart
  | RemoveFromCart
  | UpdateCartItemQuantity
  | ClearCart
  | LoadCart;
