import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from '../auth.service';
import * as fromRoot from '../../app.reducer';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  isLoading$: Observable<boolean>;
  maxDate;
  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>,
    private dialogRef: MatDialogRef<SignupComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    const today = new Date();
    this.maxDate = new Date(
      Date.UTC(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate(),
        0,
        0,
        0,
        0
      )
    );
  }

  onSubmit(form: NgForm) {
    const dob = form.value.dob;
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password,
    });
    this.isLoading$.subscribe((res) => {
      if (!res) {
        this.closeSignup();
      }
    });
  }

  closeSignup() {
    this.dialogRef.close();
  }
}
