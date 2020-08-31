import {Injectable, EventEmitter} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Subject} from 'rxjs';

@Injectable({providedIn:'root' })
export class UIService {
  loadingStateChanged = new EventEmitter<boolean>();

  constructor(private snackbar: MatSnackBar) {}

  showSnackbar(message, action, duration) {
    this.snackbar.open(message, action, {
      duration: duration
    });
  }
}