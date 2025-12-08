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
    return this.http.get<iUser[]>(`${environment.endPointUrl}/users/get-all-users`,this.httpHeaders);
  }
  addNewUser(userObj:iUser):Observable <iUser> {
    return this.http.post<iUser>(`${environment.endPointUrl}/users/create-user`, userObj, this.httpHeaders);
  }
  deleteUser(id:string):Observable<iUser>{
    return this.http.delete<iUser>(`${environment.apiUrl}/users/${id}`,this.httpHeaders);
  }
  updateUser(id:string,userObj:iUser):Observable<iUser>{
    return this.http.put<iUser>(`${environment.endPointUrl}/users/update-user/${id}`,userObj,this.httpHeaders);
  }
  signIn(email:string,password:string){
    return this.http.post<any>(`${environment.endPointUrl}/auth/login`,{email,password},this.httpHeaders);
  }
}
