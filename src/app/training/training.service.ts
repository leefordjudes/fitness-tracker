import {Injectable, OnDestroy} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
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
  // private runningExercise: Exercise;
  // private exercises: Exercise[] = [];
  // private finishedExercises: Exercise[] = [];
  // private availableExercises: Exercise[] = [];
  private fbSubs: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTraining.State>
  ) {}
  
  // private exerciseChanged = new Subject<Exercise>();
  // exerciseChanged$ = this.exerciseChanged.asObservable();
  // private exercisesChanged = new Subject<Exercise[]>();
  // exercisesChanged$ = this.exercisesChanged.asObservable();
  // private finishedExercisesChanged = new Subject<Exercise[]>();
  // finishedExercisesChanged$ = this.finishedExercisesChanged.asObservable();
  
  // private availableExercises: Exercise[] = [
  //   { id: 'crunches', name: 'Crunches', duration: 10, calories: 8 },
  //   { id: 'touch-toes', name: 'Touch Toes', duration: 20, calories: 15 },
  //   { id: 'side-lunges', name: 'Side Lunges', duration: 30, calories: 18 },
  //   { id: 'burpees', name: 'Burpees', duration: 15, calories: 12 }
  // ];



  getAvailableExercises() {
    // return this.availableExercises.slice();
    return {...this.store.select(fromTraining.getAvailableExercises)};
  }

  fetchAvailableExercises() {
    // this.uiService.loadingStateChanged.emit(true);
    this.store.dispatch(new UI.StartLoading());
    this.fbSubs.push(this.db.collection('availableExercises').snapshotChanges()
    .pipe(
      map(docArray => {
        // throw new Error();
        return docArray.map(doc => ({
          id: doc.payload.doc.id,
          name: doc.payload.doc.data()['name'],
          duration: doc.payload.doc.data()['duration'],
          calories: doc.payload.doc.data()['calories'],
        }));
      })
    ).subscribe((exercises: Exercise[])=>{
      // this.availableExercises = exercises;
      // this.exercisesChanged.next([...this.availableExercises]);
      // this.uiService.loadingStateChanged.emit(false);
      this.store.dispatch(new UI.StopLoading());
      this.store.dispatch(new TRAINING.SetAvailableTrainings(exercises));
    },
    error => {
      // this.uiService.loadingStateChanged.emit(false);
      this.store.dispatch(new UI.StopLoading());
      this.uiService.showSnackbar('Fetching Exercises failed, please try again later', null, 10000);
      // this.exercisesChanged.next(null);
      this.store.dispatch(new TRAINING.StopTraining());
    }
    ));
    // return this.availableExercises.slice();
  }

  startExercise(selectedId: string) {
    // this.db.doc('availableExercises/'+selectedId).update({lastSelected: new Date()});
    // this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
    // this.exerciseChanged.next({...this.runningExercise});
    this.store.dispatch(new TRAINING.StartTraining(selectedId));
  }

  // getRunningExercise() {
  //   return {...this.runningExercise};
  // }

  completeExercise() {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
      this.addDataToDatabase({...ex, date: new Date(), state: 'completed'});
      this.store.dispatch(new TRAINING.StopTraining());
    });
    // this.exercises.push({...this.runningExercise, date: new Date(), state: 'completed'});
    // this.addDataToDatabase({...this.runningExercise, date: new Date(), state: 'completed'});
    // this.runningExercise = null;
    // this.exerciseChanged.next(null);
    // this.store.dispatch(new TRAINING.StopTraining());
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
    // this.exercises.push({
    // this.addDataToDatabase({
    //   ...this.runningExercise,
    //   date: new Date(),
    //   duration: this.runningExercise.duration * (progress / 100), 
    //   calories: this.runningExercise.calories * (progress / 100),
    //   state: 'cancelled'});
    // this.runningExercise = null;
    // this.exerciseChanged.next(null);
    // this.store.dispatch(new TRAINING.StopTraining());
  }

  getCompletedOrCancelledExerciese() {
    // return this.exercises.slice();
    return {...this.store.select(fromTraining.getFinishedExercises)};
  }

  fetchCompletedOrCancelledExerciese() {
    this.fbSubs.push(this.db.collection('finishedExercises').valueChanges()
    .subscribe((exercises: Exercise[])=>{
      // this.finishedExercisesChanged.next(exercises);
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