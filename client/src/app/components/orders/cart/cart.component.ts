import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartItem } from 'src/app/models/cart-item';
import { ApplicationState } from 'src/app/store';
import {
  RemoveFromCart,
  SaveCart,
  UpdateCartItemQuantity
} from 'src/app/store/actions/cart.action';
import { getCartState } from 'src/app/store/selectors';
import { CreateOrder } from 'src/app/store/actions/order.action';
import { uuidv4 } from 'src/app/uuid';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Order } from 'src/app/models/order';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: CartItem[] = [];
  cartTotal: string = '0.00';
  estimatedShipping: string = '0.00';
  total: string;
  isAuth: boolean;
  constructor(
    private store: Store<ApplicationState>,
    private authSvc: AuthService
  ) {}

  ngOnInit() {
    this.authSvc.isAuthenticated().subscribe(isAuth => (this.isAuth = isAuth));
    this.store.select(getCartState).subscribe(cartState => {
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
    return;
  }
  updateQuantity(id: number, quantity: number): void {
    if (quantity <= 0) {
      this.store.dispatch(new RemoveFromCart(id));
      return;
    }
    this.store.dispatch(new UpdateCartItemQuantity({ id, quantity }));
    return;
  }
  save(): void {
    this.store.dispatch(new SaveCart());
    return;
  }
  checkOut(): void {
    this.store.dispatch(new CreateOrder(this.getOrder()));
    return;
  }

  private getOrder(): Order {
    return {
      id: uuidv4(),
      items: this.items,
      date: new Date(),
      total: this.total,
      shipping: this.estimatedShipping
    };
  }
}
