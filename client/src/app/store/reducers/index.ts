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

export interface ApplicatonState {
  user: fromUser.UserState;
  cart: fromCart.CartState;
  products: fromProduct.ProductState;
  auth: fromAuth.AuthState;
  router: RouterReducerState<RouterStateUrl>;
  categories: fromCategories.CategoryState;
}

export const reducers: ActionReducerMap<ApplicatonState> = {
  cart: fromCart.reducer,
  user: fromUser.reducer,
  products: fromProduct.reducer,
  auth: fromAuth.reducer,
  router: routerReducer,
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

export const getAuth = createSelector(
  getAuthState,
  (state: fromAuth.AuthState) => state.auth
);
