import { Injectable } from '@angular/core';
import { IChapter, ICourse } from '../../models/i-course';
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
  getCourseById(courseId:string): Observable<ICourse> {
    return this.http.get<ICourse>(`${environment.apiUrl}/courses/${courseId}`, this.httpHeaders);
  }
  

addChapter(courseId: string, chapterData: IChapter): Observable<IChapter> {
  return this.http.post<IChapter>(
    `${environment.apiUrl}/chapters`,
    { ...chapterData, courseId },
    this.httpHeaders
  );
}

  updateChapter(chapterId: string, chapterData: IChapter): Observable<IChapter> {
  return this.http.put<IChapter>(
    `${environment.apiUrl}/chapters/${chapterId}`,
    chapterData,
    this.httpHeaders
  );
}

  deleteChapter(chapterId: string): Observable<any> {
  return this.http.delete( `${environment.apiUrl}/chapters/${chapterId}`,
    this.httpHeaders
  );
}}
// addChapter(courseId: string, chapterData: IChapter): Observable<IChapter>
// { return this.http.post<IChapter>( ${environment.apiUrl}/courses/${courseId}/chapters, chapterData, this.httpHeaders );}
//

//updateChapter(courseId: string, chapterId: string, chapterData: IChapter): Observable<IChapter>
// { return this.http.put<IChapter>( ${environment.apiUrl}/courses/${courseId}/chapters/${chapterId}, chapterData, this.httpHeaders );}
//
//deleteChapter(courseId: string, chapterId: string): Observable<any> {
//   return this.http.delete( ${environment.apiUrl}/courses/${courseId}/chapters/${chapterId}, this.httpHeaders ); }
//
