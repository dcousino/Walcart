import { CartItem } from './cart-item';

export interface Order {
  id: string;
  items: CartItem[];
  shipping: string;
  total: string;
  date: Date;
}
