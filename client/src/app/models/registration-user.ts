import { User } from './user';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';

export interface RegistrationUser {
  user: User;
  attrList: CognitoUserAttribute[];
}
