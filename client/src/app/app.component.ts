import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { Store } from '@ngrx/store';
import { ApplicationState, Logout } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private store: Store<ApplicationState>
  ) {}
  title = 'client';
  ngOnInit() {
    this.authService.isAuthenticated().subscribe(auth => {
      if (!auth) {
        this.store.dispatch(new Logout());
      }
    });
  }
}
