import { CanActivate, CanLoad } from '@angular/router';
import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import { take } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private store: Store<fromRoot.State>) {}

  canActivate() {
      return this.store.select(fromRoot.getIsAuth).pipe(take(1));
    }

  canLoad() {
      return this.store.select(fromRoot.getIsAuth).pipe(take(1));
    }
}

