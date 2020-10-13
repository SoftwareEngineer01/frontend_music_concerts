import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NGXLogger } from 'ngx-logger';
import { Title } from '@angular/platform-browser';
import { NotificationService } from '../../core/services/notification.service';
import { MatPaginator } from '@angular/material/paginator';

import { ConcertsService } from './../../services/concerts.service';

@Component({
  selector: 'list-concert',
  templateUrl: './concert-list.component.html',
  styleUrls: ['./concert-list.component.css']
})
export class ConcertListComponent implements OnInit {

  concerts: any = [];
  displayedColumns: string[] = ['id', 'description', 'date', 'city', 'place', 'max_number_people', 'acciones'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private concertService: ConcertsService,
              private logger: NGXLogger,
              private notificationService: NotificationService,
              private titleService: Title,                      
             ) {  this.getConcerts() }

  ngOnInit() {
    this.titleService.setTitle('Conciertos');
    this.logger.log('Conciertos cargado');    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getConcerts(){
    this.concertService.getConcerts().subscribe((resp:any) => {
      this.concerts = resp.data;
      this.dataSource = new MatTableDataSource<any>(this.concerts);     
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
      this.concertService.deleteConcert(id).subscribe((res:any) => { 
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
