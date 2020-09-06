import { Component, OnInit, OnDestroy } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import {Store} from '@ngrx/store';

import {TrainingService} from '../training.service';
import { Exercise } from '../exercise.model';
import { UIService } from '../../shared/ui.service';
import * as fromTraining from '../training.reducer';
import * as UI from '../../shared/ui.actions'

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  // OnDestroy
  // isLoading = false;
  isLoading$: Observable<boolean>;
  // exercises: Exercise[] = [];
  exercises$: Observable<Exercise[]>;
  // exercisesSubscription: Subscription;
  constructor(
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<fromTraining.State>,
    ) { }

  ngOnInit(): void {
    // this.uiService.loadingStateChanged.subscribe((status) => {
    //   this.isLoading = status;
    // });
    this.isLoading$ = this.store.select(fromTraining.getIsTraining);
    // this.exercisesSubscription = this.trainingService.exercisesChanged$
    // .subscribe(exercises => this.exercises = exercises);
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  // ngOnDestroy() {
  //   if(this.exercisesSubscription) {
  //     this.exercisesSubscription.unsubscribe();
  //   }
  // }

}
