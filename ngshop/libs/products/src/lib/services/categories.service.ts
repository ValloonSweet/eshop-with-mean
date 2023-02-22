import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<{categories: Category[], status: string}> {
    return this.http.get<{categories: Category[], status: string}>('http://localhost:8000/api/v1/categories');
  }

  createCategory(category: Category) {
    return this.http.post<{category: Category, status: boolean}>('http://localhost:8000/api/v1/categories', category);
  }
}
