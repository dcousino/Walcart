import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import * as authActions from '../actions/auth.action';
import {
  switchMap,
  map,
  catchError,
  tap,
  mergeMap,
  withLatestFrom
} from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserState } from '../reducers/user.reducer';
import { getUserState } from '..';
import { PersistUser } from '../actions/user.action';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private userStore$: Store<UserState>
  ) {}

  @Effect()
  login$ = this.actions$.ofType(authActions.LOGIN).pipe(
    map((action: authActions.Login) => action.payload),
    switchMap(login =>
      this.authService.signIn(login.email, login.password).pipe(
        withLatestFrom(this.userStore$.select(getUserState)),
        switchMap(([userSession, userState]) => {
          console.log('session', userSession);
          console.log('user', userState);
          return [
            new authActions.LoginSuccess(userSession),
            new PersistUser(userState.user)
          ];
        }),
        catchError(error => of(new authActions.LoginFail(error)))
      )
    )
  );
  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.ofType(authActions.LOGIN_SUCCESS).pipe(
    tap(() => {
      this.router.navigate(['/categories']);
    })
  );

  @Effect({ dispatch: false })
  registerSuccess$ = this.actions$.ofType(authActions.REGISTER_SUCCESS).pipe(
    tap(() => {
      this.router.navigate(['/confirm']);
    })
  );

  @Effect({ dispatch: false })
  confirmSuccess$ = this.actions$.ofType(authActions.CONFIRM_SUCCESS).pipe(
    tap(() => {
      this.router.navigate(['/login']);
    })
  );

  @Effect({ dispatch: false })
  logoutSuccess$ = this.actions$.ofType(authActions.LOGOUT_SUCCESS).pipe(
    tap(() => {
      this.router.navigate(['/login']);
    })
  );

  @Effect()
  logout$ = this.actions$.ofType(authActions.LOGOUT).pipe(
    switchMap(() => {
      return this.authService.logout().pipe(
        map(() => new authActions.LogoutSuccess()),
        catchError(error => of(new authActions.LogoutFail(error)))
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
          map(cognitoId => new authActions.RegisterSuccess(cognitoId)),
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

        catchError(error => of(new authActions.ConfirmFail(error)))
      );
    })
  );
}
