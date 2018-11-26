import { Product } from '../../models/product';
import * as fromProduct from '../actions/product.action';

export interface ProductState {
  data: Product[];
  loading: boolean;
}

export const initialState: ProductState = {
  data: [
    {
      name: 'pickels',
      id: '1213',
      imgLg: 'img',
      imgMd: 'asf',
      imgSm: 'adf',
      price: 1.2,
      unit: 'jar',
      desc: 'Dill pickels'
    }
  ],
  loading: false
};

export function reducer(
  state = initialState,
  action: fromProduct.ProductAction
): ProductState {
  switch (action.type) {
    case fromProduct.LOAD_PRODUCTS: {
      return {
        ...state,
        loading: true
      };
    }
    case fromProduct.LOAD_PRODUCTS_SUCCESS: {
      return {
        ...state,
        loading: false
      };
    }
    case fromProduct.LOAD_PRODUCTS_SUCCESS: {
      return {
        ...state,
        loading: false
      };
    }
    default:
      return state;
  }
}
