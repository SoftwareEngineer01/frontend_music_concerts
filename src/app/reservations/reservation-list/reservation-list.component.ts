import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NGXLogger } from 'ngx-logger';
import { Title } from '@angular/platform-browser';
import { NotificationService } from '../../core/services/notification.service';
import { MatPaginator } from '@angular/material/paginator';

import { ReservationsService } from '../../services/reservations.service';

@Component({
  selector: 'list-reservation',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  reservations: any = [];
  displayedColumns: string[] = ['id', 'buyer', 'name_concert', 'date', 'number_people', 'ticket_number', 'status', 'acciones'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private reservationService: ReservationsService,
              private logger: NGXLogger,
              private notificationService: NotificationService,
              private titleService: Title,                      
             ) {  this.getReservations() }

  ngOnInit() {
    this.titleService.setTitle('Reservas');
    this.logger.log('Reservas cargado');    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getReservations(){
    this.reservationService.getReservations().subscribe((resp:any) => {
      this.reservations = resp.data;
      this.dataSource = new MatTableDataSource<any>(this.reservations);     
      this.dataSource.paginator = this.paginator;          
    }, error => {
       console.log(error);  
       this.notificationService.openSnackBar('No hay datos');         
    })
  }

  delete(index,id){    
    if(window.confirm('Esta seguro de eliminar el registro')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;      
      this.reservationService.deleteReservation(id).subscribe((res:any) => { 
        if(res.success){                                
          setTimeout(() => {
            this.notificationService.openSnackBar(res.message);          
          }); 
        }else{
          this.notificationService.openSnackBar(res.statusText);
        }                     
      }, error => {
        this.notificationService.openSnackBar(error.status); 
        console.log(error);
        console.log(error.status);                   
      });
    }
  }

  

}
