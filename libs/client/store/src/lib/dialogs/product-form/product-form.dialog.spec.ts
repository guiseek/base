import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductFormDialog } from './product-form.dialog';

describe('ProductFormDialog', () => {
  let component: ProductFormDialog;
  let fixture: ComponentFixture<ProductFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductFormDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFormDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
