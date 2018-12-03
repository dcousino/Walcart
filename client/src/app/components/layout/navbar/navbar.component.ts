import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Store } from '@ngrx/store';
import { ApplicationState, Logout } from 'src/app/store';
import { Router, NavigationStart, Event, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

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
  ngOnInit() {
    this.store.select('auth').subscribe(authState => {
      this.isAuth = authState.auth !== null;
    });
    this.store.select('cart').subscribe(cartState => {
      this.cartItemCount = cartState.cart.length
        ? cartState.cart.length
        : undefined;
    });

    this.router.events
      .pipe(filter((event: Event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentPage = event.url;
      });
  }
  isCurrentPage(page: string) {
    return `/${page}` === this.currentPage;
  }
  logout() {
    this.store.dispatch(new Logout());
  }
}
