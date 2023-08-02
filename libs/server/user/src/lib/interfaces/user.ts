export interface User {
  _id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  salt: string;
  roles: string[];
  verification: string;
  verified: boolean;
  verificationExpires: Date;
  loginAttempts: number;
  blockExpires: Date;
}
