import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

const baseUrl= 'http://localhost:8080/authentication/';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(values: any): Observable<User>{
    return this.http.post<User>(baseUrl+'login', values);
  }

}
