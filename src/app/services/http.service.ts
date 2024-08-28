import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private storageService: StorageService) { }

  private getAuthHeaders(): Observable<HttpHeaders> {
    return from(this.storageService.get('token')).pipe(
      switchMap(token => {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        if (token) {
          headers = headers.set('Authorization', `Token ${token}`);
        }
        return [headers];
      })
    );
  }

  get(serviceName: string, useAuth: boolean = false): Observable<any> {
    const endpoint = environment.apiUrl + serviceName;
    if (useAuth) {
      return this.getAuthHeaders().pipe(
        switchMap(headers => this.http.get(endpoint, { headers }))
      );
    } else {
      return this.http.get(endpoint);
    }
  }

  post(serviceName: string, data: any, useAuth: boolean = false): Observable<any> {
    const endpoint = environment.apiUrl + serviceName;
    if (useAuth) {
      return this.getAuthHeaders().pipe(
        switchMap(headers => this.http.post(endpoint, data, { headers }))
      );
    } else {
      return this.http.post(endpoint, data);
    }
  }

  postToken(endpoint: string, data: any, useAuth: boolean = false): Observable<any> {
    if (useAuth) {
      return this.getAuthHeaders().pipe(
        switchMap(headers => this.http.post(endpoint, data, { headers }))
      );
    } else {
      return this.http.post(endpoint, data);
    }
  }
}

