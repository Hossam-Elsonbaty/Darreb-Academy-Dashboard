import { Injectable } from '@angular/core';
import { IChapter, ICourse, ICourseChaptersResponse, ILecture } from '../../models/i-course';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../../models/i-ApiResponse';

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
    return this.http.get<ICourse[]>(`${environment.endPointUrl}/courses`, this.httpHeaders);
  }
  addCourse(data: FormData): Observable<ICourse> {
    return this.http.post<ICourse>(`${environment.endPointUrl}/courses/create-course`,data);
  }
  getCourseById(courseId:string): Observable<ICourse> {
    return this.http.get<ICourse>(`${environment.endPointUrl}/courses/${courseId}`, this.httpHeaders);
  }
  deleteCourse(id: string): Observable<ICourse> {
    return this.http.delete<ICourse>(`${environment.endPointUrl}/courses/${id}`, this.httpHeaders);
  }
  updateCourse(courseId: string, data: FormData): Observable<ICourse> {
    return this.http.put<ICourse>(`${environment.endPointUrl}/courses/${courseId}`, data);
  }
  //// Chapter req
  getCourseChapters(courseId:string): Observable<ICourseChaptersResponse> {
    return this.http.get<ICourseChaptersResponse>(`${environment.endPointUrl}/chapters/${courseId}/chapters`, this.httpHeaders);
  }
  addChapter(courseId: string, chapterData: IChapter): Observable<IChapter> {
    return this.http.post<IChapter>(
      `${environment.endPointUrl}/chapters/create-chapter`,
      { ...chapterData, courseId }
    );
  }
  updateChapter(chapterId: string, chapterData: IChapter): Observable<IChapter> {
    return this.http.put<IChapter>(
      `${environment.endPointUrl}/chapters/${chapterId}`,
      chapterData,
    );
  }
  deleteChapter(chapterId: string): Observable<any> {
    return this.http.delete( `${environment.endPointUrl}/chapters/${chapterId}`);
  }
  //// Lecture req
  getChapterById(chapterId:string): Observable<ICourse> {
    return this.http.get<ICourse>(`${environment.endPointUrl}/chapters/${chapterId}`, this.httpHeaders);
  }
  // addLecture(courseId: string, chapterData: ILecture): Observable<ILecture> {
  //   return this.http.post<ILecture>(
  //     `${environment.endPointTestUrl}/lectures/create-lecture`,
  //     { ...chapterData, courseId }
  //   );
  // }
  getAllLectures(chapterId : string): Observable<ILecture[]> {
    return this.http.get<ILecture[]>(`${environment.endPointUrl}/lectures/${chapterId}`);
  }
  addLecture( formData: FormData): Observable<ILecture> {
    return this.http.post<ILecture>(
      `${environment.endPointUrl}/lectures/create-lecture`,
      formData
    );
  }
  updateLecture(chapterId: string, formData: FormData): Observable<ILecture> {
    return this.http.put<ILecture>(
      `${environment.endPointUrl}/lectures/${chapterId}`,
      formData,
    );
  }
  deleteLecture(lectureId: string): Observable<any> {
    return this.http.delete( `${environment.endPointUrl}/lectures/${lectureId}`);
  }
}
