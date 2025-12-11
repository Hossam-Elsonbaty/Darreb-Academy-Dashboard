import { Injectable } from '@angular/core';
import { IChapter, ICourse } from '../../models/i-course';
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
  addChapter(courseId: string, chapterData: IChapter): Observable<IChapter> {
    return this.http.post<IChapter>(
      `${environment.endPointTestUrl}/api/chapters/create-chapter`,
      { ...chapterData, courseId }
    );
  }
  updateChapter(chapterId: string, chapterData: IChapter): Observable<IChapter> {
    return this.http.put<IChapter>(
      `${environment.endPointTestUrl}/api/chapters/${chapterId}`,
      chapterData,
    );
  }
  deleteChapter(chapterId: string): Observable<any> {
    return this.http.delete( `${environment.endPointTestUrl}/api/chapters/${chapterId}`);
  }
}
