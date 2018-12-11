import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { filter, map, tap, catchError, switchMap, pluck } from 'rxjs/operators';
import { of } from 'zen-observable';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'src/app/store';
import { LoadUser } from 'src/app/store/actions/user.action';
import { AuthService } from '../auth/auth.service';
const { host, version, protocol } = environment.api;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) {}
  private baseUrl = `${protocol}://${host}/${version}/user`;

  get(id: string): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/${id}`);
  }

  create(user: User): Observable<User> {
    return this.get(user.id).pipe(
      map(get => {
        return { userExists: Object.keys(get).length > 0, user: get || user };
      }),
      switchMap(result => {
        if (result.userExists) {
          return of(result.user);
        } else {
          return this.httpClient.post<User>(this.baseUrl, user);
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
