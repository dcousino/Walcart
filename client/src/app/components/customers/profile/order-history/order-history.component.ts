import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'src/app/store';
import { getOrderState } from 'src/app/store/selectors';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  constructor(private store: Store<ApplicationState>) {}
  orderHistory: Order[];
  ngOnInit() {
    this.store
      .select(getOrderState)
      .subscribe(orderState => (this.orderHistory = orderState.orderHistory));
  }
}
