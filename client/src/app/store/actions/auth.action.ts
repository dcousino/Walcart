import { Action } from '@ngrx/store';
import { CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';
import { LoginUser } from 'src/app/models/login-user';
import { ConfirmUser } from 'src/app/models/confirm-user';
import { User } from 'src/app/models/user';

export const LOGIN = '[Auth] Attempt login';
export const LOGIN_SUCCESS = '[Auth] Successful login';
export const LOGIN_FAIL = '[Auth] Login failed';
export const REGISTER = '[Auth] Attempt register';
export const REGISTER_SUCCESS = '[Auth] Successful register';
export const REGISTER_FAIL = '[Auth] Register failed';
export const CONFIRM = '[Auth] Attempt to confirm current user';
export const CONFIRM_SUCCESS = '[Auth] Confirm current user successful';
export const CONFIRM_FAIL = '[Auth] Confirm current user';
export const LOGOUT = '[Auth] Logout current user';
export const LOGOUT_FAIL = '[Auth] Logout user fail';

export class Login implements Action {
  readonly type = LOGIN;
  constructor(public payload: LoginUser) {}
}
export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: CognitoUserSession) {}
}

export class LoginFail implements Action {
  readonly type = LOGIN_FAIL;
  constructor(public payload: any) {}
}

export class Register implements Action {
  readonly type = REGISTER;
  constructor(public payload: User) {}
}
export class RegisterSuccess implements Action {
  readonly type = REGISTER_SUCCESS;
  constructor(public payload: CognitoUser) {}
}

export class RegisterFail implements Action {
  readonly type = REGISTER_FAIL;
  constructor(public payload: any) {}
}

export class Confirm implements Action {
  readonly type = CONFIRM;
  constructor(public payload: ConfirmUser) {}
}

export class ConfirmSuccess implements Action {
  readonly type = CONFIRM_SUCCESS;
  constructor(public payload: boolean) {}
}

export class ConfirmFail implements Action {
  readonly type = CONFIRM_FAIL;
  constructor(public payload: any) {}
}

export class LogoutUser implements Action {
  readonly type = LOGOUT;
}

export class LogoutUserFail implements Action {
  readonly type = LOGOUT_FAIL;
  constructor(public payload: any) {}
}

export type AuthAction =
  | Login
  | LoginSuccess
  | LoginFail
  | Register
  | RegisterSuccess
  | RegisterFail
  | Confirm
  | ConfirmSuccess
  | ConfirmFail
  | LogoutUser;
