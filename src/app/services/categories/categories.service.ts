import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../../models/i-category';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  httpHeaders={}
  constructor(private http:HttpClient){
    this.httpHeaders = {
      headers : new HttpHeaders({
        'Content-Type':'application/json'
      }),
    }
  }
    getAllCategories():Observable<ICategory[]>{
      return this.http.get<ICategory[]>(`${environment.apiUrl}/categories`,this.httpHeaders);
    }
      addNewCategory(categoryobj:ICategory):Observable <ICategory>{ {
        return this.http.post<ICategory>(`${environment.apiUrl}/categories`, categoryobj, this.httpHeaders);
    }}
    updateCategory(id:string,categoryobj:ICategory):Observable<ICategory>{
      return this.http.put<ICategory>(`${environment.apiUrl}/categories/${id}`,categoryobj,this.httpHeaders)}
}
