import { createFeatureSelector } from '@ngrx/store';
import { UserState } from './reducers/user.reducer';
import { ProductState } from './reducers/product.reducer';
import { AuthState } from './reducers/auth.reducer';
import { CartState } from './reducers/cart.reducer';
import { CategoryState } from './reducers/category.reducter';

export const getCartState = createFeatureSelector<CartState>('cart');
export const getAuthState = createFeatureSelector<AuthState>('auth');
export const getProductState = createFeatureSelector<ProductState>('products');
export const getUserState = createFeatureSelector<UserState>('user');
export const getCategoryState = createFeatureSelector<CategoryState>(
  'categories'
);
