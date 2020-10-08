import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersRoutingModule } from './customers-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';

@NgModule({
  imports: [
    CommonModule,
    CustomersRoutingModule,
    MatGridListModule,
    SharedModule
  ],
  declarations: [
    CustomerListComponent,
    CustomerAddComponent,
    CustomerEditComponent
  ],
  entryComponents: [
  ]
})
export class CustomersModule { }
