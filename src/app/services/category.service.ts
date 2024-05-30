import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/categories';

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get(this.apiUrl);
  }

  getCategoryName(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`)
  }
}
