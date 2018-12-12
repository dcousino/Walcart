import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'src/app/store';
import { getUserState } from 'src/app/store/selectors';
import {
  User,
  BillingAddress,
  DeliveryAddress,
  Address
} from 'src/app/models/user';
import { BehaviorSubject } from 'rxjs';
import {
  UpdateUserWithId,
  UpdateUser
} from 'src/app/store/actions/user.action';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private store: Store<ApplicationState>) {}
  customerName: string;
  gravatar: string;
  viewN = new BehaviorSubject<string>('basic');
  user: User;
  view: string;

  ngOnInit() {
    this.viewN.subscribe(view => {
      this.view = view;
    });
    this.store.select(getUserState).subscribe(userState => {
      if (userState.user) {
        this.customerName = `${userState.user.firstName} ${
          userState.user.lastName
        }`;
        this.user = userState.user;
      }
    });
  }
  updateUser() {
    this.store.dispatch(new UpdateUser(this.user));
  }
  setView(view: string): void {
    this.viewN.next(view);
  }
  onSubmitBasicInfo(user: User) {
    this.user = {
      ...this.user,
      firstName: user.firstName,
      lastName: user.lastName
    };

    this.updateUser();
  }
  onSubmitAddress(address: Address): void {
    if (address.type === 'BillingAddress') {
      if (address.isSameAsDeliveryAddress) {
        this.user.billingAddress = this.cloneDeliveryAddressToBillingAddress();
      } else {
        this.user.billingAddress = address;
      }
    } else {
      this.user.deliveryAddress = address;
    }

    this.updateUser();
  }

  private cloneDeliveryAddressToBillingAddress(): Address {
    return {
      type: 'BillingAddress',
      deliverToFirstName: this.user.deliveryAddress.deliverToFirstName,
      deliverToLastName: this.user.deliveryAddress.deliverToLastName,
      addressLine1: this.user.deliveryAddress.addressLine1,
      addressLine2: this.user.deliveryAddress.addressLine2,
      country: this.user.deliveryAddress.country,
      city: this.user.deliveryAddress.city,
      state: this.user.deliveryAddress.state,
      zip: this.user.deliveryAddress.zip,
      isSameAsDeliveryAddress: true
    };
  }
}
