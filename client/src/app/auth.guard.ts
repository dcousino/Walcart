import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { AuthService } from './services/auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authservice: AuthService, private router: Router) {
    this.authservice.isAuthenticated().subscribe(isAuth => {
      this.isAuth = isAuth;
    });
  }
  isAuth: boolean;

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    console.log('auth guard');
    return this.authservice.isAuthenticated();
  }
}
