import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Order } from 'src/app/models/order';
import { User } from 'src/app/models/user';
import { ApplicationState } from 'src/app/store';
import { getOrderState, getUserState } from 'src/app/store/selectors';
import { AddressDetailsComponent } from '../../customers/profile/address-details/address-details.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  constructor(private store: Store<ApplicationState>) {}
  @ViewChild(AddressDetailsComponent) address: AddressDetailsComponent;
  user: User;
  order: Order = {
    id: '',
    items: [],
    total: '',
    date: new Date(),
    shipping: ''
  };
  ngOnInit() {
    this.store
      .select(getUserState)
      .subscribe(userState => (this.user = userState.user));
    this.store
      .select(getOrderState)
      .subscribe(orderState => (this.order = orderState.currentOrder));
  }
}
