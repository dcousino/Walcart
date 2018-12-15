import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Order } from 'src/app/models/order';
import { BillingAddress, User } from 'src/app/models/user';
import { ApplicationState } from 'src/app/store';
import { getOrderState, getUserState } from 'src/app/store/selectors';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorModalComponent } from '../../alerts/error-modal/error-modal.component';
import { NotificationModalComponent } from '../../alerts/notification-modal/notification-modal.component';
import { CreateOrderHistory } from 'src/app/store/actions/order.action';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, AfterViewInit {
  constructor(
    private store: Store<ApplicationState>,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {}
  formErrors: ValidationErrors[];
  checkoutForm: FormGroup;
  user: User;
  order: Order = {
    id: '',
    items: [],
    total: '',
    date: new Date(),
    shipping: ''
  };
  paymentType: string = 'creditcard';
  billingIsSameAsDelivery: boolean = false;
  get paymentForm() {
    return (this.checkoutForm.get('payment') as FormGroup).controls;
  }
  get isInvalid() {
    return this.checkoutForm.invalid;
  }
  ngOnInit() {
    this.store.select(getUserState).subscribe(userState => {
      this.user = userState.user;
      this.billingIsSameAsDelivery = (userState.user
        .billingAddress as BillingAddress).isSameAsDeliveryAddress;
    });
    this.store
      .select(getOrderState)
      .subscribe(orderState => (this.order = orderState.currentOrder));
    this.checkoutForm = this.fb.group({
      sameAsDelivery: [
        (this.user.billingAddress as BillingAddress).isSameAsDeliveryAddress
      ],
      paymentType: ['creditcard']
    });
    this.checkoutForm
      .get('sameAsDelivery')
      .valueChanges.subscribe((value: boolean) => {
        this.billingIsSameAsDelivery = value;
      });

    this.checkoutForm
      .get('paymentType')
      .valueChanges.subscribe((value: string) => {
        this.paymentType = value;
      });
  }
  ngAfterViewInit() {
    this.billingIsSameAsDelivery =
      (this.user.billingAddress as BillingAddress).isSameAsDeliveryAddress ||
      false;
  }
  formInitialized(name: string, form: FormGroup) {
    this.checkoutForm.setControl(name, form);
  }

  submit() {
    const modalRef = this.modalService.open(NotificationModalComponent);
    modalRef.componentInstance.order = this.checkoutForm.value;
    this.checkoutForm.value['items'] = this.order.items;
    this.checkoutForm.value['id'] = this.order.total;
    this.checkoutForm.value['date'] = this.order.date;
    this.checkoutForm.value['total'] = this.order.total;

    // Charging and placing order would happen here

    // Remove payment info before saving history
    this.checkoutForm.value['payment'] = undefined;
    if (this.user.orderHistory) {
      this.user.orderHistory = [
        ...this.user.orderHistory,
        this.checkoutForm.value
      ];
    } else {
      this.user.orderHistory = [this.checkoutForm.value];
    }

    this.store.dispatch(new CreateOrderHistory(this.checkoutForm.value));
  }
}
