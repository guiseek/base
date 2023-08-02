import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent, LoginComponent } from './components';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { AuthContainer } from './auth.container';
import { authProviders } from './auth.providers';
import { authRoutes } from './auth.routes';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, AuthContainer],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatCardModule,
    ReactiveFormsModule,
    RouterModule.forChild(authRoutes),
  ],
  exports: [LoginComponent, RegisterComponent],
  providers: authProviders,
})
export class AuthModule {}
