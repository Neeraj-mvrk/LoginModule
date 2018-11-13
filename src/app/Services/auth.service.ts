import { Injectable } from '@angular/core';
//import { JwtHelperService } from '@auth0/angular-jwt/src/jwthelper.service.d';
@Injectable()
export class AuthService {
  constructor() {}  //public jwtHelper: JwtHelperServic
  // ...
  public getToken(): string {
   return localStorage.getItem('token');
 }
  public isAuthenticated(): boolean {
    const token = this.getToken();
    // Check whether the token is expired and return
    // true or false
    if(token){
    return true;
  }else{ return false;}
  }
}
