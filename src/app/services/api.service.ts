import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getCategorias(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/stock-app/categorias/`);
  }

  getUS(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/stock-app/us/`);
  }

  getStocks(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/stock-app/stocks/`);
  }

   // Obter um stock específico
   getStock(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/stock-app/stocks/${id}/`);
  }

  // Criar um novo stock
  createStock(data: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/stock-app/stocks/`, data);
  }

  // Atualizar um stock
  updateStock(id: number, data: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/stock-app/stocks/${id}/`, data);
  }

  // Deletar um stock
  deleteStock(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/stock-app/stocks/${id}/`);
  }
}