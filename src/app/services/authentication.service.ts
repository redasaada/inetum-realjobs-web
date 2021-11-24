import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import * as moment from "moment";

const baseUrl= 'http://localhost:8080/authentication/';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(values: any) : Observable<User>{
    
    return this.http.post<User>(baseUrl+'login', values)
    .pipe(tap((res: any) => this.setSession(res)));
  }

  private setSession(authResult: any){
    const expiresAt = moment().add(authResult.expiresIn,'second');

    localStorage.setItem('id_token', authResult.accessToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));

  }

  logout(){
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn(): boolean{
    console.log(moment().isBefore(this.getExpiration()));
    return moment().isBefore(this.getExpiration());
  }

  public isLoggedOut(): boolean{
    return !this.isLoggedIn();
  }

  getExpiration(){
    const expiration = localStorage.getItem("expires_at"); //ne fonctionne pas
    let expiresAt;
    if(expiration != null){
       expiresAt = JSON.parse(expiration);
    }
    return moment(expiresAt);
  }
}
