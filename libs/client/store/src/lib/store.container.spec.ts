import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { StoreContainer } from './store.container';

describe('StoreContainer', () => {
  let component: StoreContainer;
  let fixture: ComponentFixture<StoreContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StoreContainer],
      imports: [
        NoopAnimationsModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StoreContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
