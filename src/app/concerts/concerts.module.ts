import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConcertsRoutingModule } from './concerts-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MatGridListModule } from '@angular/material/grid-list';

import { ConcertListComponent } from './concert-list/concert-list.component';
import { ConcertAddComponent } from './concert-add/concert-add.component';
import { ConcertEditComponent } from './concert-edit/concert-edit.component';

@NgModule({
  imports: [
    CommonModule,
    ConcertsRoutingModule,
    MatGridListModule,
    SharedModule,  
  ],
  declarations: [
    ConcertListComponent,
    ConcertAddComponent,
    ConcertEditComponent,
  ],
  entryComponents: [
  ]
})

export class ConcertsModule { }
