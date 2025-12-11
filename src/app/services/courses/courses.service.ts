import { Injectable } from '@angular/core';
import { ICourse } from '../../models/i-course';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

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
    return this.http.get<ICourse[]>(`${environment.endPointTestUrl}/api/courses`, this.httpHeaders);
  }
  addCourse(data: FormData): Observable<ICourse> {
    return this.http.post<ICourse>(`${environment.endPointTestUrl}/api/courses/create-course`,data);
  }
  getCourseById(courseId:string): Observable<ICourse> {
    return this.http.get<ICourse>(`${environment.endPointTestUrl}/api/courses/${courseId}`, this.httpHeaders);
  }
  deleteCourse(id: string): Observable<ICourse> {
    return this.http.delete<ICourse>(`${environment.endPointTestUrl}/api/courses/${id}`, this.httpHeaders);
  }
  updateCourse(courseId: string, data: FormData): Observable<ICourse> {
    return this.http.put<ICourse>(`${environment.endPointTestUrl}/api/courses/${courseId}`, data);
  }

}
