import { Action } from '@ngrx/store';
import { Category } from 'src/app/models/category';
import { Order } from 'src/app/models/order';

export const CREATE_ORDER = '[Order] Create new order';
export const CREATE_ORDER_SUCCESS = '[Order] Create new order success';
export const CREATE_ORDER_FAIL = '[Order] Create new order fail';

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

// action types
export type OrderAction = CreateOrder | CreateOrderSuccess | CreateOrderFail;
