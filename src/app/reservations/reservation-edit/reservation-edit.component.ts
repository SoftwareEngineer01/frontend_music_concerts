import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ConcertsService } from "../../services/concerts.service";
import { ReservationsService } from './../../services/reservations.service';
import { CustomersService } from './../../services/customers.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Location } from '@angular/common';

@Component({
  selector: 'edit-reservation',
  templateUrl: './reservation-edit.component.html',
  styleUrls: ['./reservation-edit.component.css']
})
export class ReservationEditComponent implements OnInit {

  reservationForm: FormGroup;
  id = this.actRoute.snapshot.paramMap.get('id');
  reservationData;
  id_reservation: any;
  customersData: any = [];
  concertsData: any = [];
  status = ['reservada', 'pagada', 'cancelada'];
  filteredCustomer = null;
  filteredConcert = null;   

  constructor(private formbuilder: FormBuilder,
    private concertService: ConcertsService,
    private reservationsService: ReservationsService,
    private customerService: CustomersService,
    private notificationService: NotificationService,     
    private location: Location,  
    private actRoute: ActivatedRoute,   
    private router: Router) {
      this.id_reservation = this.id;
    }

  ngOnInit() {
    this.form();
    this.getReservation();
    this.getCustomers();
    this.getConcerts();
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.reservationForm.controls[controlName].hasError(errorName);
  }   

  form(){
    this.reservationForm = this.formbuilder.group({
      id_buyer:      ['',  Validators.required],
      id_concert:    ['',  Validators.required],      
      status:        ['',  Validators.required]    
    })
  }

  getReservation(){      
    this.reservationsService.getReservationById(this.id_reservation).subscribe((resp:any) => {                            
        this.reservationData = resp.data;                                             
        this.reservationForm = this.formbuilder.group({
          id_buyer:   [this.reservationData.id_buyer,  Validators.required],
          id_concert: [this.reservationData.id_concert,  Validators.required],      
          status:     [this.reservationData.status,  Validators.required]  
        })                 
    },
      error => {
        console.log(error);              
        this.notificationService.openSnackBar('No hay datos');               
      }
    );    
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

  updateReservation(){
    if(this.reservationForm.valid){
      this.reservationsService.updateReservation(this.id_reservation, this.reservationForm.value).subscribe((resp:any) => {
        if(resp.success){                                
          setTimeout(() => {
            this.notificationService.openSnackBar(resp.message);    
            this.router.navigate(['reservations']);      
          }); 
        }else{
          this.notificationService.openSnackBar(resp.status);
        }               
      },error => {
        console.log(error.error);   
        this.notificationService.openSnackBar(error.error.errorMessages);   
      }
      )   
    }else{
      this.notificationService.openSnackBar('Debe llenar todos los campos');    
    }
  }

  cancel(){
    this.router.navigate(['reservations']);
  }

}
