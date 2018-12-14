import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Address, BillingAddress } from 'src/app/models/user';
import { UsStates } from '../states';

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.css']
})
export class AddressDetailsComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  @Input() title: string;
  @Input() includeSave: boolean = false;
  @Input() address: Address;
  @Output() emitSubmit = new EventEmitter<Address>();
  states = UsStates;
  addressForm: FormGroup;
  userError: any;
  isDeliveryAddress: boolean;
  ngOnInit() {
    this.isDeliveryAddress = this.address.type === 'DeliveryAddress';
    this.createForm();

    if (
      this.address.type === 'BillingAddress' &&
      this.address.isSameAsDeliveryAddress
    ) {
      this.toggleBillingForm(true);
    }
  }

  toggleBillingForm(disable: boolean) {
    Object.keys(this.addressForm.controls).forEach(key => {
      if (key !== 'isSameAsDeliveryAddress' && key !== 'type') {
        if (disable === true) {
          this.addressForm.get(key).disable();
        } else {
          this.addressForm.get(key).enable();
        }
      }
    });
  }

  createForm(): void {
    this.addressForm = this.fb.group({
      type: [this.address.type],
      deliverToFirstName: [
        this.address.deliverToFirstName,
        [Validators.required]
      ],
      deliverToLastName: [
        this.address.deliverToLastName,
        [Validators.required]
      ],
      addressLine1: [this.address.addressLine1, [Validators.required]],
      addressLine2: [this.address.addressLine2],
      country: [this.address.country, [Validators.required]],
      city: [this.address.city, [Validators.required]],
      state: [this.address.state, [Validators.required]],
      zip: [this.address.zip, [Validators.required]]
    });
    if (!this.isDeliveryAddress) {
      this.addressForm.addControl(
        'isSameAsDeliveryAddress',
        new FormControl(
          (this.address as BillingAddress).isSameAsDeliveryAddress
        )
      );
    }
  }
  onSubmit({ value, valid }: { value: Address; valid: boolean }) {
    this.emitSubmit.next(value);
  }
}
