import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector
} from '@ngrx/store';
import {
  RouterReducerState,
  routerReducer,
  RouterStateSerializer
} from '@ngrx/router-store';
import * as fromCategories from './category.reducter';
import * as fromUser from './user.reducer';
import * as fromProduct from './product.reducer';
import * as fromCart from './cart.reducer';
import * as fromAuth from './auth.reducer';
import {
  Params,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface ApplicationState {
  user: fromUser.UserState;
  cart: fromCart.CartState;
  products: fromProduct.ProductState;
  auth: fromAuth.AuthState;
  categories: fromCategories.CategoryState;
}

export const reducers: ActionReducerMap<ApplicationState> = {
  cart: fromCart.reducer,
  user: fromUser.reducer,
  products: fromProduct.reducer,
  auth: fromAuth.reducer,
  categories: fromCategories.reducer
};

export const getRouterState = createFeatureSelector<
  RouterReducerState<RouterStateUrl>
>('router');

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot) {
    const { url } = routerState;
    const { queryParams } = routerState.root;
    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }

    const params = state.params;

    return { url, queryParams, params };
  }
}
export const getAuthState = createFeatureSelector<fromAuth.AuthState>('auth');
export const getProductState = createFeatureSelector<fromProduct.ProductState>(
  'product'
);
export const getCategoryState = createFeatureSelector<
  fromCategories.CategoryState
>('categories');
