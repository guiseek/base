import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DashboardContainer, ProductsContainer } from './containers';
import { CategoriesComponent } from './components';
import { StoreContainer } from './store.container';
import { storeProviders } from './store.providers';
import { ProductFormDialog } from './dialogs';
import { storeRoutes } from './store.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(storeRoutes),
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatSelectModule,
    MatSortModule,
    MatPaginatorModule,
    ReactiveFormsModule,
  ],
  declarations: [
    StoreContainer,
    ProductsContainer,
    DashboardContainer,
    CategoriesComponent,
    ProductFormDialog,
  ],
  providers: [storeProviders],
})
export class StoreModule {}
