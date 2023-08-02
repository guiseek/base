import { AuthResponse, AuthRequest, User } from '../auth.interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  login<T extends AuthRequest>(value: T) {
    return this.http.post<AuthResponse>('/api/auth/login', value);
  }

  register<T extends AuthRequest>(value: T) {
    return this.http.post<User>('/api/auth/register', value);
  }

  profile() {
    return this.http.get<User>('/api/auth/profile');
  }
}
