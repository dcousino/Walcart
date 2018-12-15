import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreditCardValidator } from '../credit-card-validator';

@Component({
  selector: 'app-payment-info-form',
  templateUrl: './payment-info-form.component.html',
  styleUrls: ['./payment-info-form.component.css']
})
export class PaymentInfoFormComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  @Output() formReady = new EventEmitter<FormGroup>();
  paymentForm: FormGroup;
  get form() {
    return this.paymentForm.controls;
  }
  ngOnInit() {
    this.paymentForm = this.fb.group({
      fullName: ['', [Validators.required]],
      creditCardNumber: [
        undefined,
        [Validators.required, CreditCardValidator.validateCardNumber]
      ],
      expirationDate: [
        '',
        [Validators.required, CreditCardValidator.validateCardExpiry]
      ],
      ccv: ['', [Validators.required, CreditCardValidator.validateCardCvc]]
    });
    this.formReady.emit(this.paymentForm);
  }
}
