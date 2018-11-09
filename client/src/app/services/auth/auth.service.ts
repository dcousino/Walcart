import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession
} from 'amazon-cognito-identity-js';
import { User } from '../../models/user';
const POOL_DATA = {
  UserPoolId: 'us-east-1_b62U8X7xd',
  ClientId: 'uu3jm1ssofhp0nh86t8ug3s13'
};
const userPool = new CognitoUserPool(POOL_DATA);

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authIsLoading = new BehaviorSubject<boolean>(false);
  authDidFail = new BehaviorSubject<boolean>(false);
  authStatusChanged = new Subject<boolean>();
  registeredUser: CognitoUser;
  constructor(private router: Router) {}
  signUp(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): void {
    this.authIsLoading.next(true);
    const user: User = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };
    const emailAttribute = {
      Name: 'email',
      Value: user.email
    };
    const givenNameAttribute = {
      Name: 'given_name',
      Value: user.firstName
    };
    const familyNameAttribute = {
      Name: 'family_name',
      Value: user.lastName
    };
    const attrList: CognitoUserAttribute[] = [];
    attrList.push(new CognitoUserAttribute(emailAttribute));
    attrList.push(new CognitoUserAttribute(givenNameAttribute));
    attrList.push(new CognitoUserAttribute(familyNameAttribute));
    userPool.signUp(
      user.email,
      user.password,
      attrList,
      null,
      (err, result) => {
        if (err) {
          this.authDidFail.next(true);
          this.authIsLoading.next(false);
        } else {
          this.authDidFail.next(false);
          this.authIsLoading.next(false);
          this.registeredUser = result.user;
        }
      }
    );
    return;
  }
  confirmUser(email: string, code: string) {
    this.authIsLoading.next(true);
    const userData = {
      Username: email,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        console.log(err);
        this.authDidFail.next(true);
        this.authIsLoading.next(false);
        return;
      } else {
        console.log(result);

        this.authDidFail.next(false);
        this.authIsLoading.next(false);
        this.router.navigate(['/']);
      }
    });
  }
  signIn(email: string, password: string): void {
    console.log('trying');
    this.authIsLoading.next(true);
    const authData = {
      Username: email,
      Password: password
    };
    const authDetails = new AuthenticationDetails(authData);
    const userData = {
      Username: email,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);
    const that = this;
    cognitoUser.authenticateUser(authDetails, {
      onSuccess(result: CognitoUserSession) {
        that.authStatusChanged.next(true);
        that.authDidFail.next(false);
        that.authIsLoading.next(false);
        console.log(result);
      },
      onFailure(err) {
        console.log(err);
        that.authDidFail.next(true);
        that.authIsLoading.next(false);
      }
    });
    this.authStatusChanged.next(true);
    return;
  }
  getAuthenticatedUser() {
    return userPool.getCurrentUser();
  }
  logout() {
    this.getAuthenticatedUser().signOut();
    this.authStatusChanged.next(false);
  }
  isAuthenticated(): Observable<boolean> {
    const user = this.getAuthenticatedUser();
    const obs = Observable.create(observer => {
      if (!user) {
        observer.next(false);
      } else {
        user.getSession((err, session) => {
          if (err) {
            observer.next(false);
          } else {
            if (session.isValid()) {
              observer.next(true);
            } else {
              observer.next(false);
            }
          }
        });
      }
      observer.complete();
    });
    return obs;
  }
  initAuth() {
    this.isAuthenticated().subscribe(auth => this.authStatusChanged.next(auth));
  }
}
