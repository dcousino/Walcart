import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenType } from '@angular/compiler';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private httpClient: HttpClient,
    private jwtSvc: JwtHelperService,
    private authSvc: AuthService
  ) {}

  createUserFromJwt() {
    const token: any = this.jwtSvc.decodeToken();
    const user: User = {
      id: token.sub,
      firstName: token.given_name,
      lastName: token.family_name,
      email: token.email
    };

    console.log(user);
  }
  getUser(id: string): Observable<User> {
    return this.httpClient.get<User>(
      `https://fs4rs4fpcj.execute-api.us-east-1.amazonaws.com/latest/user/${id}`
    );
  }
}
