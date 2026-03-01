import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiUrl = 'http://localhost:3000/api/jobs'; // change later

  constructor(private http: HttpClient) {}

  searchJobs(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/search`, payload);
  }
}