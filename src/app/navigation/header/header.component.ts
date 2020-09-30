import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth$: Observable<boolean>;
  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }

  async openSignup() {
    const { SignupComponent } = await import(
      '../../auth/signup/signup.component'
    );
    const options = {
      width: '500px',
      data: {},
    };
    const dialogRef = await this.dialog.open(SignupComponent, options);
  }

  async openLogin() {
    const { LoginComponent } = await import('../../auth/login/login.component');
    const options = {
      width: '500px',
      data: {},
    };
    const dialogRef = await this.dialog.open(LoginComponent, options);
  }
}
