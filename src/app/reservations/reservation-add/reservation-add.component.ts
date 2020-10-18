import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ConcertsService } from "../../services/concerts.service";
import { ReservationsService } from './../../services/reservations.service';
import { CustomersService } from './../../services/customers.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Location } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'add-reservation',
  templateUrl: './reservation-add.component.html',
  styleUrls: ['./reservation-add.component.css'],  
})

export class ReservationAddComponent implements OnInit {

  reservationForm: FormGroup;  
  customersData: any = [];
  concertsData: any = [];
  status = ['reservada', 'pagada', 'cancelada'];
  filteredCustomer = null;
  filteredConcert = null;   
  date: string = moment().format("YYYY-MM-DD HH:mm:ss");


  constructor(private formbuilder: FormBuilder,
              private concertService: ConcertsService,
              private customerService: CustomersService,
              private reservationService: ReservationsService,
              private notificationService: NotificationService,
              private location: Location,                          
              private router: Router) {
                this.getCustomers();
                this.getConcerts();
               }

  ngOnInit() { 
    this.form();   
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.reservationForm.controls[controlName].hasError(errorName);
  }   

  form(){
    this.reservationForm = this.formbuilder.group({
      id_buyer:      ['',  Validators.required],
      id_concert:    ['',  Validators.required],
      date:          [this.date],
      status:        ['',  Validators.required],       
      number_people: ['',  Validators.required],
    })
  }

  getCustomers() {   
    this.customerService.getCustomers().subscribe((resp:any) => {                         
      this.customersData = resp.data;                
      this.filteredCustomer = this.customersData.slice();                                           
    },error => {
        console.log(error);              
        this.notificationService.openSnackBar('No hay datos');               
      }
    );
  }

  getConcerts(){
    this.concertService.getConcerts().subscribe((resp:any) => {
      this.concertsData = resp.data;
      this.filteredConcert = this.concertsData.slice();        
    }, error => {
       console.log(error);  
       this.notificationService.openSnackBar('No hay datos');         
    })
  }

  addConcert(){         
    if(this.reservationForm.valid){      
      this.reservationService.addReservation(this.reservationForm.value).subscribe((resp:any) => {          
      this.notificationService.openSnackBar(resp.message);        
      this.router.navigate(['reservations']);
      }, error => {
        this.notificationService.openSnackBar(error.error.errorMessages);        
      })
    }
  }
 
  cancel(){
    this.router.navigate(['reservations']);
  }

}
