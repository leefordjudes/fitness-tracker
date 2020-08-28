import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Exercise} from './exercise.model';

@Injectable({providedIn: 'root'})
export class TrainingService {
  private exerciseChanged = new Subject<Exercise>();
  exerciseChanged$ = this.exerciseChanged.asObservable();

  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 10, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 20, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 30, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 15, calories: 8 }
  ];

  private runningExercise: Exercise;
  private exercises: Exercise[] = [];

  getAvailableExercises() {
    return this.availableExercises.slice();
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
    this.exerciseChanged.next({...this.runningExercise});
  }

  getRunningExercise() {
    return {...this.runningExercise};
  }

  completeExercise() {
    this.exercises.push({...this.runningExercise, date: new Date(), state: 'completed'});
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.exercises.push({
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
}