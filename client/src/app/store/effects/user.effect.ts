import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import * as authActions from '../actions/auth.action';
import { map, switchMap, withLatestFrom, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { Store, State } from '@ngrx/store';
import {
  CreateTempUser,
  UpdateUserWithId,
  UPDATE_USER_WITH_ID,
  PersistUserSuccess,
  PersistUserFail,
  PERSIST_USER,
  PersistUser
} from '../actions/user.action';

import { UserState } from '../reducers/user.reducer';
import { getUserState } from '../reducers';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userSvc: UserService,
    private store$: Store<UserState>
  ) {}

  @Effect()
  createTempUser$ = this.actions$.ofType(authActions.REGISTER).pipe(
    map((action: authActions.Register) => action.payload),
    // Remove password, add empty id which will be set later
    map(user => ({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      id: ''
    })),
    switchMap(user => {
      return of(new CreateTempUser(user));
    })
  );

  @Effect()
  updateTempUser$ = this.actions$.ofType(authActions.REGISTER_SUCCESS).pipe(
    map((action: authActions.RegisterSuccess) => action.payload),
    switchMap(user => {
      return of(new UpdateUserWithId(user));
    })
  );

  @Effect()
  persistUserToServer$ = this.actions$.ofType(PERSIST_USER).pipe(
    map((action: PersistUser) => action.payload),
    switchMap(user => {
      console.log(user);

      return this.userSvc.create(user).pipe(
        map(result => new PersistUserSuccess(result)),
        catchError(error => of(new PersistUserFail(error)))
      );
    })
  );
}
