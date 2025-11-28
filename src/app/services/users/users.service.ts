import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { iUser } from '../../models/iUsers';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})

export class UsersService {
  httpHeaders={}
  constructor(private http:HttpClient){
    this.httpHeaders = {
      headers : new HttpHeaders({
        'Content-Type':'application/json'
      }),
    }
  }
  getAllUsers():Observable<iUser[]>{
    return this.http.get<iUser[]>(`${environment.apiUrl}/users`,this.httpHeaders);
  }
  addNewUser(userobj:iUser):Observable <iUser> {
    return this.http.post<iUser>(`${environment.apiUrl}/users`, userobj, this.httpHeaders);
}
}
