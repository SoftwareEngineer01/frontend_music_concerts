import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {  BuyersRoutingModule } from './buyers-routing.module';
import { BuyerListComponent } from './buyer-list/buyer-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BuyersRoutingModule
  ],
  declarations: [BuyerListComponent]
})
export class BuyersModule { }
