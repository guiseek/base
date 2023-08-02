import { Injectable } from '@angular/core';

@Injectable()
export class AuthStorage {
  set accessToken(value: string | null) {
    if (value) {
      localStorage.setItem('accessToken', value);
    } else {
      localStorage.removeItem('accessToken');
    }
  }

  get accessToken() {
    return localStorage.getItem('accessToken');
  }
}
