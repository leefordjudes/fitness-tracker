import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

import {Store} from '@ngrx/store'
import * as fromRoot from '../../app.reducer';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
// OnDestroy 
  @Output() sidenavToggle = new EventEmitter<void>();
  // isAuth: boolean = false;
  isAuth$: Observable<boolean>;
  authSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>,
    ) { }

  ngOnInit(): void {
    // this.authSubscription = this.authService.authChange$.subscribe(authStatus => {
    //   this.isAuth = authStatus;
    // });
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }
  
  // ngOnDestroy(): void {
  //   this.authSubscription.unsubscribe();
  // }

}
