import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Confirm, ApplicatonState } from '../../../store';
@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  constructor(private store: Store<ApplicatonState>) {}
  email: string;
  code: string;
  ngOnInit() {}
  confirm() {
    this.store.dispatch(new Confirm({ email: this.email, code: this.code }));
  }
}
