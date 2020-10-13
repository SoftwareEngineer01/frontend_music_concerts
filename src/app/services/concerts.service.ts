import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ConcertsService {

  constructor(private http: HttpClient) { }

  getConcerts(){
    return this.http.get(environment.urlApi + 'concert');
  }

  addConcert(data:any):Observable<any>{
    return this.http.post(environment.urlApi + 'concert', data);
  }

}
