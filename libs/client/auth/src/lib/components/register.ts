import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RegisterForm } from '../forms/register';
import { AuthComponent } from './auth';
import { onPush } from './on-push';

@Component({
  selector: 'auth-register',
  templateUrl: './register.html',
  styleUrls: ['./style.scss'],
  changeDetection: onPush,
})
export class RegisterComponent extends AuthComponent implements OnInit {
  form = new RegisterForm({ updateOn: 'blur' });

  http = inject(HttpClient);

  ngOnInit() {
    this.form.controls.username.addAsyncValidators((control) => {
      return this.http.post('/api/auth/check', {
        username: control.value,
      });
    });
  }
}
