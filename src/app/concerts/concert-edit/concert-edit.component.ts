import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ConcertsService } from "../../services/concerts.service";
import { NotificationService } from 'src/app/core/services/notification.service';
import { Location } from '@angular/common';

@Component({
  selector: 'edit-concert',
  templateUrl: './concert-edit.component.html',
  styleUrls: ['./concert-edit.component.css']
})
export class ConcertEditComponent implements OnInit {

  concertForm: FormGroup;
  id = this.actRoute.snapshot.paramMap.get('id');
  concertData;
  id_concert: any;

  constructor(private formbuilder: FormBuilder,
    private concertService: ConcertsService,
    private notificationService: NotificationService,     
    private location: Location,  
    private actRoute: ActivatedRoute,   
    private router: Router) {
      this.id_concert = this.id;
    }

  ngOnInit() {
    this.form();
    this.getConcert();
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

  getConcert(){      
    this.concertService
        .getConcerById(this.id_concert)
        .subscribe(
            (resp:any) => {                            
                this.concertData = resp.data;                                
                this.concertForm = this.formbuilder.group({
                  description:        [this.concertData.description,  [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
                  date:               [this.concertData.date,  [Validators.required, Validators.nullValidator]],
                  city:               [this.concertData.city,  [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
                  place:              [this.concertData.place,  [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],     
                  max_number_people:  [this.concertData.max_number_people,  [Validators.required, Validators.minLength(1), Validators.pattern('^[0-9]+$')]],
                })                 
            },
            error => {
              console.log(error);              
              this.notificationService.openSnackBar('No hay datos');               
            }
        );    
}

updateConcert(){
  if(this.concertForm.valid){
    this.concertService.updateConcert(this.id_concert, this.concertForm.value).subscribe((resp:any) => {
      if(resp.success){                                
        setTimeout(() => {
          this.notificationService.openSnackBar(resp.message);    
          this.router.navigate(['concerts']);      
        }); 
      }else{
        this.notificationService.openSnackBar(resp.status);
      }               
    },error => {
      console.log(error);      
    }
    )   
  }else{
    this.notificationService.openSnackBar('Debe llenar todos los campos');    
  }
}

  cancel(){
    this.router.navigate(['concerts']);
  }

}
