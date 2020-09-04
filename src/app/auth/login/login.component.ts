import { Component, OnInit } from '@angular/core';
import {Store, select} from '@ngrx/store';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UIService } from '../../shared/ui.service';
import * as fromRoot from '../../app.reducer';
import { Observable, pipe } from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  // isLoading = false;
  isLoading$: Observable<boolean>;
  constructor(
    private authService: AuthService,
    private uiService: UIService,
    private store: Store<fromRoot.State>,
    ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    // this.isLoading$ = this.store.select(state => state.ui.isLoading);
    // this.isLoading$ = this.store.pipe(map(state => state.ui.isLoading));
    // this.uiService.loadingStateChanged.subscribe((status) => {
    //   this.isLoading = status;
    // });
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  onSubmit() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }

}
