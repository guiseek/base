import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '../store.interfaces';
import { ProductFormDialog } from '../dialogs';

@Injectable()
export class ProductService {
  constructor(private dialog: MatDialog) {}

  openDialog<T extends Product>(data?: T) {
    const ref = this.dialog.open<ProductFormDialog, T, T>(ProductFormDialog, {
      data,
    });
    return ref.afterClosed();
  }
}
