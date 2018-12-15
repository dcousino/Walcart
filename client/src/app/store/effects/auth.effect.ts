import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  map,
  switchMap,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { ErrorModalComponent } from 'src/app/components/alerts/error-modal/error-modal.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import * as authActions from '../actions/auth.action';
import { CreateOrLoadUser } from '../actions/user.action';
import { UserState } from '../reducers/user.reducer';
import { AuthState } from '../reducers/auth.reducer';
import { getAuthState } from '../selectors';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private authStore$: Store<AuthState>,
    private modalService: NgbModal
  ) {}

  @Effect()
  login$ = this.actions$.ofType(authActions.LOGIN).pipe(
    map((action: authActions.Login) => action.payload),
    switchMap(login =>
      this.authService.signIn(login.email, login.password).pipe(
        switchMap(token => {
          return [new authActions.LoginSuccess(token), new CreateOrLoadUser()];
        }),
        catchError(error => of(new authActions.LoginFail(error)))
      )
    )
  );
  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.ofType(authActions.LOGIN_SUCCESS).pipe(
    withLatestFrom(this.authStore$.select(getAuthState)),
    tap(([_, authState]) => {
      this.router.navigate(['/' + authState.returnUrl]);
    })
  );

  @Effect({ dispatch: false })
  userloginErrorModal$ = this.actions$.ofType(authActions.LOGIN_FAIL).pipe(
    map((action: authActions.LoginFail) => action.payload),
    tap(error => {
      const modalRef = this.modalService.open(ErrorModalComponent);
      modalRef.componentInstance.errorMessage = error.message;
    })
  );

  @Effect({ dispatch: false })
  userConfirmErrorModal$ = this.actions$.ofType(authActions.CONFIRM_FAIL).pipe(
    map((action: authActions.ConfirmFail) => action.payload),
    tap(error => {
      const modalRef = this.modalService.open(ErrorModalComponent);
      modalRef.componentInstance.errorMessage = error.message;
    })
  );

  @Effect({ dispatch: false })
  userRegisterErrorModal$ = this.actions$
    .ofType(authActions.REGISTER_FAIL)
    .pipe(
      map((action: authActions.RegisterFail) => action.payload),
      tap(error => {
        const modalRef = this.modalService.open(ErrorModalComponent);
        modalRef.componentInstance.errorMessage = error.message;
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
            return new authActions.ConfirmFail(new Error('Confirm failed'));
          }
        }),
        catchError(error => of(new authActions.ConfirmFail(error)))
      );
    })
  );
}
