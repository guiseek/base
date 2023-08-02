import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../store.interfaces';

@Injectable()
export class StoreService {
  constructor(private http: HttpClient) {}

  findAllProducts() {
    return this.http.get<Product[]>('/api/store/products');
  }

  findOneProduct(id: string) {
    return this.http.get<Product>('/api/store/products/' + id);
  }

  createOneProduct<T extends Omit<Product, 'id'>>(value: T) {
    return this.http.post<Product>('/api/store/products', value);
  }

  updateOneProduct<T extends Product>(id: string, value: Partial<T>) {
    return this.http.put<Product>('/api/store/products/' + id, value);
  }

  removeOneProduct(id: string) {
    return this.http.delete<Product>('/api/store/products/' + id);
  }
}
