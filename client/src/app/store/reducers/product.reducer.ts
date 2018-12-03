import { Product } from '../../models/product';
import * as fromProduct from '../actions/product.action';
import { ProductPage } from 'src/app/models/product-page/product-page';
import { Action } from '@ngrx/store';
import { stat } from 'fs';

export interface ProductState {
  pages: ProductPage[];
  loading: boolean;
  error?: any;
  currentPage: number;
}

export const initialState: ProductState = {
  pages: [],
  loading: false,
  currentPage: 0
};

export function reducer(
  state = initialState,
  action: fromProduct.ProductAction
): ProductState {
  switch (action.type) {
    case fromProduct.LOAD_INITIAL_PRODUCT_PAGE: {
      return {
        ...state,
        loading: true,
        error: undefined
      };
    }
    case fromProduct.LOAD_INITIAL_PRODUCT_PAGE_SUCCESS: {
      return {
        ...state,
        loading: false,
        pages: [action.payload],
        error: undefined
      };
    }
    case fromProduct.LOAD_INITIAL_PRODUCT_PAGE_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    case fromProduct.LOAD_NEXT_PRODUCT_PAGE: {
      return {
        ...state,
        loading: true,
        error: undefined
      };
    }
    case fromProduct.LOAD_NEXT_PRODUCT_PAGE_SUCCESS: {
      if (state.pages.includes(action.payload)) {
        return {
          ...state,
          loading: false,
          currentPage: +action.payload.pageNumber,
          error: undefined
        };
      } else {
        return {
          ...state,
          loading: false,
          pages: [...state.pages, action.payload],
          currentPage: +action.payload.pageNumber,
          error: undefined
        };
      }
    }
    case fromProduct.LOAD_NEXT_PRODUCT_PAGE_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    case fromProduct.LOAD_PREVIOUS_PRODUCT_PAGE: {
      return {
        ...state,
        loading: true
      };
    }
    case fromProduct.LOAD_PREVIOUS_PRODUCT_PAGE_SUCCESS: {
      return {
        ...state,
        loading: false,
        currentPage: action.payload
      };
    }
    case fromProduct.LOAD_PREVIOUS_PRODUCT_PAGE_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    default:
      return state;
  }
}
export const getNextPageNumber = (state: ProductState) => {
  return state.pages.length.toString();
};
