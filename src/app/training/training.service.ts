import {Injectable, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {map, take} from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import {Store} from '@ngrx/store';

import * as fromTraining from './training.reducer';
import * as UI from '../shared/ui.actions';
import * as TRAINING from './training.actions';
import {Exercise} from './exercise.model';
import { UIService } from '../shared/ui.service';


@Injectable({providedIn: 'root'})
export class TrainingService implements OnDestroy {
  private fbSubs: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTraining.State>
  ) {}

  getAvailableExercises() {
    return {...this.store.select(fromTraining.getAvailableExercises)};
  }

  fetchAvailableExercises() {
    this.store.dispatch(new UI.StartLoading());
    this.fbSubs.push(this.db.collection('availableExercises').snapshotChanges()
    .pipe(
      map(docArray => {
        return docArray.map(doc => ({
          id: doc.payload.doc.id,
          name: doc.payload.doc.data()['name'],
          duration: doc.payload.doc.data()['duration'],
          calories: doc.payload.doc.data()['calories'],
        }));
      })
    ).subscribe((exercises: Exercise[])=>{
      this.store.dispatch(new UI.StopLoading());
      this.store.dispatch(new TRAINING.SetAvailableTrainings(exercises));
    },
    error => {
      this.store.dispatch(new UI.StopLoading());
      this.uiService.showSnackbar('Fetching Exercises failed, please try again later', null, 10000);
      this.store.dispatch(new TRAINING.StopTraining());
    }
    ));
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new TRAINING.StartTraining(selectedId));
  }

  completeExercise() {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
      this.addDataToDatabase({...ex, date: new Date(), state: 'completed'});
      this.store.dispatch(new TRAINING.StopTraining());
    });
  }

  cancelExercise(progress: number) {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
      this.addDataToDatabase({
        ...ex,
        date: new Date(),
        duration: ex.duration * (progress / 100), 
        calories: ex.calories * (progress / 100),
        state: 'cancelled'});
      this.store.dispatch(new TRAINING.StopTraining());
    });
  }

  getCompletedOrCancelledExerciese() {
    return {...this.store.select(fromTraining.getFinishedExercises)};
  }

  fetchCompletedOrCancelledExerciese() {
    this.fbSubs.push(this.db.collection('finishedExercises').valueChanges()
    .subscribe((exercises: Exercise[])=>{
      this.store.dispatch(new TRAINING.SetFinishedTrainings(exercises));
    }));
  }

  addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(subs => subs.unsubscribe());
  }

  ngOnDestroy() {
    this.cancelSubscriptions()
  }
}
