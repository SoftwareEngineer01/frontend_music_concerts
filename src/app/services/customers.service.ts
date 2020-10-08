import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http: HttpClient) { }

  getCustomers(){
    return this.http.get(environment.urlApi + 'buyer');
  }

  getCustomerById(id){
    return this.http.get(environment.urlApi + 'buyer/'+ id);
  }

  addCustomer(data:any):Observable<any>{
    return this.http.post(environment.urlApi + 'buyer', data);
  }

  updateCustomer(id:number, data:any){
    return this.http.put(environment.urlApi + 'buyer/'+ id, data);
  }  

  deleteCustomer(id:number){
    return this.http.delete(environment.urlApi + 'buyer/'+ id);
  }

}
