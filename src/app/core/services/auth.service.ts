import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import * as moment from 'moment';
import 'rxjs/add/operator/delay';

import { environment } from '../../../environments/environment';
import { of, EMPTY } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    public token: any;
    public data:  any;

    constructor(private http: HttpClient,
        @Inject('LOCALSTORAGE') private localStorage: Storage) {
    }

    login(data:any){        
        return this.http.post<any>(environment.urlApi + 'auth/login', data)
        .pipe(
            map( resp => {                
                this.saveData(resp);               
                this.saveToken(resp['access_token']);
                return resp;
            })
        );
    }

    logout(): void {        
        this.localStorage.removeItem('data');
        this.localStorage.removeItem('token');
    }

    private saveToken(idToken: string){
        this.token = idToken;
        localStorage.setItem('token', idToken);
    }

    private saveData(data: string){
        this.data = data;
        localStorage.setItem('data', JSON.stringify(data));
    }

    getToken(){
        if(localStorage.getItem('token')){
            this.token = localStorage.getItem('token');
        }else{
            this.token = '';
        }

        return this.token;
    }

    getCurrentUser(): any {       
        return JSON.parse(this.localStorage.getItem('data'));
    }

}
