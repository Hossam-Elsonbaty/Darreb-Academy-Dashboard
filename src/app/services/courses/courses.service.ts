import { Injectable } from '@angular/core';
import { ICourse } from '../../models/i-course';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  httpHeaders = {};
  constructor(private http: HttpClient) {
    this.httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }
  getAllCourses(): Observable<ICourse[]> {
    return this.http.get<ICourse[]>(`${environment.apiUrl}/courses`, this.httpHeaders);
  }
  addCourse(courseObj:ICourse): Observable<ICourse> {
    return this.http.post<ICourse>(`${environment.apiUrl}/courses`,courseObj, this.httpHeaders);
  }
}
