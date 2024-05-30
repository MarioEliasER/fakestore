import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/products';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(this.apiUrl);
  }

  getProductById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createProduct(product: any) {
    return this.http.post(this.apiUrl, product);
  }

  updateProduct(id: number, product: Product) {
    return this.http.put(`${this.apiUrl}/${product.id}`, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
