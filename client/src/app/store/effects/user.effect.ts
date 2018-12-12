import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';
import {
  CreateOrLoadUserFail,
  CreateOrLoadUserSuccess,
  CREATE_OR_LOAD_USER,
  UpdateUser,
  UpdateUserSuccess,
  UPDATE_USER
} from '../actions/user.action';

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
