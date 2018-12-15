import { Action } from '@ngrx/store';
import { Category } from 'src/app/models/category';
import { Order } from 'src/app/models/order';

export const CREATE_ORDER = '[Order] Create new order';
export const CREATE_ORDER_SUCCESS = '[Order] Create new order success';
export const CREATE_ORDER_FAIL = '[Order] Create new order fail';
export const CREATE_ORDER_HISTORY = '[Order] Create new order history';
export const CREATE_ORDER_HISTORY_SUCCESS =
  '[Order] Create new order history success';
export const CREATE_ORDER_HISTORY_FAIL =
  '[Order] Create new order history fail';
export const LOAD_ORDER_HISTORY = '[Order] Load order history from database';
export class CreateOrder implements Action {
  readonly type = CREATE_ORDER;
  constructor(public payload: Order) {}
}

export class CreateOrderSuccess implements Action {
  readonly type = CREATE_ORDER_SUCCESS;
}

export class CreateOrderFail implements Action {
  readonly type = CREATE_ORDER_FAIL;
  constructor(public payload: any) {}
}

export class CreateOrderHistory implements Action {
  readonly type = CREATE_ORDER_HISTORY;
  constructor(public payload: Order) {}
}

export class CreateOrderHistorySuccess implements Action {
  readonly type = CREATE_ORDER_HISTORY_SUCCESS;
}

export class CreateOrderHistoryFail implements Action {
  readonly type = CREATE_ORDER_HISTORY_FAIL;
  constructor(public payload: any) {}
}

export class LoadOrderHistory implements Action {
  readonly type = LOAD_ORDER_HISTORY;
  constructor(public payload: Order[]) {}
}

// action types
export type OrderAction =
  | CreateOrder
  | CreateOrderSuccess
  | CreateOrderFail
  | CreateOrderHistory
  | CreateOrderHistorySuccess
  | CreateOrderHistoryFail
  | LoadOrderHistory;
