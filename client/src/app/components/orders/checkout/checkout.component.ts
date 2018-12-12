import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'src/app/store';
import { User } from 'src/app/models/user';
import { getUserState } from 'src/app/store/selectors';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  constructor(private store: Store<ApplicationState>) {}
  user: User;
  ngOnInit() {
    this.store
      .select(getUserState)
      .subscribe(userState => (this.user = userState.user));
  }
}
