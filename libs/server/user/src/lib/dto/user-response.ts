import { Exclude, Transform } from 'class-transformer';
import { User } from '../interfaces';

export class UserResponseDto implements User {
  @Transform((params) => {
    params.options.excludePrefixes = ['_'];
  })
  _id: string;

  name: string;
  email: string;
  username: string;

  @Exclude()
  password: string;

  @Exclude()
  salt: string;
  roles: string[];
  verification: string;
  verified: boolean;
  verificationExpires: Date;
  loginAttempts: number;
  blockExpires: Date;
}
