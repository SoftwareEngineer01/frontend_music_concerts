import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuyerListComponent } from './buyer-list/buyer-list.component';
import { LayoutComponent } from '../shared/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: BuyerListComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyersRoutingModule { }
