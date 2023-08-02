import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Product } from '../../store.interfaces';
import { ProductForm } from '../../forms';

@Component({
  selector: 'admin-product-form',
  templateUrl: './product-form.dialog.html',
  styleUrls: ['./product-form.dialog.scss'],
})
export class ProductFormDialog {
  form = new ProductForm();

  constructor(
    private readonly ref: MatDialogRef<ProductFormDialog>,
    @Inject(MAT_DIALOG_DATA) readonly data?: Product
  ) {
    if (this.data) this.form.patchValue(this.data);
  }

  onSubmit() {
    console.log(this.form.errors);
    console.log(this.form.valid);

    if (this.form.valid) {
      this.ref.close(this.form.value);
    }
  }
}
