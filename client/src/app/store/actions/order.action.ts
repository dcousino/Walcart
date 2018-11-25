import { Action } from '@ngrx/store';
import { Category } from 'src/app/models/category';

export const NEW_ORDER = '[Products] Load Categories';
export const UPDATE_ORDER = '[Products] Load Categories Fail';
export const COMPLETE_ORDER = '[Products] Load Categories Success';

export class NewOrder implements Action {
  readonly type = NEW_ORDER;
}

export class UpdateOrder implements Action {
  readonly type = UPDATE_ORDER;
  constructor(public payload: any) {}
}

export class CompleteOrder implements Action {
  readonly type = COMPLETE_ORDER;
  constructor(public payload: Category[]) {}
}

// action types
export type OrderAction = NewOrder | UpdateOrder | CompleteOrder;
