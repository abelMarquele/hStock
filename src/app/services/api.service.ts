import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:8000'; // URL do teu servidor Django

  constructor(private http: HttpClient) { }

  getCategorias(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categorias/`);
  }

  getUS(): Observable<any> {
    return this.http.get(`${this.baseUrl}/us/`);
  }

  getStocks(): Observable<any> {
    return this.http.get(`${this.baseUrl}/stocks/`);
  }

   // Obter um stock específico
   getStock(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/stocks/${id}/`);
  }

  // Criar um novo stock
  createStock(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/stocks/`, data);
  }

  // Atualizar um stock
  updateStock(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/stocks/${id}/`, data);
  }

  // Deletar um stock
  deleteStock(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/stocks/${id}/`);
  }
}