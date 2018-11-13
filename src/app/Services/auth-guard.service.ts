import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import {Location} from '@angular/common';
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router,private _location: Location) {}
  canActivate(): boolean {
    console.log(this._location.path());
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login-form']);
      return false;
    }
    return true;
  }
}
