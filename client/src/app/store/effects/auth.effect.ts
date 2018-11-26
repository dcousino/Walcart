import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import * as authActions from '../actions/auth.action';
import { switchMap, map, catchError, tap } from 'rxjs/operators';

import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  @Effect()
  login$ = this.actions$.ofType(authActions.LOGIN).pipe(
    map((action: authActions.Login) => action.payload),
    switchMap(login => {
      return this.authService.signIn(login.email, login.password).pipe(
        map(userSession => new authActions.LoginSuccess(userSession)),
        tap(() => this.router.navigate(['/confirm'])),
        catchError(error => of(new authActions.LoginFail(error)))
      );
    })
  );

  @Effect()
  register$ = this.actions$.ofType(authActions.REGISTER).pipe(
    map((action: authActions.Register) => action.payload),
    switchMap(register => {
      return this.authService
        .signUp(
          register.email,
          register.password,
          register.firstName,
          register.lastName
        )
        .pipe(
          map(userSession => new authActions.RegisterSuccess(userSession)),
          tap(() => this.router.navigate(['/confirm'])),
          catchError(error => of(new authActions.RegisterFail(error)))
        );
    })
  );

  @Effect()
  confirm$ = this.actions$.ofType(authActions.CONFIRM).pipe(
    map((action: authActions.Confirm) => action.payload),
    switchMap(confirm => {
      return this.authService.confirmUser(confirm.email, confirm.code).pipe(
        map(confirm => {
          if (confirm) {
            return new authActions.ConfirmSuccess(true);
          } else {
            throw new Error();
          }
        }),
        tap(() => this.router.navigate(['/login'])),
        catchError(error => of(new authActions.ConfirmFail(error)))
      );
    })
  );
  @Effect()
  logout$ = this.actions$.ofType(authActions.LOGOUT).pipe(
    switchMap(() => {
      return this.authService.logout().pipe(
        map(logout => new authActions.LogoutUser()),
        catchError(error => of(new authActions.LogoutUserFail(error)))
      );
    })
  );
}
