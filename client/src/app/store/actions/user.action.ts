import { Action } from '@ngrx/store';

export const NEW_TEMP_USER = '[User] Create new user in memory';
export const UPDATE_USER_WITH_ID =
  '[User] Update user with id after successful registration';
export const UPDATE_USER_WITH_ID_SUCCESS =
  '[User] Update user with id after successful registration success';

export class CreateTempUser implements Action {
  readonly type = NEW_TEMP_USER;
  constructor(public payload: any) {}
}

export class UpdateUserWithId implements Action {
  readonly type = NEW_TEMP_USER;
  constructor(public payload: any) {}
}

export class UpdateUserWithIdSuccess implements Action {
  readonly type = NEW_TEMP_USER;
  constructor(public payload: any) {}
}

// action types
export type UserAction =
  | CreateTempUser
  | UpdateUserWithIdSuccess
  | UpdateUserWithId;
