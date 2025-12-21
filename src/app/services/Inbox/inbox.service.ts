import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IInbox } from '../../models/i-inbox';

@Injectable({
  providedIn: 'root',
})
export class InboxService {
  httpHeaders = {};
  constructor(private http: HttpClient) {
    this.httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }
  getAllInboxes(): Observable<IInbox[]> {
    return this.http.get<IInbox[]>(`${environment.apiUrl}/api/contact-us`, this.httpHeaders);
  }
  deleteInbox(id: string): Observable<IInbox> {
    return this.http.delete<IInbox>(`${environment.apiUrl}/api/contact-us/${id}`, this.httpHeaders);
  }
}
