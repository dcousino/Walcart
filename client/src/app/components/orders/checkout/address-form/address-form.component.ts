import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/models/user';
import { UsStates } from '../../../customers/profile/states';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  @Input() title: string;
  @Input() address: Address;
  @Output() formReady = new EventEmitter<FormGroup>();
  states = UsStates;
  addressForm: FormGroup;
  userError: any;
  ngOnInit() {
    this.createForm();
    this.formReady.emit(this.addressForm);
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
  }
}
