import { AuthEffects } from './auth.effect';
import { CategoryEffects } from './category.effect';
import { ProductEffects } from './product.effect';
import { CartEffects } from './cart.effect';
import { UserEffects } from './user.effect';
import { OrderEffects } from './order.effect';
export const effects: any[] = [
  AuthEffects,
  CategoryEffects,
  ProductEffects,
  CartEffects,
  UserEffects,
  OrderEffects
];
export * from './auth.effect';
export * from './category.effect';
export * from './product.effect';
export * from './cart.effect';
export * from './user.effect';
export * from './order.effect';
