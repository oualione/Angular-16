import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

   
  apiUrl = 'http://localhost:3000/articles';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl);
  }

  getOne(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/${id}`);
  }
  
  persist(data: Article): Observable<Article>{
    return this.http.post<Article>(this.apiUrl, data);
  }

  update(id : number, data: Article): Observable<Article>{
    return this.http.put<Article>(`${this.apiUrl}/${id}`, data);

  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);

  }
}
