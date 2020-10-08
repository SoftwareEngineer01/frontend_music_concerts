import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersService } from "../../services/customers.service";
import { NotificationService } from 'src/app/core/services/notification.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  customerForm: FormGroup;
  public id = this.actRoute.snapshot.paramMap.get('id');
  public customerData;
  id_customer: any;
  
  constructor(private formbuilder: FormBuilder,
              private customerService: CustomersService,
              private notificationService: NotificationService,     
              private location: Location,  
              private actRoute: ActivatedRoute,   
              private router: Router) {
                this.id_customer = this.id;
              }

  ngOnInit() {    
    this.form();
    this.getCustomerByID();
  }

  form(){
    this.customerForm = this.formbuilder.group({
      name:           ['',  [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      surname:        ['',  [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      identification: ['',  [Validators.required, Validators.pattern('^[0-9]+$')]],
      telephone:      ['',  [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern('^[0-9]+$')]],
    })
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.customerForm.controls[controlName].hasError(errorName);
  }
  
  
  getCustomerByID(){      
      this.customerService
          .getCustomerById(this.id_customer)
          .subscribe(
              (resp:any) => {          
                console.log(resp);               
                  this.customerData = resp.data;
                  // this.dataSource = new MatTableDataSource<any>(this.customersData);
                  console.log(this.customerData);
                  this.customerForm = this.formbuilder.group({
                    name:           [this.customerData.name,  [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
                    surname:        [this.customerData.surname,  [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
                    identification: [this.customerData.identification,  [Validators.required, Validators.pattern('^[0-9]+$')]],
                    telephone:      [this.customerData.telephone,  [Validators.required, Validators.minLength(1), Validators.maxLength(15), Validators.pattern('^[0-9]+$')]],
                  })                    
              },
              error => {
                console.log(error);              
                this.notificationService.openSnackBar('No hay datos');               
              }
          );    
  }

  updateCustomer(){
    this.customerService.updateCustomer(this.id_customer, this.customerForm.value).subscribe((resp:any) => {
      if(resp.success){                                
        setTimeout(() => {
          this.notificationService.openSnackBar(resp.message);    
          this.router.navigate(['customers']);      
        }); 
      }else{
        this.notificationService.openSnackBar(resp.status);
      }               
    },error => {
      console.log(error);      
    }
    )   
  }

  cancel(){
    this.router.navigate(['customers']);
  }

}
