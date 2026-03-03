import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private apiUrl = 'http://localhost:3000/api/applications';

  constructor(private http: HttpClient) {}

  applyToJob(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/apply`, data);
  }
}