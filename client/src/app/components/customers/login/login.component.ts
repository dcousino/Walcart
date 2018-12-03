import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicatonState, Login } from '../../../store';
import { LoginUser } from 'src/app/models/login-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../auth.style.css']
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder, private store: Store<ApplicatonState>) {}
  authForm: FormGroup;
  authError: any;
  ngOnInit() {
    this.createForm();
    this.store.select('auth').subscribe(auth => {
      this.authError = auth.error;
    });
  }
  createForm(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit({ value, valid }: { value: LoginUser; valid: boolean }) {
    if (valid) {
      this.store.dispatch(new Login(value));
    }
  }
}
