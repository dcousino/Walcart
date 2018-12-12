import { Injectable } from '@angular/core';
import { Observable, of, Observer } from 'rxjs';
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession
} from 'amazon-cognito-identity-js';
import { User } from '../../models/user';
import { RegistrationUser } from 'src/app/models/registration-user';
import { ThrowStmt } from '@angular/compiler';

const POOL_DATA = {
  UserPoolId: 'us-east-1_b62U8X7xd',
  ClientId: 'uu3jm1ssofhp0nh86t8ug3s13'
};
const userPool = new CognitoUserPool(POOL_DATA);

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  registeredUser: CognitoUser;
  constructor() {}
  signUp(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Observable<string> {
    const { user, attrList }: RegistrationUser = this.createRegistrationUser(
      firstName,
      lastName,
      email,
      password
    );

    return Observable.create((observer: Observer<string>) => {
      userPool.signUp(
        user.email,
        user.password,
        attrList,
        null,
        (err, result) => {
          if (err) {
            console.log(err);
            observer.error(err);
            observer.complete();
          } else {
            observer.next(result.userSub);
            observer.complete();
          }
        }
      );
    });
  }
  private createRegistrationUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): RegistrationUser {
    const user: User = {
      id: '',
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };
    const attrList: CognitoUserAttribute[] = this.createUserAttributes(user);
    return { user, attrList };
  }

  private createUserAttributes(user: User) {
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
    return attrList;
  }

  confirmUser(email: string, code: string): Observable<boolean> {
    const cognitoUser = this.getCognitoUser(email);
    return Observable.create((observer: Observer<boolean>) => {
      cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
          console.log(err);
          observer.error(err);
          observer.complete();
        } else {
          observer.next(true);
          observer.complete();
        }
      });
    });
  }

  getToken(): string {
    try {
      if (this.getAuthenticatedUser()) {
        return this.getAuthenticatedUser().getSession((err, session) => {
          if (err) {
            console.log(err);
            return '';
          }
          return session.getIdToken().getJwtToken();
        });
      } else {
        return '';
      }
    } catch (err) {
      console.log(err);
      return '';
    }
  }
  private getAuthDetails(email: string, password: string) {
    const authData = {
      Username: email,
      Password: password
    };
    return new AuthenticationDetails(authData);
  }

  private getCognitoUser(email: string) {
    const userData = {
      Username: email,
      Pool: userPool
    };
    return new CognitoUser(userData);
  }
  signIn(email: string, password: string): Observable<string> {
    const authDetails = this.getAuthDetails(email, password);
    const cognitoUser = this.getCognitoUser(email);

    return Observable.create((observer: Observer<string>) => {
      cognitoUser.authenticateUser(authDetails, {
        onSuccess: session => {
          const token = session.getIdToken().getJwtToken();
          localStorage['token'] = token;
          observer.next(token);
          observer.complete();
        },
        onFailure: error => observer.error(error)
      });
    });
  }
  getAuthenticatedUser() {
    return userPool.getCurrentUser();
  }
  logout(): Observable<boolean> {
    if (this.getAuthenticatedUser()) {
      this.getAuthenticatedUser().signOut();
    }

    return of(true);
  }
  refreshToken() {
    this.getAuthenticatedUser().getSession(
      (err, session: CognitoUserSession) => {
        if (err) {
          console.log(err);
          return;
        } else {
          this.getAuthenticatedUser().refreshSession(
            session.getRefreshToken(),
            (err, result) => {
              if (err) {
                console.log(err);
              }
              const token = result.getIdToken().getJwtToken();
              localStorage['token'] = token;
            }
          );
        }
      }
    );
  }
  isAuthenticated(): Observable<boolean> {
    // TODO: if user is deleted they still have access until there token expires or they
    // log out

    const user = this.getAuthenticatedUser();
    const obs = Observable.create(observer => {
      if (!user) {
        observer.next(false);
      } else {
        user.getSession((err, session) => {
          if (err) {
            console.log(err);
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
}
