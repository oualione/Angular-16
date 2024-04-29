import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl = 'http://localhost:3000/categories';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Category[]>{
    return this.http.get<Category[]>(this.apiUrl);
  }

  getOne(id: number): Observable<Category>{
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }
  
  persist(data: Category): Observable<Category>{
    return this.http.post<Category>(this.apiUrl, data);
  }

  update(id : number, data: Category): Observable<Category>{
    return this.http.put<Category>(`${this.apiUrl}/${id}`, data);

  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);

  }
}
