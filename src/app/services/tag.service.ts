import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from '../models/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  apiUrl = 'http://localhost:3000/tags';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Tag[]>{
    return this.http.get<Tag[]>(this.apiUrl);
  }

  getOne(id: number): Observable<Tag>{
    return this.http.get<Tag>(`${this.apiUrl}/${id}`);
  }
  
  persist(data: Tag): Observable<Tag>{
    return this.http.post<Tag>(this.apiUrl, data);
  }

  update(id : number, data: Tag): Observable<Tag>{
    return this.http.put<Tag>(`${this.apiUrl}/${id}`, data);

  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);

  }
}
