import { Action } from '@ngrx/store';
import { ProductPage } from 'src/app/models/product-page/product-page';

export const LOAD_INITIAL_PRODUCT_PAGE = '[Products] Load intial product page';
export const LOAD_INITIAL_PRODUCT_PAGE_FAIL =
  '[Products] Load intial product page fail';
export const LOAD_INITIAL_PRODUCT_PAGE_SUCCESS =
  '[Products] Load intial product page success';
export const LOAD_NEXT_PRODUCT_PAGE = '[Products] Load next product page';
export const LOAD_NEXT_PRODUCT_PAGE_FAIL =
  '[Products] Load next product page fail';
export const LOAD_NEXT_PRODUCT_PAGE_SUCCESS =
  '[Products] Load next product page success';
export const LOAD_PREVIOUS_PRODUCT_PAGE =
  '[Products] Loads previous product page';
export const LOAD_PREVIOUS_PRODUCT_PAGE_SUCCESS =
  '[Products] Loads previous product page success';
export const LOAD_PREVIOUS_PRODUCT_PAGE_FAIL =
  '[Products] Loads previous product page failed';

export class LoadInitialProductPage implements Action {
  readonly type = LOAD_INITIAL_PRODUCT_PAGE;
  constructor(public payload: string) {}
}

export class LoadInitialProductPageFail implements Action {
  readonly type = LOAD_INITIAL_PRODUCT_PAGE_FAIL;
  constructor(public payload: any) {}
}

export class LoadInitialProductPageSuccess implements Action {
  readonly type = LOAD_INITIAL_PRODUCT_PAGE_SUCCESS;
  constructor(public payload: ProductPage) {}
}

export class LoadNextProductPage implements Action {
  readonly type = LOAD_NEXT_PRODUCT_PAGE;
  constructor(public payload: string) {}
}

export class LoadNextProductPageFail implements Action {
  readonly type = LOAD_NEXT_PRODUCT_PAGE_FAIL;
  constructor(public payload: any) {}
}

export class LoadNextProductPageSuccess implements Action {
  readonly type = LOAD_NEXT_PRODUCT_PAGE_SUCCESS;
  constructor(public payload: ProductPage) {}
}

export class LoadPreviousPage implements Action {
  readonly type = LOAD_PREVIOUS_PRODUCT_PAGE;
}

export class LoadPreviousPageSuccess implements Action {
  readonly type = LOAD_PREVIOUS_PRODUCT_PAGE_SUCCESS;
  constructor(public payload: number) {}
}

export class LoadPreviousPageFail implements Action {
  readonly type = LOAD_PREVIOUS_PRODUCT_PAGE_FAIL;
  constructor(public payload: any) {}
}

// action types
export type ProductAction =
  | LoadInitialProductPage
  | LoadInitialProductPageFail
  | LoadInitialProductPageSuccess
  | LoadNextProductPage
  | LoadNextProductPageFail
  | LoadNextProductPageSuccess
  | LoadPreviousPage
  | LoadPreviousPageSuccess
  | LoadPreviousPageFail;
