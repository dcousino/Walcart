import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { map, switchMap, withLatestFrom, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { Store, State } from '@ngrx/store';
import {
  PersistUserSuccess,
  PersistUserFail,
  PERSIST_USER,
  PersistUser,
  CREATE_OR_LOAD_USER,
  CreateOrLoadUserSuccess,
  CreateOrLoadUserFail,
  CreateOrLoadUser,
  UPDATE_USER,
  UpdateUser,
  UpdateUserSuccess
} from '../actions/user.action';

import { UserState } from '../reducers/user.reducer';
import { getUserState } from '../selectors';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/models/user';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userSvc: UserService,
    private jwtSvc: JwtHelperService
  ) {}

  @Effect()
  persistUserToServer$ = this.actions$.ofType(CREATE_OR_LOAD_USER).pipe(
    map(() => this.createUser()),
    switchMap(user => {
      return this.userSvc.create(user).pipe(
        map(result => {
          return new CreateOrLoadUserSuccess(result);
        }),
        catchError(error => of(new CreateOrLoadUserFail(error)))
      );
    })
  );
  @Effect()
  updateUser$ = this.actions$.ofType(UPDATE_USER).pipe(
    map((action: UpdateUser) => action.payload),
    switchMap((user: User) => {
      return this.userSvc.update(user).pipe(
        map(result => {
          return new UpdateUserSuccess(result);
        }),
        catchError(error => of(new CreateOrLoadUserFail(error)))
      );
    })
  );

  private createUser(): User {
    const token: any = this.jwtSvc.decodeToken();
    const user: User = {
      id: token.sub,
      firstName: token.given_name,
      lastName: token.family_name,
      email: token.email
    };
    return user;
  }
}
