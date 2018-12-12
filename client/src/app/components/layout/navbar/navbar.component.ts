import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Store } from '@ngrx/store';
import { ApplicationState, Logout } from 'src/app/store';
import { Router, Event, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import {
  getAuthState,
  getCartState,
  getUserState
} from 'src/app/store/selectors';
import { User } from 'src/app/models/user';
import { fromEvent, Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private store: Store<ApplicationState>,
    private router: Router
  ) {}
  cartItemCount: number;
  isAuth: boolean;
  currentPage: string;
  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    id: ''
  };

  ngOnInit() {
    this.store.select(getAuthState).subscribe(authState => {
      this.isAuth = authState.token !== null;
    });
    this.store.select(getUserState).subscribe(userState => {
      this.user = userState.user;
    });
    this.store.select(getCartState).subscribe(cartState => {
      this.cartItemCount = cartState.cart.length
        ? cartState.cart.length
        : undefined;
    });

    this.router.events
      .pipe(filter((event: Event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentPage = event.url;
      });

    window.scrollbars.visible;
  }

  isCurrentPage(page: string) {
    return `/${page}` === this.currentPage;
  }
  logout() {
    this.store.dispatch(new Logout());
  }
}
