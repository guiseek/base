import { Component, inject } from '@angular/core';
import { AuthFacade } from './+store/auth.facade';
import { onPush } from './components/on-push';

@Component({
  templateUrl: './auth.container.html',
  styleUrls: ['./auth.container.scss'],
  changeDetection: onPush,
})
export class AuthContainer {
  readonly auth = inject(AuthFacade);

  readonly state = this.auth.use();
}
