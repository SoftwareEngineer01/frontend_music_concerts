import { CustomerAddComponent } from './../customer-add/customer-add.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NGXLogger } from 'ngx-logger';
import { Title } from '@angular/platform-browser';

import { NotificationService } from '../../core/services/notification.service';
import { CustomersService } from "../../services/customers.service";
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from "@angular/material";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})

export class CustomerListComponent implements OnInit {

  customersData: any = [];
  displayedColumns: string[] = ['id', 'identification', 'name', 'surname', 'telephone', 'acciones'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title,
    private customersService: CustomersService,
    private dialog: MatDialog
  ) { 
      this.getCustomers(); 
    }

  ngOnInit() {
    this.titleService.setTitle('Conciertos - Clientes');
    this.logger.log('Clientes cargado');        
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  create(){  
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    this.dialog.open(CustomerAddComponent, dialogConfig);       
  }

  getCustomers() {   
    this.customersService
        .getCustomers()
        .subscribe(
            (resp:any) => {                         
                this.customersData = resp.data;
                this.dataSource = new MatTableDataSource<any>(this.customersData);
            setTimeout(() => {
              this.dataSource.paginator = this.paginator;
            }, 0);          
            },
            error => {
              console.log(error);              
              this.notificationService.openSnackBar('No hay datos');               
            }
        );
  }

  delete(index,id){    
    if(window.confirm('Esta seguro de eliminar el registro')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;      
      this.customersService.deleteCustomer(id).subscribe((res:any) => { 
        if(res.success){                                
          setTimeout(() => {
            this.notificationService.openSnackBar(res.message);          
          }); 
        }else{
          this.notificationService.openSnackBar(res.status);
        }                     
      }, error => {
        this.notificationService.openSnackBar(error.status); 
        console.log(error);
        console.log(error.status);                   
      });
    }
  }


}
