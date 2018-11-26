import { Component, OnInit } from '@angular/core';
import { ApplicatonState, Register } from '../../../store';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private store: Store<ApplicatonState>) {}
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  ngOnInit() {}

  register() {
    this.store.dispatch(
      new Register({
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName
      })
    );
  }
}
