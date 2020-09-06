import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import {Subject, BehaviorSubject} from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import {Store} from '@ngrx/store';

import { User } from "./user.model";
import { AuthData } from "./auth-data.model";
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';
import * as fromRoot from '../app.reducer'; 
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';


@Injectable({ providedIn: 'root' })
export class AuthService {
  // private authChange = new Subject<boolean>();
  // private authChange = new BehaviorSubject<boolean>(false);
  // authChange$ = this.authChange.asObservable();
  // isAuthenticated = false;
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<fromRoot.State>,
    ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if(user) {
        // this.isAuthenticated = true;
        // this.authChange.next(true);
        this.store.dispatch(new Auth.SetAuthenticated());
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        // this.isAuthenticated = false;
        // this.authChange.next(false);
        this.store.dispatch(new Auth.SetUnauthenticated());
        this.router.navigate(['/welcome']);
      }
    });
  }

  registerUser(authData: AuthData) {
    // this.uiService.loadingStateChanged.emit(true);
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
    .then(res => {
      // this.uiService.loadingStateChanged.emit(false);
      this.store.dispatch(new UI.StopLoading());
    })
    .catch(err => {
      // this.uiService.loadingStateChanged.emit(false);
      this.store.dispatch(new UI.StopLoading());
      this.uiService.showSnackbar(err.message, null, 10000);
    });
  }

  login(authData: AuthData) {
    // this.uiService.loadingStateChanged.emit(true);
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
    .then(res => {
      // this.uiService.loadingStateChanged.emit(false);
      this.store.dispatch(new UI.StopLoading());
    })
    .catch(err => {
      // this.uiService.loadingStateChanged.emit(false);
      this.store.dispatch(new UI.StopLoading());
      this.uiService.showSnackbar(err.message, null, 10000);
    });
  }

  logout() {
    this.afAuth.signOut();
  }

  // isAuth() {
  //   return this.isAuthenticated;
  // }

}
