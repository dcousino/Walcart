import { Action } from '@ngrx/store';
import { Category } from 'src/app/models/category';

export const SET_CURRENT_CATEGORY = '[Products] Sets current category';
export const SET_CURRENT_SUB_CATEGORY = '[Products] Sets current sub category';
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

export class SetCurrentCategory implements Action {
  readonly type = SET_CURRENT_CATEGORY;
  constructor(public payload: Category) {}
}

export class SetCurrentSubCategory implements Action {
  readonly type = SET_CURRENT_SUB_CATEGORY;
  constructor(public payload: Category) {}
}
// action types
export type CategoryAction =
  | LoadCategories
  | LoadCategoriesFail
  | LoadCategoriesSuccess
  | SetCurrentCategory
  | SetCurrentSubCategory;
