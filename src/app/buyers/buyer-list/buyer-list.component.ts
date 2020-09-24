import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { NotificationService } from '../../core/services/notification.service';
import { NGXLogger } from 'ngx-logger';
import { BuyersService } from "../../services/buyers.service";

@Component({
  selector: 'app-buyer-list',
  templateUrl: './buyer-list.component.html',
  styleUrls: ['./buyer-list.component.css']
})
export class  BuyerListComponent implements OnInit {

  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private buyerService: BuyersService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.getDataBuyers();
    this.titleService.setTitle('angular-material-template - Buyers');
    this.logger.log('Buyers loaded');
  }

  getDataBuyers() {      
    
    this.buyerService
        .getBuyers()
        .subscribe(
            resp => {                          
                console.log(resp);                
            },
            error => {
                this.notificationService.openSnackBar('No hay datos');               
            }
        );
}

}
