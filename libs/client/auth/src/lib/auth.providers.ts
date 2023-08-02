import {
  withInterceptors,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import pt from '@angular/common/locales/pt';
import br from '@angular/common/locales/extra/br';
import { AuthFacade } from './+store/auth.facade';
import { AuthService } from './+store/auth.service';
import { AuthStorage } from './+store/auth.storage';
import { authInterceptor } from './interceptors';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';


registerLocaleData(pt, 'pt-BR', br)

export const authProviders = [
  AuthStorage,
  [
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([authInterceptor])
    ),
  ],
  {
    provide: LOCALE_ID,
    useValue: 'pt-BR'
  },
  {
    provide: DEFAULT_CURRENCY_CODE,
    useValue: 'BRL'
  },
  AuthService,
  AuthFacade,
];
