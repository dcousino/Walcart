import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categories } from '../models/categories';
@Injectable({
  providedIn: 'root'
})
export class QueryService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Categories> {
    return this.http.get<Categories>(
      'https://aovx8aebr8.execute-api.us-east-1.amazonaws.com/dev/test/v1/taxonomy'
    );
  }
}
