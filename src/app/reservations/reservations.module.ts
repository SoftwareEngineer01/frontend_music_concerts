import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationsRoutingModule } from './reservations-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule, MatFormFieldModule } from '@angular/material';
import { MatSelectFilterModule } from 'mat-select-filter';

import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { ReservationAddComponent } from './reservation-add/reservation-add.component';
import { ReservationEditComponent } from './reservation-edit/reservation-edit.component';

@NgModule({
  imports: [
    CommonModule,
    ReservationsRoutingModule,
    MatGridListModule,
    SharedModule, 
    MatSelectModule,
    MatFormFieldModule,
    MatSelectFilterModule
  ],
  declarations: [
    ReservationListComponent,
    ReservationAddComponent,
    ReservationEditComponent,
  ],
  entryComponents: [
  ]
})

export class ReservationsModule { }
