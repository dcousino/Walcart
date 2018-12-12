import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { RouterReducerState, RouterStateSerializer } from '@ngrx/router-store';
import * as fromCategories from './category.reducer';
import * as fromUser from './user.reducer';
import * as fromProduct from './product.reducer';
import * as fromCart from './cart.reducer';
import * as fromAuth from './auth.reducer';
import * as fromOrder from './order.reducer';

export interface ApplicationState {
  user: fromUser.UserState;
  cart: fromCart.CartState;
  products: fromProduct.ProductState;
  auth: fromAuth.AuthState;
  categories: fromCategories.CategoryState;
  orders: fromOrder.OrderState;
}

export const reducers: ActionReducerMap<ApplicationState> = {
  cart: fromCart.reducer,
  user: fromUser.reducer,
  products: fromProduct.reducer,
  auth: fromAuth.reducer,
  categories: fromCategories.reducer,
  orders: fromOrder.reducer
};
