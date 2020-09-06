import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Observable } from 'rxjs';
import {Store} from '@ngrx/store';

import {TrainingService} from '../training.service';
import { Exercise } from '../exercise.model';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  isLoading$: Observable<boolean>;
  exercises$: Observable<Exercise[]>;
  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>,
    ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromTraining.getIsTraining);
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
