import {Injectable, OnDestroy} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {Exercise} from './exercise.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { UIService } from '../shared/ui.service';


@Injectable({providedIn: 'root'})
export class TrainingService implements OnDestroy {
  private runningExercise: Exercise;
  private exercises: Exercise[] = [];
  private finishedExercises: Exercise[] = [];
  private availableExercises: Exercise[] = [];
  private fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore, private uiService: UIService) {}
  
  private exerciseChanged = new Subject<Exercise>();
  exerciseChanged$ = this.exerciseChanged.asObservable();
  private exercisesChanged = new Subject<Exercise[]>();
  exercisesChanged$ = this.exercisesChanged.asObservable();
  private finishedExercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged$ = this.finishedExercisesChanged.asObservable();
  
  // private availableExercises: Exercise[] = [
  //   { id: 'crunches', name: 'Crunches', duration: 10, calories: 8 },
  //   { id: 'touch-toes', name: 'Touch Toes', duration: 20, calories: 15 },
  //   { id: 'side-lunges', name: 'Side Lunges', duration: 30, calories: 18 },
  //   { id: 'burpees', name: 'Burpees', duration: 15, calories: 12 }
  // ];



  getAvailableExercises() {
    return this.availableExercises.slice();
  }

  fetchAvailableExercises() {
    this.uiService.loadingStateChanged.emit(true);
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
      this.availableExercises = exercises;
      this.exercisesChanged.next([...this.availableExercises]);
      this.uiService.loadingStateChanged.emit(false);
    },
    error => {
      this.uiService.loadingStateChanged.emit(false);
      this.uiService.showSnackbar('Fetching Exercises failed, please try again later', null, 10000);
      this.exercisesChanged.next(null);
    }
    ));
    // return this.availableExercises.slice();
  }

  startExercise(selectedId: string) {
    // this.db.doc('availableExercises/'+selectedId).update({lastSelected: new Date()});
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
    this.exerciseChanged.next({...this.runningExercise});
  }

  getRunningExercise() {
    return {...this.runningExercise};
  }

  completeExercise() {
    // this.exercises.push({...this.runningExercise, date: new Date(), state: 'completed'});
    this.addDataToDatabase({...this.runningExercise, date: new Date(), state: 'completed'});
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    // this.exercises.push({
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      duration: this.runningExercise.duration * (progress / 100), 
      calories: this.runningExercise.calories * (progress / 100),
      state: 'cancelled'});
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getCompletedOrCancelledExerciese() {
    return this.exercises.slice();
  }

  fetchCompletedOrCancelledExerciese() {
    this.fbSubs.push(this.db.collection('finishedExercises').valueChanges()
    .subscribe((exercises: Exercise[])=>{
      this.finishedExercisesChanged.next(exercises);
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