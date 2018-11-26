import { Action } from '@ngrx/store';
import { Category } from 'src/app/models/category';

export const LOAD_CATEGORIES = '[Products] Load Categories';
export const LOAD_CATEGORIES_FAIL = '[Products] Load Categories Fail';
export const LOAD_CATEGORIES_SUCCESS = '[Products] Load Categories Success';

export class LoadCategories implements Action {
  readonly type = LOAD_CATEGORIES;
}

export class LoadCategoriesFail implements Action {
  readonly type = LOAD_CATEGORIES_FAIL;
  constructor(public payload: any) {}
}

export class LoadCategoriesSuccess implements Action {
  readonly type = LOAD_CATEGORIES_SUCCESS;
  constructor(public payload: Category[]) {}
}

// action types
export type CategoryAction =
  | LoadCategories
  | LoadCategoriesFail
  | LoadCategoriesSuccess;
