import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user';
import { ApplicationState, Register } from '../../../store';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../auth.style.css']
})
export class RegisterComponent implements OnInit {
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
