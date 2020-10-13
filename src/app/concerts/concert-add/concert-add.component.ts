import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ConcertsService } from "../../services/concerts.service";
import { NotificationService } from 'src/app/core/services/notification.service';
import { Location } from '@angular/common';
// import * as moment from 'moment';

@Component({
  selector: 'add-concert',
  templateUrl: './concert-add.component.html',
  styleUrls: ['./concert-add.component.css'],  
})

export class ConcertAddComponent implements OnInit {

  concertForm: FormGroup;  
  //dateConvert: string = moment().format("YYYY-MM-DD HH:mm:ss");

  constructor(private formbuilder: FormBuilder,
              private concertService: ConcertsService,
              private notificationService: NotificationService,
              private location: Location,                          
              private router: Router) { }

  ngOnInit() { 
    this.form();
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.concertForm.controls[controlName].hasError(errorName);
  }   

  form(){
    this.concertForm = this.formbuilder.group({
      description:        ['',  [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      date:               ['',  [Validators.required, Validators.nullValidator]],
      city:               ['',  [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      place:              ['',  [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],     
      max_number_people:  ['',  [Validators.required, Validators.minLength(1), Validators.pattern('^[0-9]+$')]],
    })
  }

  addConcert(){         
    if(this.concertForm.valid){      
      this.concertService.addConcert(this.concertForm.value).subscribe((resp:any) => {                   
        setTimeout(() => {
          this.notificationService.openSnackBar(resp.message);
        });
        this.router.navigate(['concerts']);
      }, error => {
        console.log(error.error);
      })
    }
  }
 
  cancel(){
    this.location.back();
  }

}
