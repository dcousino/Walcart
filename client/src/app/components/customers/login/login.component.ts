import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, from } from 'rxjs';
import * as fromStore from '../../../store';
import { CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';
import { LoginUser } from 'src/app/models/login-user';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(private store: Store<fromStore.ApplicatonState>) {}

  ngOnInit() {}
  login() {
    this.store.dispatch(
      new fromStore.Login({ email: this.email, password: this.password })
    );
  }
}
