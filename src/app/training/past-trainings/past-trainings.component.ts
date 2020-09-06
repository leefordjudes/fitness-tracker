import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {Store} from '@ngrx/store';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
  displayedColumns = ['date', 'name', 'calories', 'duration', 'state'];
  datasource = new MatTableDataSource<Exercise>();
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>,
    ) { }


  ngOnInit(): void {
    this.store.select(fromTraining.getFinishedExercises).subscribe((exercises: Exercise[]) => {
      this.datasource.data = exercises;
    });
    this.trainingService.fetchCompletedOrCancelledExerciese();
  }

  ngAfterViewInit(): void {
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.datasource.filter = filterValue.trim().toLowerCase();
  }
}
