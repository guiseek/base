import { FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Product } from '../store.interfaces';

export type EntityForm<T> = Partial<{
  [K in keyof T]: FormControl<T[K] | null>;
}>;

export class ProductForm extends FormGroup<EntityForm<Product>> {
  constructor() {
    super({
      id: new FormControl(),
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      price: new FormControl(0, [Validators.min(1)]),
      stock: new FormControl(0, [Validators.min(0)]),
    });
  }
}
