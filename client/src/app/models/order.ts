import { CartItem } from './cart-item';
import { Address } from './user';

export interface Order {
  id: string;
  items: CartItem[];
  shipping: string;
  total: string;
  date: Date;
  deliveryAddress?: Address;
  billingAddress?: Address;
}
