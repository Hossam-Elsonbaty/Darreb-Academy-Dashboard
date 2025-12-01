// import { Injectable } from '@angular/core';
// import { ICourse } from '../../models/i-course';
// import { Observable } from 'rxjs';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { environment } from '../../environments/environment';

// @Injectable({
//   providedIn: 'root',
// })
// export class CoursesService {
//   httpHeaders = {};
//   constructor(private http: HttpClient) {
//     this.httpHeaders = {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//       }),
//     };
//   }
//   getAllCourses(): Observable<ICourse[]> {
//     return this.http.get<ICourse[]>(`${environment.apiUrl}/courses`, this.httpHeaders);
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { IInstructor, ICourse } from '../../models/i-course';
import { ICategory } from '../../models/i-category';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CoursesService {
  private base = '/api';
  httpHeaders = {};
  constructor(private http: HttpClient) {
        this.httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  getCategories(): Observable<ICategory[]> {
    return of([
      { id: 'cat001', name: 'Web Development', name_ar: 'تطوير الويب' },
      { id: 'cat002', name: 'Data Science', name_ar: 'علوم البيانات' }
    ]).pipe(delay(500));
  }

  getInstructors(): Observable<IInstructor[]> {
    return of([
      { id: 'usr001', fullName: 'Mona Ibrahim', email: 'mona@mail.com' },
      { id: 'usr002', fullName: 'Ahmed Ali', email: 'ahmed@mail.com' }
    ]).pipe(delay(500));
  }

  createCourse(course: ICourse) {
    return this.http.post(`${this.base}/courses`, course);
  }
  getCourse(id:string){
  return this.http.get<any>(`${this.base}/courses/${id}`);
}

updateCourse(id:string, data:any){
  return this.http.put(`${this.base}/courses/${id}`, data);
}
  getAllCourses(): Observable<ICourse[]> {
    return this.http.get<ICourse[]>(`${environment.apiUrl}/courses`, this.httpHeaders);
  }

}
