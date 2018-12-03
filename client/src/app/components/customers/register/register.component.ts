import { Component, OnInit } from '@angular/core';
import { ApplicatonState, Register } from '../../../store';
import { Store } from '@ngrx/store';
import { RegistrationUser } from 'src/app/models/registration-user';
import { User } from 'src/app/models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../auth.style.css']
})
export class RegisterComponent implements OnInit {
  constructor(private fb: FormBuilder, private store: Store<ApplicatonState>) {}
  authForm: FormGroup;

  ngOnInit() {
    this.createForm();
  }
  createForm(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onSubmit({ value, valid }: { value: User; valid: boolean }) {
    if (valid) {
      this.store.dispatch(new Register(value));
    }
  }
}
