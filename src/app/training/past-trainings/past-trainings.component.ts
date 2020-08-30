import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {Subscription} from 'rxjs';
import {MatSort} from '@angular/material/sort';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['date', 'name', 'calories', 'duration', 'state'];
  datasource = new MatTableDataSource<Exercise>();
  finishedExercisesSubscription: Subscription;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private trainingService: TrainingService) { }


  ngOnInit(): void {
    // this.datasource.data = this.trainingService.getCompletedOrCancelledExerciese();
    this.finishedExercisesSubscription = this.trainingService.finishedExercisesChanged$
    .subscribe((exercises: Exercise[]) => {
      console.log(exercises);
      this.datasource.data = exercises;
    });
    this.trainingService.fetchCompletedOrCancelledExerciese();
    // this.datasource.data = this.trainingService.fetchCompletedOrCancelledExerciese();
  }

  ngAfterViewInit(): void {
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.finishedExercisesSubscription.unsubscribe();
  }

}
