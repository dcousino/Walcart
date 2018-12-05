import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { filter, map, tap, catchError, switchMap } from 'rxjs/operators';
import { of } from 'zen-observable';
const { host, version, protocol } = environment.api;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private httpClient: HttpClient,
    private jwtSvc: JwtHelperService
  ) {}
  private baseUrl = `${protocol}://${host}/${version}/user`;

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
  get(id: string): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/${id}`);
  }

  create(user: User): Observable<boolean> {
    return this.get(user.id).pipe(
      map(get => Object.keys(get).length > 0),
      switchMap(res => {
        if (res) {
          return of(true);
        } else {
          return this.httpClient.post<boolean>(this.baseUrl, user);
        }
      })
    );
  }

  update(user: User): Observable<boolean> {
    return this.httpClient.put<boolean>(this.baseUrl, user);
  }

  delete(id: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.baseUrl}/${id}`);
  }
}
