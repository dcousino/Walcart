import { Action } from '@ngrx/store';
import { Category } from 'src/app/models/category';

export const LOGIN = '[User] Login';
export const LOGIN_FAIL = '[User] Login Fail';
export const LOGIN_SUCCESS = '[User] Login Success';

export const CONFIRM = '[User] Confirm';
export const CONFIRM_FAIL = '[User] Confirm Fail';
export const CONFIRM_SUCCESS = '[User] Confirm Success';

export const REGISTER = '[User] Register';
export const REGISTER_FAIL = '[User] Register Fail';
export const REGISTER_SUCCESS = '[User] Register Success';

export class Login implements Action {
  readonly type = LOGIN;
}

export class LoginFail implements Action {
  readonly type = LOGIN_FAIL;
  constructor(public payload: any) {}
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: Category[]) {}
}

export class Confirm implements Action {
  readonly type = CONFIRM;
}

export class ConfirmFail implements Action {
  readonly type = CONFIRM_FAIL;
  constructor(public payload: any) {}
}

export class ConfirmSuccess implements Action {
  readonly type = CONFIRM_SUCCESS;
  constructor(public payload: Category[]) {}
}

export class Register implements Action {
  readonly type = REGISTER;
}

export class RegisterFail implements Action {
  readonly type = REGISTER_FAIL;
  constructor(public payload: any) {}
}

export class RegisterSuccess implements Action {
  readonly type = REGISTER_SUCCESS;
  constructor(public payload: Category[]) {}
}

// action types
export type UserAction =
  | Login
  | LoginFail
  | LoginSuccess
  | Confirm
  | ConfirmFail
  | ConfirmSuccess
  | Register
  | RegisterFail
  | RegisterSuccess;
