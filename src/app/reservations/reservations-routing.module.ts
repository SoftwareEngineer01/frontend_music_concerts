import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from '../shared/layout/layout.component';
import { ReservationAddComponent } from './reservation-add/reservation-add.component';
import { ReservationEditComponent } from './reservation-edit/reservation-edit.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: ReservationListComponent },
      { path: 'add-reservation', component: ReservationAddComponent },
      { path: 'edit-reservation/:id', component: ReservationEditComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationsRoutingModule { }
