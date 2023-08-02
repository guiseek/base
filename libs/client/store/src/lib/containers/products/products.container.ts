import {
  inject,
  AfterViewInit,
  Component,
  ChangeDetectionStrategy,
  ViewChild,
} from '@angular/core';
import { ProductService, StoreFacade } from '../../+store';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Product } from '../../store.interfaces';

@Component({
  selector: 'admin-products',
  templateUrl: './products.container.html',
  styleUrls: ['./products.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsContainer implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<Product>;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<Product>([]);

  storeFacade = inject(StoreFacade);
  productService = inject(ProductService);

  displayedColumns = ['id', 'title', 'brand', 'price', 'rating', 'stock'];

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.storeFacade.products$.subscribe((data) => {
      this.dataSource.data = data;
    });
    this.storeFacade.loadAllProducts();
  }

  openDialog() {
    this.productService.openDialog().subscribe((product) => {
      if (product) this.storeFacade.createOneProduct(product);
    });
  }
}
