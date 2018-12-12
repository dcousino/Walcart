import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LoginUser } from 'src/app/models/login-user';
import { ApplicationState, Login } from '../../../store';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../auth.style.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private store: Store<ApplicationState>,
    private route: ActivatedRoute
  ) {}
  returnUrl: string;
  authForm: FormGroup;
  authError: any;
  ngOnInit() {
    this.createForm();
    this.store.select('auth').subscribe(auth => {
      this.authError = auth.error;
    });

    console.log(this.route.snapshot.queryParams);

    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'] || 'categories';
  }
  createForm(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit({ value, valid }: { value: LoginUser; valid: boolean }) {
    if (valid) {
      value.returnUrl = this.returnUrl;
      this.store.dispatch(new Login(value));
    }
  }
}
