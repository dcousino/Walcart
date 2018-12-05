import { Action } from '@ngrx/store';
import { User } from 'src/app/models/user';

export const NEW_TEMP_USER = '[User] Create new user in memory';
export const UPDATE_USER_WITH_ID =
  '[User] Update user with id after successful registration';
export const PERSIST_USER = '[User] Persist user to database';
export const PERSIST_USER_SUCCESS = '[User] Persist user to database success';
export const PERSIST_USER_FAIL = '[User] Persist user to database failed';

export class CreateTempUser implements Action {
  readonly type = NEW_TEMP_USER;
  constructor(public payload: User) {}
}

export class UpdateUserWithId implements Action {
  readonly type = UPDATE_USER_WITH_ID;
  constructor(public payload: string) {}
}
export class PersistUser implements Action {
  readonly type = PERSIST_USER;
  constructor(public payload: User) {}
}
export class PersistUserSuccess implements Action {
  readonly type = PERSIST_USER_SUCCESS;
  constructor(public payload: boolean) {}
}
export class PersistUserFail implements Action {
  readonly type = PERSIST_USER_FAIL;
  constructor(public payload: any) {}
}

// action types
export type UserAction =
  | PersistUser
  | CreateTempUser
  | PersistUserSuccess
  | PersistUserFail
  | UpdateUserWithId;
