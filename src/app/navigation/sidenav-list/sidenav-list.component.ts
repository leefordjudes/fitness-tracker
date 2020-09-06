import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

import {Store} from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
// OnDestroy 
  @Output() closeSidenav = new EventEmitter<void>();
  // isAuth: boolean = false;
  isAuth$: Observable<boolean>;
  authSubscription: Subscription;
  constructor(private authService: AuthService, private store: Store<fromRoot.State>) { }
  

  ngOnInit(): void {
    // this.authSubscription = this.authService.authChange$.subscribe(authStatus => {
    //   this.isAuth = authStatus;
    // });
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.onClose();
    this.authService.logout();
  }

  // ngOnDestroy(): void {
  //   this.authSubscription.unsubscribe();
  // }

}
