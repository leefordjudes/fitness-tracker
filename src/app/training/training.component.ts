import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription, Observable} from 'rxjs';
import {Store} from '@ngrx/store';

import { TrainingService } from './training.service';
import * as fromTraining from './training.reducer';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  // OnDestroy
  // ongoingTraining = false;
  // exerciseSubscription: Subscription;
  ongoingTraining$: Observable<boolean>;
  
  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
    ) { }

  ngOnInit(): void {
    // this.exerciseSubscription = this.trainingService.exerciseChanged$.subscribe(
    //   exercise => {
    //     this.ongoingTraining = exercise ? true : false;
    //   }
    // );
    this.ongoingTraining$ = this.store.select(fromTraining.getIsTraining);
  }

  // ngOnDestroy() {
  //   if (this.exerciseSubscription) {
  //     this.exerciseSubscription.unsubscribe();
  //   }
  // }
}
