import { Product, StoreState } from '../store.interfaces';
import { Observable, catchError, take } from 'rxjs';
import { Store } from '@base/shared/util';
import { Injectable } from '@angular/core';
import { StoreService } from './store.service';

@Injectable()
export class StoreFacade extends Store<StoreState> {
  products$ = this.select((state) => state.products);
  product$ = this.select((state) => state.product);

  constructor(private storeService: StoreService) {
    super({
      loading: false,
      product: null,
      products: [],
      error: null,
    });
  }

  loadAllProducts() {
    this.storeService
      .findAllProducts()
      .pipe(take(1), catchError(this.handleError))
      .subscribe((products) => {
        this.setState({ products });
      });
  }

  loadOneProduct(id: string) {
    this.storeService
      .findOneProduct(id)
      .pipe(take(1), catchError(this.handleError))
      .subscribe((product) => {
        this.setState({ product });
      });
  }

  createOneProduct(product: Omit<Product, 'id'>) {
    this.storeService
      .createOneProduct(product)
      .pipe(take(1), catchError(this.handleError))
      .subscribe((product) => {
        this.setState({ product });
        this.loadAllProducts();
      });
  }

  handleError = <T>(err: any, caught: Observable<T>) => {
    if (err) {
      this.setState({ error: err.error.message });
      throw err;
    }

    return caught;
  };
}
