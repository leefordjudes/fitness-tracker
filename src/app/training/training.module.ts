import { NgModule } from '@angular/core';
import {StoreModule} from '@ngrx/store';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { SharedModule } from '../shared/shared.module';

import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import {StopTrainingComponent} from './current-training/stop-training.component';

import {TrainingRoutingModule} from './training-routing.module';
import {trainingReducer} from './training.reducer';


@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent,
  ],
  imports:[
    SharedModule,
    AngularFirestoreModule,
    TrainingRoutingModule,
    StoreModule.forFeature('training', trainingReducer),
  ],
  entryComponents:[
    StopTrainingComponent,
  ],
})
export class TrainingModule {}