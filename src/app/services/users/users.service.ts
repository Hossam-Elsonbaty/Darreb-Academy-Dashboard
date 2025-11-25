import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { iUser } from '../../models/iUsers';
@Injectable({
  providedIn: 'root',
})

export class UsersService {
  httpHeaders={}
  constructor(private http:HttpClient){
    this.httpHeaders = {
      headers : new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
  }
}
