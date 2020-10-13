import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from '../shared/layout/layout.component';
import { ConcertAddComponent } from './concert-add/concert-add.component';
import { ConcertEditComponent } from './concert-edit/concert-edit.component';
import { ConcertListComponent } from './concert-list/concert-list.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: ConcertListComponent },
      { path: 'add-concert', component: ConcertAddComponent },
      { path: 'edit-concert/:id', component: ConcertEditComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConcertsRoutingModule { }
