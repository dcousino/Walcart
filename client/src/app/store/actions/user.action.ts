import { Action } from '@ngrx/store';
import { User } from 'src/app/models/user';

export const CREATE_OR_LOAD_USER = '[User] Create new user or load from DB';
export const CREATE_OR_LOAD_USER_SUCCESS =
  '[User] Create new user or load from DB success';
export const CREATE_OR_LOAD_USER_FAIL =
  '[User] Create new user or load from DB fail';
export const UPDATE_USER = '[User] Update user and persist to DB';
export const UPDATE_USER_SUCCESS =
  '[User] Update user and persist to DB success';
export const UPDATE_USER_FAIL = '[User] Update user and persist to DB fail';

export const UPDATE_USER_WITH_ID =
  '[User] Update user with id after successful registration';
export const PERSIST_USER = '[User] Persist user to database';
export const PERSIST_USER_SUCCESS = '[User] Persist user to database success';
export const PERSIST_USER_FAIL = '[User] Persist user to database failed';
export const LOAD_USER = '[User] Load user';

export class CreateOrLoadUser implements Action {
  readonly type = CREATE_OR_LOAD_USER;
}

export class CreateOrLoadUserSuccess implements Action {
  readonly type = CREATE_OR_LOAD_USER_SUCCESS;
  constructor(public payload: User) {}
}

export class CreateOrLoadUserFail implements Action {
  readonly type = CREATE_OR_LOAD_USER_FAIL;
  constructor(public payload: any) {}
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
export class UpdateUser implements Action {
  readonly type = UPDATE_USER;
  constructor(public payload: User) {}
}
export class UpdateUserSuccess implements Action {
  readonly type = UPDATE_USER_SUCCESS;
  constructor(public payload: boolean) {}
}
export class UpdateUserFail implements Action {
  readonly type = UPDATE_USER_FAIL;
  constructor(public payload: any) {}
}

export class LoadUser implements Action {
  readonly type = LOAD_USER;
  constructor(public payload: User) {}
}

// action types
export type UserAction =
  | PersistUser
  | CreateOrLoadUser
  | CreateOrLoadUserSuccess
  | CreateOrLoadUserFail
  | PersistUserSuccess
  | PersistUserFail
  | UpdateUserWithId
  | LoadUser
  | UpdateUser
  | UpdateUserSuccess
  | UpdateUserFail;
