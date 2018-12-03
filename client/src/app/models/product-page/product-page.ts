import { ProductItem } from './product-item';

export interface ProductPage {
  category: string;
  format: string;
  maxId?: string;
  nextPage: string;
  totalPages: string;
  items: ProductItem[];
  pageNumber?: string;
}
