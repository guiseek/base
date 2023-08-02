import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginForm } from '../forms/login';
import { AuthComponent } from './auth';
import { onPush } from './on-push';

@Component({
  selector: 'auth-login',
  templateUrl: './login.html',
  styleUrls: ['./style.scss'],
  changeDetection: onPush,
})
export class LoginComponent extends AuthComponent {
  form = new LoginForm();
}
