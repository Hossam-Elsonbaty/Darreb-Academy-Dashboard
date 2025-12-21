import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../../models/i-category';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../../models/i-ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  httpHeaders = {};
  constructor(private http: HttpClient) {
    this.httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }
  getAllCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${environment.endPointUrl}/categories`, this.httpHeaders);
  }
  addNewCategory(categoryObj: ICategory): Observable<ApiResponse<ICategory>> {
    {
      return this.http.post<ApiResponse<ICategory>>(
        `${environment.endPointUrl}/categories`,
        categoryObj,
        this.httpHeaders
      );
    }
  }
  updateCategory(id: string, categoryObj: ICategory): Observable<ApiResponse<ICategory>> {
    return this.http.put<ApiResponse<ICategory>>(
      `${environment.endPointUrl}/categories/${id}`,
      categoryObj,
      this.httpHeaders
    );
  }
  deleteCategory(id: string): Observable<ICategory> {
    return this.http.delete<ICategory>(`${environment.endPointUrl}/categories/${id}`, this.httpHeaders);
  }
}
