import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  constructor(private http: HttpClient) { }

  getReservations(){
    return this.http.get(environment.urlApi + 'reservation');
  }

  addReservation(data:any):Observable<any>{
    return this.http.post(environment.urlApi + 'reservation', data);
  }

  getReservationById(id){
    return this.http.get(environment.urlApi + 'reservation/'+ id);
  }

  updateReservation(id, data:any){
    return this.http.put(environment.urlApi + 'reservation/'+ id, data);
  }  

  deleteReservation(id){
    return this.http.delete(environment.urlApi + 'reservation/'+ id);
  }

}

