import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ConfirmUser } from 'src/app/models/confirm-user';
import { ApplicationState, Confirm } from '../../../store';

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
