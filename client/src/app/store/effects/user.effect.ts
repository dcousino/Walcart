import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import * as authActions from '../actions/auth.action';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducer';
import { CreateTempUser } from '../actions/user.action';
import { getAuthState, getUserState } from '../reducers';
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userSvc: UserService,
    private store$: Store<AuthState>
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
}
