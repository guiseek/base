import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthStorage } from '../+store/auth.storage';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authStorage = inject(AuthStorage);

  const authRequest = req.clone({
    headers: req.headers.set(
      'Authorization',
      `Bearer ${authStorage.accessToken}`
    ),
  });

  return next(authRequest);
};
