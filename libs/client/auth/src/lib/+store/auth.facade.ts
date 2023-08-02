import { AuthState, AuthRequest } from '../auth.interfaces';
import { Observable, catchError, take } from 'rxjs';
import { Store } from '@base/shared/util';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AuthStorage } from './auth.storage';
import { Router } from '@angular/router';

@Injectable()
export class AuthFacade extends Store<AuthState> {
  user$ = this.select((state) => state.user);

  constructor(
    private authService: AuthService,
    private authStorage: AuthStorage,
    private router: Router
  ) {
    super({
      loading: false,
      user: null,
      error: null,
      token: null,
    });
  }

  login<T extends AuthRequest>(value: T) {
    this.authService
      .login(value)
      .pipe(take(1), catchError(this.handleError))
      .subscribe(({ accessToken = '' } = { accessToken: '' }) => {
        if (accessToken) {
          this.authStorage.accessToken = accessToken;
        }
        this.setState({ token: accessToken });
        this.loadUser();
        this.router.navigate(['/']);
      });
  }

  register<T extends AuthRequest>(value: T) {
    this.authService
      .register(value)
      .pipe(take(1), catchError(this.handleError))
      .subscribe((user) => {
        this.setState({ user });
      });
  }

  loadUser() {
    this.authService
      .profile()
      .pipe(take(1), catchError(this.handleError))
      .subscribe((user) => {
        this.setState({ user });
      });
  }

  logout() {
    this.authStorage.accessToken = null;
    this.router.navigate(['/', 'auth']);
  }

  handleError = <T>(err: any, caught: Observable<T>) => {
    if (err) {
      this.setState({ error: err.error.message });
      this.authStorage.accessToken = null;
      throw err;
    }

    return caught;
  };
}
