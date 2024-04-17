// src/app/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  // Category API Endpoints
  createCategory(categoryName: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/categories`, { categoryName });
  }

  // Product API Endpoints
  createProduct(productName: string, categoryId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/products`, { productName, categoryId });
  }

  // Implementing other CRUD operations for categories and products
}
