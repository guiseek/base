import { Router, CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, map } from 'rxjs';
import { AuthService } from '../+store';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const service = inject(AuthService);

  return service.profile().pipe(
    catchError((err, user) => {
      if (err) {
        router.navigate(['/', 'auth']);
        throw err;
      }
      return user;
    }),
    map((user) => !!user)
  );
};
