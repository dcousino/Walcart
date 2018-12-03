import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'src/app/store';
import { Product } from 'src/app/models/product';
import { ProductItem } from 'src/app/models/product-page/product-item';
import {
  RemoveFromCart,
  UpdateCartItemQuantity
} from 'src/app/store/actions/cart.action';
import { CartItem } from 'src/app/models/cart-item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: CartItem[];
  cartTotal: string = '0.00';
  estimatedShipping: string = '0.00';
  total: string;
  constructor(private store: Store<ApplicationState>) {}

  ngOnInit() {
    this.store.select('cart').subscribe(cartState => {
      this.items = cartState.cart;
      if (this.items.length > 0) {
        this.cartTotal = this.items
          .map(item => item.totalCost)
          .reduce((total, item) => total + item)
          .toFixed(2);

        this.estimatedShipping = Math.max(
          ...this.items.map(item => item.standardShipRate)
        ).toFixed(2);

        this.total = (+this.cartTotal + +this.estimatedShipping).toFixed(2);
      } else {
        this.cartTotal = '0.00';
        this.estimatedShipping = '0.00';
        this.total = '0.00';
      }
    });
  }

  removeItem(id: number): void {
    this.store.dispatch(new RemoveFromCart(id));
  }
  updateQuantity(id: number, quantity: number): void {
    this.store.dispatch(new UpdateCartItemQuantity({ id, quantity }));
  }
}
