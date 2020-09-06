import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import {Store} from '@ngrx/store';

import { AuthData } from "./auth-data.model";
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';
import * as fromRoot from '../app.reducer'; 
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';


@Injectable({ providedIn: 'root' })
export class AuthService {
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
        this.store.dispatch(new Auth.SetAuthenticated());
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.store.dispatch(new Auth.SetUnauthenticated());
        this.router.navigate(['/welcome']);
      }
    });
  }

  registerUser(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
    .then(res => {
      this.store.dispatch(new UI.StopLoading());
    })
    .catch(err => {
      this.store.dispatch(new UI.StopLoading());
      this.uiService.showSnackbar(err.message, null, 10000);
    });
  }

  login(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
    .then(res => {
      this.store.dispatch(new UI.StopLoading());
    })
    .catch(err => {
      this.store.dispatch(new UI.StopLoading());
      this.uiService.showSnackbar(err.message, null, 10000);
    });
  }

  logout() {
    this.afAuth.signOut();
  }
}
