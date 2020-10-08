import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { CustomersService } from "../../services/customers.service";
import { NotificationService } from 'src/app/core/services/notification.service';
import { Location } from '@angular/common';
import { MatDialogRef } from "@angular/material";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table';


@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  customerForm: FormGroup;
  public messageError = null;
  customersData: any = [];
  dataSource: MatTableDataSource<any>;

  constructor(private formbuilder: FormBuilder,
              private customerService: CustomersService,
              private notificationService: NotificationService,
              private location: Location,
              // public dialogRef: MatDialogRef<CustomerAddComponent>,              
              private router: Router) { }

  ngOnInit() {
    this.form();
  }

  form(){
    this.customerForm = this.formbuilder.group({
      name:           ['',  [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      surname:        ['',  [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      identification: ['',  [Validators.required, Validators.pattern('^[0-9]+$')]],
      telephone:      ['',  [Validators.required, Validators.minLength(1), Validators.maxLength(15), Validators.pattern('^[0-9]+$')]],
    })
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.customerForm.controls[controlName].hasError(errorName);
  }   

  addCustomer(){
    if (this.customerForm.valid) {             
      this.customerService.addCustomer(this.customerForm.value).subscribe((res:any) => {           
        setTimeout(() => {
          this.notificationService.openSnackBar('Cliente registrado correctamente');          
        });                
        // this.onClose();   
        this.router.navigate(['customers']);                        
      }, error => {
        console.log(error.error);       
        this.messageError = error.error.errorMessages[0]['identification'][0];        
      });     
    }
  }

  // onClose(){   
  //   this.customerForm.reset();    
  //   this.dialogRef.close();       
  // }    

  cancel(){
    this.location.back();
  }

}
