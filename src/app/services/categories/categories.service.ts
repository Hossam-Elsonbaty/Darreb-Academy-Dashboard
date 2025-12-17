import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../../models/i-category';
import { environment } from '../../environments/environment.development';
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
    return this.http.get<ICategory[]>(`${environment.endPointTestUrl}/api/categories`, this.httpHeaders);
  }
  addNewCategory(categoryObj: ICategory): Observable<ApiResponse<ICategory>> {
    {
      return this.http.post<ApiResponse<ICategory>>(
        `${environment.endPointTestUrl}/api/categories`,
        categoryObj,
        this.httpHeaders
      );
    }
  }
  updateCategory(id: string, categoryObj: ICategory): Observable<ApiResponse<ICategory>> {
    return this.http.put<ApiResponse<ICategory>>(
      `${environment.endPointTestUrl}/api/categories/${id}`,
      categoryObj,
      this.httpHeaders
    );
  }
  deleteCategory(id: string): Observable<ICategory> {
    return this.http.delete<ICategory>(`${environment.endPointTestUrl}/api/categories/${id}`, this.httpHeaders);
  }
}
