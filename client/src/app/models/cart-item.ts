import { ProductItem } from './product-page/product-item';
export interface CartItem extends ProductItem {
  quantity: number;
  totalCost: number;
}
