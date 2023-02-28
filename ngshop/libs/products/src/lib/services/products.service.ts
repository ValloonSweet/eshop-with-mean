import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<{products: Product[], status: string}> {
    return this.http.get<{products: Product[], status: string}>('http://localhost:8000/api/v1/products');
  }

  getProduct(id: string) {
    return this.http.get<{product: Product, status: string}>(
      `http://localhost:8000/api/v1/products/${id}`
    )
  }

  createProduct(product: Product) {
    return this.http.post<{product: Product, status: boolean}>('http://localhost:8000/api/v1/products', product);
  }

  updateProduct(id: string, product: Product) {
    return this.http.put<{status: boolean, product: Product}>(`http://localhost:8000/api/v1/products/${id}`, product);
  }

  deleteProduct(id: string) {
    return this.http.delete<any>(`http://localhost:8000/api/v1/products/${id}`);
  }
}
