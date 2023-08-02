export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
}

export interface AuthState {
  loading: boolean;
  token: string | null;
  error: string | null;
  user: User | null;
}
