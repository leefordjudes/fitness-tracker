import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import {Subject, BehaviorSubject} from 'rxjs';

import { User } from "./user.model";
import { AuthData } from "./auth-data.model";

@Injectable({ providedIn: 'root' })
export class AuthService {
  // private authChange = new Subject<boolean>();
  private authChange = new BehaviorSubject<boolean>(false);
  authChange$ = this.authChange.asObservable();
  private user: User;

  constructor(private router: Router) {}
  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };
    this.authSuccess();
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };
    this.authSuccess();
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    return {...this.user};
  }

  isAuth() {
    return this.user != null;
  }

  private authSuccess() {
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}