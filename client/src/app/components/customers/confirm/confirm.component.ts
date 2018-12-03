import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Confirm, ApplicationState } from '../../../store';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ConfirmUser } from 'src/app/models/confirm-user';
@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css', '../auth.style.css']
})
export class ConfirmComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private store: Store<ApplicationState>
  ) {}
  authForm: FormGroup;

  ngOnInit() {
    this.createForm();
  }
  createForm(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      code: ['', [Validators.required]]
    });
  }

  onSubmit({ value, valid }: { value: ConfirmUser; valid: boolean }) {
    if (valid) {
      this.store.dispatch(new Confirm(value));
    }
  }
}
